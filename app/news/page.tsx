import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsCard } from "@/components/news/news-card"
import { getNewsArticles } from "@/lib/news/fetch-news"
import { sports } from "@/lib/data"

type NewsPageProps = {
  searchParams: Promise<{
    sport?: string
    q?: string
  }>
}

export const revalidate = 900 // refresh every 15 minutes

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const sport = params.sport ?? "all"
  const q = params.q ?? ""

  const articles = await getNewsArticles({
    sportId: sport,
    search: q,
    limit: 60,
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_45%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
            <p className="text-label text-card/80">Stay current</p>
            <h1 className="text-section text-card mt-3">Latest news across Scottish adventure sports</h1>
            <p className="text-body-lg mt-3 max-w-3xl text-card/80">
              Pulling updates from governing bodies, accredited clubs, and trusted outdoor organisations. We link out to every source so credit stays with the publisher.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-background" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
          <form className="mb-8 grid gap-3 rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur md:grid-cols-[1fr_1fr_auto]">
            <div className="flex flex-col gap-1">
              <label htmlFor="q" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Keyword
              </label>
              <input
                id="q"
                name="q"
                defaultValue={q}
                placeholder="Search titles or excerpts"
                className="h-10 rounded-lg border border-border/60 bg-muted/40 px-3 text-sm transition-all focus:border-primary/60 focus:bg-card outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="sport" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Sport
              </label>
              <select
                id="sport"
                name="sport"
                defaultValue={sport}
                className="h-10 rounded-lg border border-border/60 bg-muted/40 px-3 text-sm transition-all focus:border-primary/60 focus:bg-card outline-none"
              >
                <option value="all">All sports</option>
                {sports.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end justify-start">
              <button
                type="submit"
                className="h-10 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Update feed
              </button>
            </div>
          </form>

          {articles.length === 0 ? (
            <div className="rounded-lg border border-border bg-muted p-8 text-center text-muted-foreground">
              No articles found. Try widening your search or pick another sport.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
