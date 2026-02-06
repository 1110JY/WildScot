import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  sports,
  getClubsBySport,
  getEventsBySport,
} from "@/lib/data"
import { SportNewsStrip } from "@/components/news/sport-news-strip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Info,
} from "lucide-react"

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const typeLabels: Record<string, string> = {
  taster: "Taster Session",
  course: "Course",
  "open-day": "Open Day",
  programme: "Programme",
}

export default async function SportDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const sport = sports.find((s) => s.slug === slug)

  if (!sport) {
    notFound()
  }

  const relatedClubs = getClubsBySport(sport.id)
  const relatedEvents = getEventsBySport(sport.id)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={sport.image || "/placeholder.svg"}
              alt={sport.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-foreground/60" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
            <Badge className="mb-4 bg-card/20 text-card hover:bg-card/30">
              {sport.seasonality === "year-round" ? "Year-round" : "Seasonal"}
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-card sm:text-5xl">
              {sport.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-card/80">
              {sport.description}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Getting started */}
              <section className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Getting started
                </h2>
                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-5">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                    <Info className="h-4 w-4" />
                    Beginner-friendly guide
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">
                    {sport.beginnerDescription}
                  </p>
                </div>
                {sport.seasonNote && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {sport.seasonNote}
                  </p>
                )}
              </section>

              {/* Clubs */}
              <section className="mb-12">
                <div className="mb-6 flex items-end justify-between">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Clubs & providers
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/clubs">
                      View all <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>

                {relatedClubs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No clubs listed yet for this sport.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {relatedClubs.map((club) => (
                      <Link
                        key={club.id}
                        href={`/clubs/${club.id}`}
                        className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-foreground group-hover:text-primary">
                              {club.name}
                            </h3>
                            {club.accredited && (
                              <span className="flex items-center gap-1 text-xs text-primary">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Accredited
                              </span>
                            )}
                            {club.beginnerSuitable && (
                              <Badge
                                variant="secondary"
                                className="text-xs"
                              >
                                Beginner friendly
                              </Badge>
                            )}
                          </div>
                          <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {club.location}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              {/* Events */}
              <section>
                <div className="mb-6 flex items-end justify-between">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Upcoming events
                  </h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/events">
                      View all <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>

                {relatedEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No upcoming events for this sport.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {relatedEvents.map((event) => (
                      <div
                        key={event.id}
                        className="rounded-lg border border-border bg-card p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {typeLabels[event.type]}
                          </Badge>
                          {event.cost === "free" && (
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                              Free
                            </Badge>
                          )}
                        </div>
                        <h3 className="mt-2 text-sm font-bold text-foreground">
                          {event.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {event.description}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(event.date)}
                            {event.endDate &&
                              ` - ${formatDate(event.endDate)}`}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                          {event.price && <span>{event.price}</span>}
                        </div>
                        {event.bookingUrl && (
                          <a
                            href={event.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                          >
                            Book with {event.organiser}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* News */}
              <SportNewsStrip sportId={sport.id} />
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6">
              {sport.governingBody && (
                <div className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-sm font-bold text-foreground">
                    Governing body
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {sport.governingBody}
                  </p>
                  {sport.governingBodyUrl && (
                    <a
                      href={sport.governingBodyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      Visit official site
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              )}

              <div className="rounded-lg border border-border bg-muted p-5">
                <h3 className="text-sm font-bold text-foreground">
                  Safety information
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Conditions vary across Scotland. Always check locally
                  before heading out and follow guidance from qualified
                  instructors and governing bodies.
                </p>
              </div>

              <div className="rounded-lg bg-primary p-5 text-primary-foreground">
                <h3 className="text-sm font-bold">
                  Not sure where to start?
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-primary-foreground/80">
                  Our getting started guides are designed for complete
                  beginners with no prior knowledge.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  asChild
                  className="mt-4"
                >
                  <Link href="/get-started">
                    View all guides
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
