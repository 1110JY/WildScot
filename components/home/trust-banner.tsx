import { ShieldCheck, ExternalLink, AlertTriangle } from "lucide-react"

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Official affiliations",
    description:
      "We tag clubs and providers with their governing body accreditation so you know who's official.",
  },
  {
    icon: ExternalLink,
    title: "Always signposted",
    description:
      "WildScot links you directly to official organisers. We never host bookings or compete with governing bodies.",
  },
  {
    icon: AlertTriangle,
    title: "Safety first",
    description:
      "Conditions vary. We include safety guidance links and encourage you to check locally before heading out.",
  },
]

export function TrustBanner() {
  return (
    <section className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <point.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">
                  {point.title}
                </h3>
                <p className="text-body-sm mt-2 text-muted-foreground">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
