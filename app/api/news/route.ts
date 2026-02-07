import { NextResponse } from "next/server"
import { getNewsFeed, toNewsApiResponse } from "@/lib/news/fetch-news"

export const revalidate = 900
export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function toLimit(value: string | null) {
  if (!value) return 60
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 60
  return Math.max(1, Math.min(120, Math.floor(parsed)))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sportId = searchParams.get("sport") ?? undefined
  const search = searchParams.get("q") ?? undefined
  const limit = toLimit(searchParams.get("limit"))

  const feed = await getNewsFeed({
    sportId,
    search,
    limit,
  })

  return NextResponse.json(toNewsApiResponse(feed))
}
