"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  clubs,
  sports,
  regions,
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
import { Input } from "@/components/ui/input"
import {
  MapPin,
  ShieldCheck,
  ArrowRight,
  Search,
  X,
} from "lucide-react"

export function ClubFilters() {
  const [sportFilter, setSportFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("All Regions")
  const [abilityFilter, setAbilityFilter] = useState<AbilityLevel | "all">(
    "all"
  )
  const [costFilter, setCostFilter] = useState<CostType | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = useMemo(() => {
    return clubs.filter((club) => {
      if (sportFilter !== "all" && !club.sportIds.includes(sportFilter))
        return false
      if (regionFilter !== "All Regions" && club.region !== regionFilter)
        return false
      if (
        abilityFilter !== "all" &&
        !club.abilityLevels.includes(abilityFilter)
      )
        return false
      if (costFilter !== "all" && club.cost !== costFilter) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          club.name.toLowerCase().includes(q) ||
          club.location.toLowerCase().includes(q) ||
          club.description.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [sportFilter, regionFilter, abilityFilter, costFilter, searchQuery])

  const hasFilters =
    sportFilter !== "all" ||
    regionFilter !== "All Regions" ||
    abilityFilter !== "all" ||
    costFilter !== "all" ||
    searchQuery !== ""

  function clearFilters() {
    setSportFilter("all")
    setRegionFilter("All Regions")
    setAbilityFilter("all")
    setCostFilter("all")
    setSearchQuery("")
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      {/* Filters */}
      <div className="mb-8 rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur-lg">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Filters</span>
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
          <div className="group relative">
            <div className="absolute inset-0 rounded-lg border border-border/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/60" />
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-transparent bg-muted/40 pl-11 pr-3 shadow-inner transition-all focus:border-primary/60 focus:bg-card"
            />
          </div>

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
            value={abilityFilter}
            onValueChange={(v) => setAbilityFilter(v as AbilityLevel | "all")}
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
          {filtered.length} {filtered.length === 1 ? "club" : "clubs"}
        </span>
        <span>found</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">
            No clubs match your filters. Try adjusting your search criteria.
          </p>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((club) => (
            <Link
              key={club.id}
              href={`/clubs/${club.id}`}
              className="card-lift group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card/95 p-5 shadow-sm backdrop-blur"
            >
              <div className="absolute right-4 top-4 h-10 w-10 rounded-full bg-primary/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {club.sportIds.map((sid) => {
                  const sport = sports.find((s) => s.id === sid)
                  return (
                    <Badge key={sid} variant="secondary" className="text-xs">
                      {sport?.name}
                    </Badge>
                  )
                })}
                {club.accredited && (
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Accredited
                  </span>
                )}
              </div>

              <h3 className="font-display text-base font-bold text-foreground transition-colors group-hover:text-primary">
                {club.name}
              </h3>

              <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {club.location}
              </span>

              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {club.whoItsFor}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                {club.beginnerSuitable && (
                  <Badge
                    variant="outline"
                    className="border-primary/30 text-xs text-primary"
                  >
                    Beginner friendly
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs capitalize">
                  {club.cost}
                </Badge>
              </div>

              <div className="mt-3 flex items-center text-xs font-semibold text-primary">
                View details
                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
