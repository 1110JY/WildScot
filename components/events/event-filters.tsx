"use client"

import { useState, useMemo } from "react"
import {
  events,
  sports,
  regions,
  getSportById,
  type AbilityLevel,
  type CostType,
} from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MapPin,
  Calendar,
  ExternalLink,
  X,
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

type EventType = "taster" | "course" | "open-day" | "programme"

export function EventFilters() {
  const [sportFilter, setSportFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("All Regions")
  const [typeFilter, setTypeFilter] = useState<EventType | "all">("all")
  const [abilityFilter, setAbilityFilter] = useState<AbilityLevel | "all">(
    "all"
  )
  const [costFilter, setCostFilter] = useState<CostType | "all">("all")

  const filtered = useMemo(() => {
    return events
      .filter((event) => {
        if (sportFilter !== "all" && event.sportId !== sportFilter) return false
        if (regionFilter !== "All Regions" && event.region !== regionFilter)
          return false
        if (typeFilter !== "all" && event.type !== typeFilter) return false
        if (abilityFilter !== "all" && event.abilityLevel !== abilityFilter)
          return false
        if (costFilter !== "all" && event.cost !== costFilter) return false
        return true
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [sportFilter, regionFilter, typeFilter, abilityFilter, costFilter])

  const hasFilters =
    sportFilter !== "all" ||
    regionFilter !== "All Regions" ||
    typeFilter !== "all" ||
    abilityFilter !== "all" ||
    costFilter !== "all"

  function clearFilters() {
    setSportFilter("all")
    setRegionFilter("All Regions")
    setTypeFilter("all")
    setAbilityFilter("all")
    setCostFilter("all")
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      {/* Filters */}
      <div className="mb-8 rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur-lg">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            Filters
          </span>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <X className="mr-1 h-3 w-3" />
              Clear all
            </Button>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="rounded-lg border-border/60 bg-muted/40 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60">
              <SelectValue placeholder="Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              {sports.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="rounded-lg border-border/60 bg-muted/40 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v as EventType | "all")}
          >
            <SelectTrigger className="rounded-lg border-border/60 bg-muted/40 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="taster">Taster Session</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="open-day">Open Day</SelectItem>
              <SelectItem value="programme">Programme</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={abilityFilter}
            onValueChange={(v) =>
              setAbilityFilter(v as AbilityLevel | "all")
            }
          >
            <SelectTrigger className="rounded-lg border-border/60 bg-muted/40 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60">
              <SelectValue placeholder="Ability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Abilities</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="improver">Improver</SelectItem>
              <SelectItem value="experienced">Experienced</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={costFilter}
            onValueChange={(v) => setCostFilter(v as CostType | "all")}
          >
            <SelectTrigger className="rounded-lg border-border/60 bg-muted/40 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60">
              <SelectValue placeholder="Cost" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Cost</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="inline-flex h-6 items-center rounded-full bg-muted px-3 font-semibold text-foreground/80">
          {filtered.length} {filtered.length === 1 ? "event" : "events"}
        </span>
        <span>scheduled</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            No events match your filters. Try adjusting your criteria.
          </p>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((event) => {
            const sport = getSportById(event.sportId)
            return (
              <div
                key={event.id}
                className="card-lift relative flex flex-col gap-4 overflow-hidden rounded-lg border border-border bg-card/95 p-5 shadow-sm backdrop-blur sm:flex-row sm:items-start sm:justify-between"
              >
                <div
                  className="absolute left-0 top-0 h-1 w-full"
                  style={{ backgroundColor: sport?.accentColor || "hsl(25, 70%, 52%)" }}
                />
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {sport?.name}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {typeLabels[event.type]}
                    </Badge>
                    {event.cost === "free" && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                        Free
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs capitalize">
                      {event.abilityLevel}
                    </Badge>
                  </div>

                  <h3 className="font-display text-base font-bold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(event.date)}
                      {event.endDate && ` - ${formatDate(event.endDate)}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                    {event.price && (
                      <span className="font-medium">{event.price}</span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Organised by{" "}
                    <span className="font-medium text-foreground">
                      {event.organiser}
                    </span>
                  </p>
                </div>

                {event.bookingUrl && (
                  <div className="shrink-0">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={event.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book now
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 rounded-lg border border-border bg-muted p-4 text-xs text-muted-foreground">
        <p>
          All events are organised by independent clubs and providers.
          WildScot links you directly to official organisers for booking.
          Always check details and conditions with the organiser before
          attending.
        </p>
      </div>
    </section>
  )
}
