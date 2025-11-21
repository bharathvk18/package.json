import { NextRequest, NextResponse } from 'next/server'

const urlDatabase = new Map()

export async function GET(
  request: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  const { shortCode } = params
  const urlData = urlDatabase.get(shortCode)

  if (!urlData) {
    return NextResponse.json(
      { error: 'URL not found' },
      { status: 404 }
    )
  }

  urlData.clicks += 1
  urlDatabase.set(shortCode, urlData)

  return NextResponse.redirect(urlData.originalUrl)
}
