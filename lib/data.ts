export type Sport = {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  beginnerDescription: string
  image: string
  icon: string
  accentColor: string
  seasonality: "year-round" | "seasonal"
  seasonNote?: string
  governingBody?: string
  governingBodyUrl?: string
}

export type AbilityLevel = "beginner" | "improver" | "experienced"
export type AgeGroup = "youth" | "adult" | "family"
export type CostType = "free" | "paid"

export type Club = {
  id: string
  name: string
  sportIds: string[]
  location: string
  region: string
  lat: number
  lng: number
  description: string
  whoItsFor: string
  beginnerSuitable: boolean
  contactEmail?: string
  contactPhone?: string
  website?: string
  affiliatedBody?: string
  accredited: boolean
  abilityLevels: AbilityLevel[]
  ageGroups: AgeGroup[]
  cost: CostType
}

export type EventItem = {
  id: string
  title: string
  sportId: string
  clubId?: string
  type: "taster" | "course" | "open-day" | "programme"
  date: string
  endDate?: string
  location: string
  region: string
  description: string
  abilityLevel: AbilityLevel
  ageGroup: AgeGroup
  cost: CostType
  price?: string
  bookingUrl?: string
  organiser: string
}

export const sports: Sport[] = [
  {
    id: "surfing",
    name: "Surfing",
    slug: "surfing",
    tagline: "Atlantic swells. Cold water. Pure stoke.",
    accentColor: "hsl(174, 65%, 35%)",
    description:
      "Ride the powerful Atlantic swells along Scotland's spectacular coastline. From the famous breaks at Thurso to the sheltered bays of the west coast.",
    beginnerDescription:
      "No experience needed. Most surf schools provide all equipment and teach you in gentle whitewash waves. You'll be standing up in your first session.",
    image: "/images/sport-surfing.jpg",
    icon: "waves",
    seasonality: "year-round",
    seasonNote: "Best swells in autumn/winter. Summer is calmer and warmer for beginners.",
    governingBody: "Scottish Surfing Federation",
    governingBodyUrl: "https://www.scottishsurfingfederation.com",
  },
  {
    id: "climbing",
    name: "Climbing",
    slug: "climbing",
    tagline: "Granite. Grit. Vertical freedom.",
    accentColor: "hsl(25, 70%, 52%)",
    description:
      "From indoor walls to the dramatic crags of Glencoe and the Cairngorms, Scotland offers world-class rock climbing for every level.",
    beginnerDescription:
      "Start at an indoor climbing wall where harnesses and shoes are provided. Instructors will teach you the basics of movement, belaying, and safety.",
    image: "/images/sport-climbing.jpg",
    icon: "mountain",
    seasonality: "year-round",
    seasonNote: "Indoor climbing year-round. Outdoor season runs April to October.",
    governingBody: "Mountaineering Scotland",
    governingBodyUrl: "https://www.mountaineering.scot",
  },
  {
    id: "mtb",
    name: "Mountain Biking",
    slug: "mountain-biking",
    tagline: "Dirt trails. Full send. Scottish singletrack.",
    accentColor: "hsl(30, 60%, 42%)",
    description:
      "Scotland is a world-class mountain biking destination with purpose-built trail centres, remote wilderness rides, and everything in between.",
    beginnerDescription:
      "Trail centres have graded routes from easy green trails to expert-only black runs. You can hire bikes on-site at most centres. No experience required for green trails.",
    image: "/images/sport-mtb.jpg",
    icon: "bike",
    seasonality: "year-round",
    seasonNote: "Trails are rideable all year. Spring and autumn offer the best conditions.",
    governingBody: "Scottish Cycling",
    governingBodyUrl: "https://www.scottishcycling.org.uk",
  },
  {
    id: "wild-swimming",
    name: "Wild Swimming",
    slug: "wild-swimming",
    tagline: "Cold lochs. Deep breath. Total clarity.",
    accentColor: "hsl(200, 35%, 38%)",
    description:
      "Immerse yourself in Scotland's countless lochs, rivers, and coastal spots. Cold water swimming has surged in popularity across the country.",
    beginnerDescription:
      "Start with a guided group swim in a safe, known spot. Wear a wetsuit in colder months. Never swim alone as a beginner, and always check conditions first.",
    image: "/images/sport-swimming.jpg",
    icon: "droplets",
    seasonality: "year-round",
    seasonNote: "Summer (June-Sept) is warmest. Winter swimming is popular but requires acclimatisation.",
    governingBody: "Scottish Swimming",
    governingBodyUrl: "https://www.scottishswimming.com",
  },
  {
    id: "snowsports",
    name: "Snowsports",
    slug: "snowsports",
    tagline: "Fresh powder. Highland peaks. Snow days.",
    accentColor: "hsl(200, 50%, 60%)",
    description:
      "Hit the slopes at Scotland's five ski centres. From the Cairngorms to Glencoe, experience skiing and snowboarding in stunning Highland scenery.",
    beginnerDescription:
      "All ski centres offer equipment hire and lessons for complete beginners. Dry slopes and indoor snow centres let you learn year-round before hitting the mountains.",
    image: "/images/sport-snowsports.jpg",
    icon: "snowflake",
    seasonality: "seasonal",
    seasonNote: "Snow season typically December to April. Dry slopes available year-round.",
    governingBody: "Snowsport Scotland",
    governingBodyUrl: "https://www.snowsportscotland.org",
  },
  {
    id: "paddling",
    name: "Paddling",
    slug: "paddling",
    tagline: "Still water. Island hops. Paddle your own path.",
    accentColor: "hsl(174, 40%, 45%)",
    description:
      "From sea kayaking around the islands to stand-up paddleboarding on lochs, Scotland's waterways offer incredible paddling experiences.",
    beginnerDescription:
      "SUP (stand-up paddleboarding) is the easiest entry point. Lessons are widely available and most providers supply all equipment. Calm lochs are perfect for first-timers.",
    image: "/images/sport-paddling.jpg",
    icon: "anchor",
    seasonality: "year-round",
    seasonNote: "Best conditions May to September. Sheltered lochs are accessible year-round.",
    governingBody: "Scottish Canoe Association",
    governingBodyUrl: "https://www.canoescotland.org",
  },
]

export const clubs: Club[] = [
  {
    id: "thurso-surf",
    name: "Thurso Surf Club",
    sportIds: ["surfing"],
    location: "Thurso, Caithness",
    region: "Highlands",
    lat: 58.593,
    lng: -3.522,
    description:
      "One of Scotland's premier surf clubs, based at the famous Thurso East reef break. Active community with regular sessions and competitions.",
    whoItsFor: "All levels welcome. Strong beginner programme with summer taster sessions.",
    beginnerSuitable: true,
    contactEmail: "info@thursosurf.co.uk",
    website: "https://www.thursosurf.co.uk",
    affiliatedBody: "Scottish Surfing Federation",
    accredited: true,
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult"],
    cost: "paid",
  },
  {
    id: "edinburgh-climbing",
    name: "Edinburgh Climbing Centre",
    sportIds: ["climbing"],
    location: "Edinburgh",
    region: "Central Belt",
    lat: 55.953,
    lng: -3.188,
    description:
      "Scotland's largest indoor climbing facility with bouldering walls, lead climbing, and top-rope areas. Regular introduction courses.",
    whoItsFor: "Complete beginners to experienced climbers. Family sessions available on weekends.",
    beginnerSuitable: true,
    contactEmail: "hello@edinburghclimbing.com",
    contactPhone: "0131 555 1234",
    website: "https://www.edinburghclimbing.com",
    affiliatedBody: "Mountaineering Scotland",
    accredited: true,
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "glentress-mtb",
    name: "Glentress Forest MTB",
    sportIds: ["mtb"],
    location: "Peebles, Scottish Borders",
    region: "Borders",
    lat: 55.655,
    lng: -3.189,
    description:
      "Part of the 7Stanes network, Glentress offers some of the best purpose-built mountain bike trails in the UK. Bike hire and cafe on site.",
    whoItsFor: "All abilities. Green and blue trails perfect for beginners and families.",
    beginnerSuitable: true,
    website: "https://www.7stanesmountainbiking.com",
    affiliatedBody: "Scottish Cycling",
    accredited: true,
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "free",
  },
  {
    id: "loch-lomond-swimmers",
    name: "Loch Lomond Wild Swimmers",
    sportIds: ["wild-swimming"],
    location: "Balloch, Loch Lomond",
    region: "Central Belt",
    lat: 56.001,
    lng: -4.583,
    description:
      "Community group organising regular wild swimming sessions in Loch Lomond and surrounding lochs. Safety-focused with experienced guides.",
    whoItsFor: "Adults of all abilities. Newcomers always welcome at supervised sessions.",
    beginnerSuitable: true,
    contactEmail: "swim@lochlomond.wild",
    affiliatedBody: "Scottish Swimming",
    accredited: false,
    abilityLevels: ["beginner", "improver"],
    ageGroups: ["adult"],
    cost: "free",
  },
  {
    id: "cairngorm-ski",
    name: "Cairngorm Mountain",
    sportIds: ["snowsports"],
    location: "Aviemore, Cairngorms",
    region: "Highlands",
    lat: 57.116,
    lng: -3.672,
    description:
      "Scotland's most popular ski resort with 30km of runs, modern lifts, and a ski school. Stunning views from 1,245m.",
    whoItsFor: "All levels. Excellent ski school for beginners with equipment hire included.",
    beginnerSuitable: true,
    contactPhone: "01479 861261",
    website: "https://www.cairngormmountain.co.uk",
    affiliatedBody: "Snowsport Scotland",
    accredited: true,
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "west-coast-paddle",
    name: "West Coast Paddleboard Co.",
    sportIds: ["paddling"],
    location: "Oban, Argyll",
    region: "West Coast",
    lat: 56.414,
    lng: -5.473,
    description:
      "SUP and kayak tours along the stunning Argyll coastline. Small group lessons and equipment hire available.",
    whoItsFor: "Beginners and improvers. Family-friendly sessions in calm harbour waters.",
    beginnerSuitable: true,
    contactEmail: "paddle@westcoast.co.uk",
    website: "https://www.westcoastpaddle.co.uk",
    affiliatedBody: "Scottish Canoe Association",
    accredited: true,
    abilityLevels: ["beginner", "improver"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "highland-surf-co",
    name: "Highland Surf Co.",
    sportIds: ["surfing"],
    location: "Dunnet Bay, Caithness",
    region: "Highlands",
    lat: 58.614,
    lng: -3.370,
    description:
      "Surf school and hire centre at the beautiful Dunnet Bay. Beginner lessons on the wide sandy beach, perfect for learning.",
    whoItsFor: "Beginners and families. Group and private lessons available.",
    beginnerSuitable: true,
    contactEmail: "info@highlandsurf.co.uk",
    website: "https://www.highlandsurf.co.uk",
    affiliatedBody: "Scottish Surfing Federation",
    accredited: true,
    abilityLevels: ["beginner", "improver"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "fort-william-mtb",
    name: "Nevis Range MTB",
    sportIds: ["mtb"],
    location: "Fort William, Highlands",
    region: "Highlands",
    lat: 56.838,
    lng: -5.096,
    description:
      "Home of the UCI Mountain Bike World Cup. World-class downhill and cross-country trails with gondola uplift. Trail centre with hire.",
    whoItsFor: "Improvers and experienced riders. Some blue trails for confident beginners.",
    beginnerSuitable: false,
    website: "https://www.nevisrange.co.uk",
    affiliatedBody: "Scottish Cycling",
    accredited: true,
    abilityLevels: ["improver", "experienced"],
    ageGroups: ["youth", "adult"],
    cost: "paid",
  },
  {
    id: "aviemore-paddle",
    name: "Cairngorm Adventure Paddle",
    sportIds: ["paddling"],
    location: "Aviemore, Cairngorms",
    region: "Highlands",
    lat: 57.195,
    lng: -3.828,
    description:
      "Guided canoe and kayak trips on the River Spey and surrounding lochs. Stunning Cairngorm scenery and abundant wildlife.",
    whoItsFor: "All levels welcome. Half-day taster sessions ideal for beginners.",
    beginnerSuitable: true,
    contactEmail: "info@cairngormpaddle.co.uk",
    website: "https://www.cairngormpaddle.co.uk",
    accredited: true,
    affiliatedBody: "Scottish Canoe Association",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "glasgow-climbing-centre",
    name: "TCA Glasgow",
    sportIds: ["climbing"],
    location: "Glasgow",
    region: "Central Belt",
    lat: 55.862,
    lng: -4.266,
    description:
      "The Climbing Academy Glasgow offers bouldering and rope climbing in a modern, welcoming facility. Regular beginner sessions.",
    whoItsFor: "All levels. Youth clubs and family sessions on weekends.",
    beginnerSuitable: true,
    contactPhone: "0141 555 6789",
    website: "https://www.thecapglasgow.com",
    affiliatedBody: "Mountaineering Scotland",
    accredited: true,
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
]

export const events: EventItem[] = [
  {
    id: "evt-1",
    title: "Intro to Surfing Weekend",
    sportId: "surfing",
    clubId: "highland-surf-co",
    type: "course",
    date: "2026-03-14",
    endDate: "2026-03-15",
    location: "Dunnet Bay, Caithness",
    region: "Highlands",
    description:
      "Two-day beginner surf course covering ocean safety, paddling technique, and standing up. All equipment provided.",
    abilityLevel: "beginner",
    ageGroup: "adult",
    cost: "paid",
    price: "From \u00a389",
    bookingUrl: "https://www.highlandsurf.co.uk/courses",
    organiser: "Highland Surf Co.",
  },
  {
    id: "evt-2",
    title: "Try Climbing Night",
    sportId: "climbing",
    clubId: "edinburgh-climbing",
    type: "taster",
    date: "2026-03-07",
    location: "Edinburgh",
    region: "Central Belt",
    description:
      "Free taster evening for complete beginners. Includes a guided session on the bouldering wall and introduction to roped climbing. Shoes provided.",
    abilityLevel: "beginner",
    ageGroup: "adult",
    cost: "free",
    bookingUrl: "https://www.edinburghclimbing.com/events",
    organiser: "Edinburgh Climbing Centre",
  },
  {
    id: "evt-3",
    title: "Family Mountain Biking Day",
    sportId: "mtb",
    clubId: "glentress-mtb",
    type: "open-day",
    date: "2026-04-05",
    location: "Peebles, Scottish Borders",
    region: "Borders",
    description:
      "Family-friendly open day at Glentress with guided rides on green trails, bike checks, skills clinics, and refreshments.",
    abilityLevel: "beginner",
    ageGroup: "family",
    cost: "free",
    bookingUrl: "https://www.7stanesmountainbiking.com/events",
    organiser: "Glentress Forest MTB",
  },
  {
    id: "evt-4",
    title: "Cold Water Swimming Course",
    sportId: "wild-swimming",
    clubId: "loch-lomond-swimmers",
    type: "course",
    date: "2026-03-22",
    endDate: "2026-04-19",
    location: "Balloch, Loch Lomond",
    region: "Central Belt",
    description:
      "Four-week progressive course in cold water acclimatisation, technique, and safety. Covers wetsuits, breathing, and open water skills.",
    abilityLevel: "beginner",
    ageGroup: "adult",
    cost: "paid",
    price: "From \u00a345",
    bookingUrl: "https://www.lochlomond.wild/courses",
    organiser: "Loch Lomond Wild Swimmers",
  },
  {
    id: "evt-5",
    title: "Easter Ski Camp",
    sportId: "snowsports",
    clubId: "cairngorm-ski",
    type: "programme",
    date: "2026-04-06",
    endDate: "2026-04-10",
    location: "Aviemore, Cairngorms",
    region: "Highlands",
    description:
      "Five-day ski and snowboard camp for young people. Qualified instruction, equipment hire, and lift passes included.",
    abilityLevel: "beginner",
    ageGroup: "youth",
    cost: "paid",
    price: "From \u00a3199",
    bookingUrl: "https://www.cairngormmountain.co.uk/camps",
    organiser: "Cairngorm Mountain",
  },
  {
    id: "evt-6",
    title: "Sunset SUP Session",
    sportId: "paddling",
    clubId: "west-coast-paddle",
    type: "taster",
    date: "2026-05-15",
    location: "Oban, Argyll",
    region: "West Coast",
    description:
      "Guided sunset stand-up paddleboard session around Oban harbour. All equipment and wetsuits provided. Spectacular scenery guaranteed.",
    abilityLevel: "beginner",
    ageGroup: "adult",
    cost: "paid",
    price: "From \u00a325",
    bookingUrl: "https://www.westcoastpaddle.co.uk/sessions",
    organiser: "West Coast Paddleboard Co.",
  },
  {
    id: "evt-7",
    title: "Bouldering for Beginners",
    sportId: "climbing",
    clubId: "glasgow-climbing-centre",
    type: "course",
    date: "2026-03-10",
    endDate: "2026-03-31",
    location: "Glasgow",
    region: "Central Belt",
    description:
      "Four-week beginner bouldering course covering movement, technique, and problem-solving. No ropes needed.",
    abilityLevel: "beginner",
    ageGroup: "adult",
    cost: "paid",
    price: "From \u00a360",
    bookingUrl: "https://www.thecapglasgow.com/courses",
    organiser: "TCA Glasgow",
  },
  {
    id: "evt-8",
    title: "Spey Descent Paddle Trip",
    sportId: "paddling",
    clubId: "aviemore-paddle",
    type: "programme",
    date: "2026-06-12",
    endDate: "2026-06-14",
    location: "Aviemore, Cairngorms",
    region: "Highlands",
    description:
      "Three-day guided descent of the River Spey by canoe. Camping, wildlife spotting, and stunning Highland scenery.",
    abilityLevel: "improver",
    ageGroup: "adult",
    cost: "paid",
    price: "From \u00a3249",
    bookingUrl: "https://www.cairngormpaddle.co.uk/trips",
    organiser: "Cairngorm Adventure Paddle",
  },
]

export const regions = [
  "All Regions",
  "Highlands",
  "Central Belt",
  "Borders",
  "West Coast",
  "East Coast",
  "Islands",
]

export function getSportById(id: string): Sport | undefined {
  return sports.find((s) => s.id === id)
}

export function getClubById(id: string): Club | undefined {
  return clubs.find((c) => c.id === id)
}

export function getClubsBySport(sportId: string): Club[] {
  return clubs.filter((c) => c.sportIds.includes(sportId))
}

export function getEventsBySport(sportId: string): EventItem[] {
  return events.filter((e) => e.sportId === sportId)
}

export function getEventsByClub(clubId: string): EventItem[] {
  return events.filter((e) => e.clubId === clubId)
}
