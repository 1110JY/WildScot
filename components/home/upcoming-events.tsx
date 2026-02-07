import Link from "next/link"
import { events, getSportById } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatEventDate(date?: string, endDate?: string) {
  if (!date) return "Dates on organiser website"
  if (!endDate) return formatDate(date)
  return `${formatDate(date)} - ${formatDate(endDate)}`
}

const typeLabels: Record<string, string> = {
  taster: "Taster Session",
  course: "Course",
  "open-day": "Open Day",
  programme: "Programme",
}

export function UpcomingEvents() {
  const upcoming = [...events]
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : Number.MAX_SAFE_INTEGER
      const bTime = b.date ? new Date(b.date).getTime() : Number.MAX_SAFE_INTEGER
      return aTime - bTime
    })
    .slice(0, 4)

  if (upcoming.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-section text-foreground">
            Upcoming events
          </h2>
          <p className="text-body-sm mt-3 text-muted-foreground">
            Taster sessions, beginner courses, and open days happening soon.
          </p>
        </div>
        <Button variant="outline" asChild className="shrink-0 bg-transparent">
          <Link href="/events">
            View all events
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {upcoming.map((event) => {
          const sport = getSportById(event.sportId)
          return (
            <Link
              key={event.id}
              href="/events"
              className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {sport?.name}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs"
                >
                  {typeLabels[event.type]}
                </Badge>
                {event.verified && (
                  <Badge variant="outline" className="text-xs text-primary border-primary/40">
                    Verified
                  </Badge>
                )}
              </div>

              <h3 className="font-semibold text-base text-foreground group-hover:text-primary">
                {event.title}
              </h3>

              <div className="mt-auto flex flex-col gap-1 pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatEventDate(event.date, event.endDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </span>
              </div>

              {event.cost === "free" ? (
                <span className="mt-3 text-xs font-semibold text-primary">
                  Free
                </span>
              ) : (
                <span className="mt-3 text-xs font-medium text-muted-foreground">
                  {event.price}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
