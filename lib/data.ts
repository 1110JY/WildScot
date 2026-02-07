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
  website: string
  affiliatedBody?: string
  accredited: boolean
  verified: boolean
  verificationSourceUrl: string
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
  date?: string
  endDate?: string
  location: string
  region: string
  description?: string
  abilityLevel: AbilityLevel
  ageGroup: AgeGroup
  cost: CostType
  price?: string
  bookingUrl: string
  organiser: string
  verified: boolean
  verificationSourceUrl: string
}

export const sports: Sport[] = [
  {
    id: "surfing",
    name: "Surfing",
    slug: "surfing",
    tagline: "Atlantic swells. Cold water. Pure stoke.",
    accentColor: "hsl(174, 65%, 35%)",
    description:
      "Scotland has a year-round surf scene, from wave-pool progression sessions near Edinburgh to open-ocean breaks around the east and north coasts.",
    beginnerDescription:
      "Start with an official surf school or surf resort coaching session where equipment and safety briefings are included.",
    image: "/images/sport-surfing.jpg",
    icon: "waves",
    seasonality: "year-round",
    seasonNote: "Ocean conditions vary quickly. Use official forecasts and local guidance before entering the water.",
    governingBody: "Scottish Surfing",
    governingBodyUrl: "https://scottishsurfing.scot",
  },
  {
    id: "climbing",
    name: "Climbing",
    slug: "climbing",
    tagline: "Granite. Grit. Vertical freedom.",
    accentColor: "hsl(25, 70%, 52%)",
    description:
      "Indoor walls and instructor-led outdoor courses provide clear entry points for new climbers across Scotland.",
    beginnerDescription:
      "Book an official introductory session at a climbing wall or governing body training day to learn movement and safety basics.",
    image: "/images/sport-climbing.jpg",
    icon: "mountain",
    seasonality: "year-round",
    seasonNote: "Indoor climbing runs all year; outdoor conditions are more stable in spring through autumn.",
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
      "Trail centres such as Glentress and Nevis Range provide graded trails and on-site services for progression.",
    beginnerDescription:
      "Start on green or blue waymarked trails and build skills through official trail-centre sessions.",
    image: "/images/sport-mtb.jpg",
    icon: "bike",
    seasonality: "year-round",
    seasonNote: "Trail conditions can change after heavy rain and storms. Check facility updates before travel.",
    governingBody: "Scottish Cycling",
    governingBodyUrl: "https://scottishcycling.org.uk",
  },
  {
    id: "wild-swimming",
    name: "Wild Swimming",
    slug: "wild-swimming",
    tagline: "Cold water. Clear head. Respect the conditions.",
    accentColor: "hsl(200, 35%, 38%)",
    description:
      "Open-water providers and guided groups help new swimmers learn cold-water safety and progressive adaptation.",
    beginnerDescription:
      "Begin with coached open-water sessions and follow organiser guidance on acclimatisation, kit, and safety cover.",
    image: "/images/sport-swimming.jpg",
    icon: "droplets",
    seasonality: "year-round",
    seasonNote: "Cold shock risk is significant. Avoid solo swims as a beginner and use qualified local guidance.",
    governingBody: "Scottish Swimming",
    governingBodyUrl: "https://www.scottishswimming.com",
  },
  {
    id: "snowsports",
    name: "Snowsports",
    slug: "snowsports",
    tagline: "Fresh snow. Highland weather. Fast adaptation.",
    accentColor: "hsl(200, 50%, 60%)",
    description:
      "Scottish mountain centres and national programmes provide skiing and snowboarding options from first turns to instructor development.",
    beginnerDescription:
      "Use official mountain-centre lesson products and check live weather, uplift, and avalanche information before booking.",
    image: "/images/sport-snowsports.jpg",
    icon: "snowflake",
    seasonality: "seasonal",
    seasonNote: "Natural snow seasons vary year to year. Always confirm operational status with the centre.",
    governingBody: "Snowsport Scotland",
    governingBodyUrl: "https://www.snowsportscotland.org",
  },
  {
    id: "paddling",
    name: "Paddling",
    slug: "paddling",
    tagline: "Rivers, lochs, coastlines. Controlled progression.",
    accentColor: "hsl(174, 40%, 45%)",
    description:
      "From sheltered basin sessions to river and loch courses, Scotland has multiple coached pathways into paddlesport.",
    beginnerDescription:
      "Choose a provider-led beginner course where boats, safety kit, and session structure are managed by qualified staff.",
    image: "/images/sport-paddling.jpg",
    icon: "anchor",
    seasonality: "year-round",
    seasonNote: "River levels and wind are key constraints. Use provider and weather updates before heading out.",
    governingBody: "Paddle Scotland",
    governingBodyUrl: "https://www.paddlescotland.org.uk",
  },
]

export const clubs: Club[] = [
  {
    id: "lost-shore-surf-resort",
    name: "Lost Shore Surf Resort",
    sportIds: ["surfing"],
    location: "Ratho, Edinburgh",
    region: "Central Belt",
    lat: 55.923,
    lng: -3.382,
    description:
      "Wave-pool surf facility with coaching, sessions, and progression products in west Edinburgh.",
    whoItsFor:
      "Beginners through to experienced surfers looking for structured sessions.",
    beginnerSuitable: true,
    website: "https://lostshore.com",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://lostshore.com/surf/",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "coast-to-coast-surf-school",
    name: "Coast to Coast Surf School",
    sportIds: ["surfing"],
    location: "Belhaven Bay, Dunbar",
    region: "East Coast",
    lat: 55.989,
    lng: -2.530,
    description:
      "East Lothian surf school operating lessons and equipment hire at Belhaven.",
    whoItsFor:
      "Beginner-friendly coaching and family sessions based around local beach conditions.",
    beginnerSuitable: true,
    website: "https://www.c2csurfschool.com",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://www.c2csurfschool.com",
    abilityLevels: ["beginner", "improver"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "eica-ratho",
    name: "Edinburgh International Climbing Arena (EICA: Ratho)",
    sportIds: ["climbing"],
    location: "Ratho, Edinburgh",
    region: "Central Belt",
    lat: 55.924,
    lng: -3.383,
    description:
      "Large indoor climbing arena with roped climbing and bouldering operated by Edinburgh Leisure.",
    whoItsFor:
      "New and experienced climbers looking for structured coaching and regular sessions.",
    beginnerSuitable: true,
    website:
      "https://www.edinburghleisure.co.uk/venues/edinburgh-international-climbing-arena",
    accredited: false,
    verified: true,
    verificationSourceUrl:
      "https://www.edinburghleisure.co.uk/venues/edinburgh-international-climbing-arena",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "glasgow-climbing-centre",
    name: "Glasgow Climbing Centre",
    sportIds: ["climbing"],
    location: "Ibrox, Glasgow",
    region: "Central Belt",
    lat: 55.856,
    lng: -4.317,
    description:
      "Indoor climbing wall with introductory sessions and ongoing coaching.",
    whoItsFor:
      "Complete beginners through to regular climbers, including youth pathways.",
    beginnerSuitable: true,
    website: "https://www.theclimbingcentre.com/glasgow/",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://www.theclimbingcentre.com/glasgow/",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "eden-rock-edinburgh",
    name: "Eden Rock Edinburgh",
    sportIds: ["climbing"],
    location: "Loanhead, Midlothian",
    region: "Central Belt",
    lat: 55.879,
    lng: -3.149,
    description:
      "Bouldering-focused climbing centre serving Edinburgh and Midlothian.",
    whoItsFor:
      "Beginner and improver boulderers with coached sessions and member access.",
    beginnerSuitable: true,
    website: "https://www.edenrockedinburgh.co.uk",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://www.edenrockedinburgh.co.uk",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "glentress-trail-centre",
    name: "Glentress Trail Centre (7stanes)",
    sportIds: ["mtb"],
    location: "Glentress Forest, Peebles",
    region: "Borders",
    lat: 55.649,
    lng: -3.090,
    description:
      "Major Scottish trail centre with waymarked routes and visitor facilities.",
    whoItsFor:
      "Progression from beginner trails to advanced routes within an official trail network.",
    beginnerSuitable: true,
    website:
      "https://forestryandland.gov.scot/visit/forest-parks/7stanes/glentress",
    accredited: false,
    verified: true,
    verificationSourceUrl:
      "https://forestryandland.gov.scot/visit/forest-parks/7stanes/glentress",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "free",
  },
  {
    id: "nevis-range",
    name: "Nevis Range",
    sportIds: ["mtb", "snowsports"],
    location: "Torlundy, Fort William",
    region: "Highlands",
    lat: 56.854,
    lng: -5.005,
    description:
      "Mountain resort operating both snowsports and mountain biking products.",
    whoItsFor:
      "Intermediate and advanced riders and skiers, with selected beginner products.",
    beginnerSuitable: true,
    website: "https://www.nevisrange.co.uk",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://www.nevisrange.co.uk/ski-board/",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "cairngorm-mountain",
    name: "Cairngorm Mountain",
    sportIds: ["snowsports"],
    location: "Aviemore, Cairngorms",
    region: "Highlands",
    lat: 57.133,
    lng: -3.671,
    description:
      "Scottish mountain centre offering snowsports access and learning products.",
    whoItsFor:
      "Beginners through advanced snowsports participants depending on season and conditions.",
    beginnerSuitable: true,
    website: "https://www.cairngormmountain.co.uk",
    affiliatedBody: "Snowsport Scotland",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://www.cairngormmountain.co.uk",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "glencoe-mountain-resort",
    name: "Glencoe Mountain Resort",
    sportIds: ["snowsports"],
    location: "Glencoe, Ballachulish",
    region: "Highlands",
    lat: 56.682,
    lng: -4.970,
    description:
      "Mountain resort in Glencoe with ski and snowboard operations in season.",
    whoItsFor:
      "Beginners to experienced snowsports participants, depending on mountain conditions.",
    beginnerSuitable: true,
    website: "https://www.glencoemountain.co.uk",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://www.glencoemountain.co.uk",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "pinkston-watersports",
    name: "Pinkston Watersports",
    sportIds: ["paddling", "wild-swimming"],
    location: "North Canal Bank Street, Glasgow",
    region: "Central Belt",
    lat: 55.872,
    lng: -4.264,
    description:
      "Urban watersports centre offering paddlesport and open-water session products.",
    whoItsFor:
      "Beginner to improver participants using coached sessions and booked activities.",
    beginnerSuitable: true,
    website: "https://pinkston.co.uk",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://pinkston.co.uk/open-water-swimming/",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "glenmore-lodge",
    name: "Glenmore Lodge",
    sportIds: ["paddling", "climbing", "snowsports"],
    location: "Glenmore, Aviemore",
    region: "Highlands",
    lat: 57.171,
    lng: -3.670,
    description:
      "National outdoor training centre delivering instructor-led mountain and paddlesport courses.",
    whoItsFor:
      "Structured progression for beginners and experienced participants through formal courses.",
    beginnerSuitable: true,
    website: "https://www.glenmorelodge.org.uk",
    accredited: false,
    verified: true,
    verificationSourceUrl:
      "https://www.glenmorelodge.org.uk/disciplines/paddlesport/",
    abilityLevels: ["beginner", "improver", "experienced"],
    ageGroups: ["youth", "adult"],
    cost: "paid",
  },
  {
    id: "loch-insh-outdoor-centre",
    name: "Loch Insh Outdoor Centre",
    sportIds: ["paddling"],
    location: "Kincraig, Cairngorms National Park",
    region: "Highlands",
    lat: 57.128,
    lng: -3.899,
    description:
      "Outdoor activity centre with loch-based watersports and paddling sessions.",
    whoItsFor:
      "Beginner and family-focused paddling sessions with on-site facilities.",
    beginnerSuitable: true,
    website: "https://www.loch-insh.co.uk",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://www.loch-insh.co.uk/water-sports",
    abilityLevels: ["beginner", "improver"],
    ageGroups: ["youth", "adult", "family"],
    cost: "paid",
  },
  {
    id: "wild-swim-scotland",
    name: "Wild Swim Scotland",
    sportIds: ["wild-swimming"],
    location: "Edinburgh",
    region: "Central Belt",
    lat: 55.953,
    lng: -3.188,
    description:
      "Open-water provider delivering wild swimming coaching and guided sessions.",
    whoItsFor:
      "Beginner and improver swimmers seeking coached open-water progression.",
    beginnerSuitable: true,
    website: "https://wildswimscotland.co.uk",
    accredited: false,
    verified: true,
    verificationSourceUrl: "https://wildswimscotland.co.uk",
    abilityLevels: ["beginner", "improver"],
    ageGroups: ["adult"],
    cost: "paid",
  },
]

export const events: EventItem[] = [
  {
    id: "lost-shore-kids-beginner-camp",
    title: "Kids Beginner Surf Camp",
    sportId: "surfing",
    clubId: "lost-shore-surf-resort",
    type: "programme",
    date: "2026-03-30",
    endDate: "2026-04-03",
    location: "Ratho, Edinburgh",
    region: "Central Belt",
    description:
      "Lost Shore spring holiday beginner camp listed on the official resort booking platform.",
    abilityLevel: "beginner",
    ageGroup: "youth",
    cost: "paid",
    bookingUrl: "https://booking.lostshore.com/surf-kids-camp",
    organiser: "Lost Shore Surf Resort",
    verified: true,
    verificationSourceUrl: "https://lostshore.com/spring-surf-camps/",
  },
  {
    id: "lost-shore-kids-intermediate-camp",
    title: "Kids Intermediate Surf Camp",
    sportId: "surfing",
    clubId: "lost-shore-surf-resort",
    type: "programme",
    date: "2026-04-06",
    endDate: "2026-04-10",
    location: "Ratho, Edinburgh",
    region: "Central Belt",
    description:
      "Lost Shore spring holiday intermediate camp listed on the official resort booking platform.",
    abilityLevel: "improver",
    ageGroup: "youth",
    cost: "paid",
    bookingUrl: "https://booking.lostshore.com/kids-intermediate-camp",
    organiser: "Lost Shore Surf Resort",
    verified: true,
    verificationSourceUrl: "https://lostshore.com/spring-surf-camps/",
  },
  {
    id: "mountaineering-weather-workshop",
    title: "Weather Workshop",
    sportId: "climbing",
    type: "course",
    date: "2026-03-08",
    location: "Online",
    region: "Online",
    description:
      "Mountaineering Scotland workshop focused on weather interpretation for mountain activity planning.",
    abilityLevel: "improver",
    ageGroup: "adult",
    cost: "paid",
    bookingUrl: "https://www.mountaineering.scot/weather-workshop",
    organiser: "Mountaineering Scotland",
    verified: true,
    verificationSourceUrl: "https://www.mountaineering.scot/weather-workshop",
  },
  {
    id: "mountaineering-ready-to-rock",
    title: "Ready to Rock",
    sportId: "climbing",
    type: "course",
    date: "2026-04-04",
    location: "Kinghorn, Fife",
    region: "East Coast",
    description:
      "Mountaineering Scotland outdoor climbing introduction event listed on the official activity page.",
    abilityLevel: "beginner",
    ageGroup: "adult",
    cost: "paid",
    bookingUrl:
      "https://www.mountaineering.scot/activities/outdoor-climbing/ready-to-rock",
    organiser: "Mountaineering Scotland",
    verified: true,
    verificationSourceUrl:
      "https://www.mountaineering.scot/activities/outdoor-climbing/ready-to-rock",
  },
  {
    id: "glenmore-discover-open-canoe",
    title: "Discover Open Canoe",
    sportId: "paddling",
    clubId: "glenmore-lodge",
    type: "course",
    date: "2026-05-09",
    location: "Glenmore Lodge, Aviemore",
    region: "Highlands",
    description:
      "One-day beginner paddlesport course from Glenmore Lodge's official paddlesport programme.",
    abilityLevel: "beginner",
    ageGroup: "adult",
    cost: "paid",
    bookingUrl:
      "https://www.glenmorelodge.org.uk/paddlesports/open-canoeing/discover-open-canoe/",
    organiser: "Glenmore Lodge",
    verified: true,
    verificationSourceUrl:
      "https://www.glenmorelodge.org.uk/paddlesports/open-canoeing/discover-open-canoe/",
  },
  {
    id: "pinkston-open-water-swimming",
    title: "Open Water Swimming Sessions",
    sportId: "wild-swimming",
    clubId: "pinkston-watersports",
    type: "programme",
    location: "Glasgow",
    region: "Central Belt",
    description:
      "Pinkston open-water swimming programme. Session dates are managed on the organiser site.",
    abilityLevel: "beginner",
    ageGroup: "adult",
    cost: "paid",
    bookingUrl: "https://pinkston.co.uk/open-water-swimming/",
    organiser: "Pinkston Watersports",
    verified: true,
    verificationSourceUrl: "https://pinkston.co.uk/open-water-swimming/",
  },
  {
    id: "pinkston-white-water-kayak-progression",
    title: "White Water Kayaking Intermediate Progression",
    sportId: "paddling",
    clubId: "pinkston-watersports",
    type: "course",
    location: "Glasgow",
    region: "Central Belt",
    description:
      "Pinkston progression course listing. Current dates and booking windows are managed by the organiser.",
    abilityLevel: "improver",
    ageGroup: "adult",
    cost: "paid",
    bookingUrl:
      "https://pinkston.co.uk/white-water-kayak-intermediate-and-beyond-3-week-progression/",
    organiser: "Pinkston Watersports",
    verified: true,
    verificationSourceUrl:
      "https://pinkston.co.uk/white-water-kayak-intermediate-and-beyond-3-week-progression/",
  },
  {
    id: "nevis-range-ski-board-lessons",
    title: "Ski and Snowboard Lessons",
    sportId: "snowsports",
    clubId: "nevis-range",
    type: "programme",
    location: "Torlundy, Fort William",
    region: "Highlands",
    description:
      "Nevis Range snowsports lessons and products. Current availability is published on the official resort page.",
    abilityLevel: "beginner",
    ageGroup: "adult",
    cost: "paid",
    bookingUrl: "https://www.nevisrange.co.uk/ski-board/",
    organiser: "Nevis Range",
    verified: true,
    verificationSourceUrl: "https://www.nevisrange.co.uk/ski-board/",
  },
]

export const regions = [
  "All Regions",
  "Highlands",
  "Central Belt",
  "Borders",
  "West Coast",
  "East Coast",
  "Online",
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
