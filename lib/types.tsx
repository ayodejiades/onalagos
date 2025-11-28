// Lagos Route Optimizer Types

export interface Location {
  id: string
  name: string
  shortName?: string
  landmark?: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface Jetty {
  id: string
  name: string
  location: Location
  operatingHours: {
    open: string
    close: string
  }
  destinations: string[]
  facilities: string[]
  safetyRating: number
}

export interface FerrySchedule {
  id: string
  fromJetty: string
  toJetty: string
  interval: number // in minutes
  operatingHours: {
    open: string
    close: string
  }
  cost: number
  duration: {
    min: number
    max: number
  }
}

export interface TrainStation {
  id: string
  name: string
  location: Location
  lines: string[]
  operatingHours: {
    open: string
    close: string
  }
  facilities: string[]
  accessibility: boolean
  safetyRating: number
  peakTimes: string[]
  parking?: {
    available: boolean
    costPerDay: number
  }
}

export interface TrainLine {
  id: string
  name: string
  color: string
  stations: string[] // station ids in order
  operatingHours: {
    open: string
    close: string
  }
  peakInterval: number // minutes
  offPeakInterval: number // minutes
  totalDistance: number // km
  status: "operational" | "limited" | "coming-soon"
}

export interface TrainRoute {
  available: boolean
  duration: {
    min: number
    max: number
  }
  cost: number
  line: TrainLine | null
  segments: RouteSegment[]
  fromStation: TrainStation | null
  toStation: TrainStation | null
  stopsCount: number
  nextDepartures: string[]
  status: "available" | "recommended" | "limited"
}
// </CHANGE>

export interface RouteSegment {
  type: "walk" | "road" | "ferry" | "keke" | "uber" | "brt" | "train" // Added train type
  from: string
  to: string
  distance?: number
  duration: {
    min: number
    max: number
  }
  cost: number
  details?: string
}

export interface RoadRoute {
  available: boolean
  duration: {
    min: number
    max: number
  }
  cost: number
  trafficStatus: "light" | "moderate" | "heavy"
  segments: RouteSegment[]
  majorRoads: string[]
  distance: number
}

export interface WaterRoute {
  available: boolean
  duration: {
    min: number
    max: number
  }
  cost: number
  segments: RouteSegment[]
  nearestJettyFrom: Jetty | null
  nearestJettyTo: Jetty | null
  nextDepartures: string[]
  ferrySchedule: FerrySchedule | null
}

export interface RouteComparison {
  id: string
  origin: Location
  destination: Location
  roadRoute: RoadRoute
  waterRoute: WaterRoute
  trainRoute: TrainRoute
  timeSaved: number // in minutes
  moneySaved: number // in naira
  recommendation: "road" | "water" | "train" | "none"
}
// </CHANGE>

export interface SavedRoute {
  id: string
  origin: Location
  destination: Location
  departureTime: string
  daysPerWeek: number
}

export interface WeeklyStats {
  timeSaved: number
  moneySaved: number
  waterRoutesTaken: number
  roadRoutesTaken: number
  trainRoutesTaken: number
  dailyData: {
    date: string
    routeType: "road" | "water" | "train" | null
    timeSaved: number
    moneySaved: number
  }[]
}
// </CHANGE>

export interface UserPreferences {
  alertsEnabled: boolean
  alertMinutesBefore: number
  onlyAlertWhenBetter: boolean
  hasCompletedOnboarding: boolean
  preferredModes: {
    road: boolean
    water: boolean
    train: boolean
  }
}
// </CHANGE>

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

export type OnboardingStep = "welcome" | "setup" | "notifications" | "complete"
export type RouteTab = "road" | "water" | "train"
// </CHANGE>
