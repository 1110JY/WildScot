import { notFound } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  clubs,
  sports,
  getEventsByClub,
} from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ShieldCheck,
  Calendar,
  ArrowLeft,
  AlertTriangle,
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

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const club = clubs.find((c) => c.id === id)

  if (!club) {
    notFound()
  }

  const clubSports = club.sportIds
    .map((sid) => sports.find((s) => s.id === sid))
    .filter(Boolean)
  const clubEvents = getEventsByClub(club.id)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/clubs">
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to clubs
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-3">
              {clubSports.map((sport) => (
                <Badge key={sport!.id} variant="secondary" className="text-xs">
                  {sport!.name}
                </Badge>
              ))}
              {club.accredited && (
                <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Accredited provider
                </span>
              )}
              {club.affiliatedBody && (
                <span className="text-xs text-muted-foreground">
                  Affiliated with {club.affiliatedBody}
                </span>
              )}
            </div>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {club.name}
            </h1>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {club.location} &middot; {club.region}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              <section className="mb-8">
                <h2 className="font-display text-xl font-bold text-foreground">
                  About
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {club.description}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-display text-xl font-bold text-foreground">
                  Who it's for
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {club.whoItsFor}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {club.beginnerSuitable && (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      Beginner friendly
                    </Badge>
                  )}
                  {club.abilityLevels.map((level) => (
                    <Badge key={level} variant="outline" className="capitalize">
                      {level}
                    </Badge>
                  ))}
                  {club.ageGroups.map((group) => (
                    <Badge key={group} variant="outline" className="capitalize">
                      {group}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="capitalize">
                    {club.cost}
                  </Badge>
                </div>
              </section>

              {/* Events */}
              {clubEvents.length > 0 && (
                <section>
                  <h2 className="mb-4 font-display text-xl font-bold text-foreground">
                    Upcoming events
                  </h2>
                  <div className="flex flex-col gap-3">
                    {clubEvents.map((event) => (
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
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(event.date)}
                            {event.endDate &&
                              ` - ${formatDate(event.endDate)}`}
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
                            Book now
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 text-sm font-bold text-foreground">
                  Contact
                </h3>
                <div className="flex flex-col gap-2">
                  {club.contactEmail && (
                    <a
                      href={`mailto:${club.contactEmail}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {club.contactEmail}
                    </a>
                  )}
                  {club.contactPhone && (
                    <a
                      href={`tel:${club.contactPhone}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Phone className="h-4 w-4" />
                      {club.contactPhone}
                    </a>
                  )}
                  {club.website && (
                    <a
                      href={club.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit website
                    </a>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                  <AlertTriangle className="h-4 w-4 text-accent" />
                  Safety notice
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Conditions vary. Always check locally before participating
                  in outdoor activities. Follow guidance from qualified
                  instructors and governing bodies.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
