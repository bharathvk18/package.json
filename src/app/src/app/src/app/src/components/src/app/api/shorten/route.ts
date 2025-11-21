import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

const urlDatabase = new Map()

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    const shortCode = nanoid(7)
    const shortUrl = `${request.nextUrl.origin}/${shortCode}`

    urlDatabase.set(shortCode, {
      originalUrl: url,
      createdAt: new Date().toISOString(),
      clicks: 0
    })

    return NextResponse.json({
      shortCode,
      shortUrl,
      originalUrl: url
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
