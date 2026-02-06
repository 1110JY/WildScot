import { Search, MapPin, Zap } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Choose your thrill",
    description:
      "Browse sports with zero jargon. We'll tell you what to expect, what to wear, and what it actually feels like.",
    accent: "bg-[hsl(174,65%,35%)]",
  },
  {
    icon: MapPin,
    title: "Find your crew",
    description:
      "Search by postcode or region. Filter by ability, age, and budget. We surface the clubs that want beginners.",
    accent: "bg-[hsl(25,70%,52%)]",
  },
  {
    icon: Zap,
    title: "Just go",
    description:
      "Book a taster, join a course, or rock up to an open day. We link you straight to the organisers.",
    accent: "bg-[hsl(200,35%,38%)]",
  },
]

export function HowItWorks() {
  return (
    <section className="section-divider-angle bg-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="mb-16 text-center">
          <p className="text-label mb-4">
            Three steps. Zero faff.
          </p>
          <h2 className="text-section-lg text-card">
            From curious to out there
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Step number + icon */}
              <div className="relative mb-5">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.accent} text-card shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                >
                  <step.icon className="h-7 w-7" />
                </div>
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-card font-semibold text-sm text-foreground">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-card-heading text-card">
                {step.title}
              </h3>
              <p className="text-body-sm mt-3 max-w-xs text-card/70">
                {step.description}
              </p>

              {/* Connector line (hidden on mobile and last item) */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-8 translate-x-full bg-card/20 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
