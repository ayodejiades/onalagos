import type { Location, Jetty, FerrySchedule, RouteComparison, Achievement, TrainStation, TrainLine } from "./types"

// Lagos Locations
export const LAGOS_LOCATIONS: Location[] = [
  { id: "vi", name: "Victoria Island", shortName: "VI", coordinates: { lat: 6.4281, lng: 3.4219 } },
  { id: "lekki", name: "Lekki", coordinates: { lat: 6.4698, lng: 3.5852 } },
  { id: "ikorodu", name: "Ikorodu", coordinates: { lat: 6.6194, lng: 3.5105 } },
  { id: "ajah", name: "Ajah", coordinates: { lat: 6.4667, lng: 3.6167 } },
  { id: "marina", name: "Marina", coordinates: { lat: 6.4474, lng: 3.3903 } },
  { id: "cms", name: "CMS", shortName: "CMS", coordinates: { lat: 6.4541, lng: 3.3947 } },
  { id: "apapa", name: "Apapa", coordinates: { lat: 6.4488, lng: 3.3592 } },
  { id: "festac", name: "Festac Town", shortName: "Festac", coordinates: { lat: 6.4667, lng: 3.2833 } },
  { id: "surulere", name: "Surulere", coordinates: { lat: 6.4969, lng: 3.3506 } },
  { id: "ikeja", name: "Ikeja", coordinates: { lat: 6.6018, lng: 3.3515 } },
  { id: "yaba", name: "Yaba", coordinates: { lat: 6.5158, lng: 3.3756 } },
  { id: "mile2", name: "Mile 2", coordinates: { lat: 6.4667, lng: 3.3167 } },
  { id: "oshodi", name: "Oshodi", coordinates: { lat: 6.5565, lng: 3.3415 } },
  { id: "gbagada", name: "Gbagada", coordinates: { lat: 6.5536, lng: 3.3869 } },
  { id: "mushin", name: "Mushin", coordinates: { lat: 6.5294, lng: 3.3544 } },
  { id: "ebute-metta", name: "Ebute Metta", coordinates: { lat: 6.4833, lng: 3.3833 } },
  { id: "oyingbo", name: "Oyingbo", coordinates: { lat: 6.47, lng: 3.39 } },
  { id: "lagos-island", name: "Lagos Island", coordinates: { lat: 6.455, lng: 3.3841 } },
  { id: "agege", name: "Agege", coordinates: { lat: 6.62, lng: 3.32 } },
  { id: "agbado", name: "Agbado", coordinates: { lat: 6.67, lng: 3.31 } },
  // </CHANGE>
]

export const TRAIN_STATIONS: TrainStation[] = [
  {
    id: "marina-station",
    name: "Marina Train Station",
    location: { id: "marina-loc", name: "Marina, Lagos Island", coordinates: { lat: 6.4474, lng: 3.3903 } },
    lines: ["blue-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: ["Ticket booth", "ATM", "Restrooms", "Security", "AC Waiting Area", "Escalators", "Elevators"],
    accessibility: true,
    safetyRating: 4.8,
    peakTimes: ["7-9 AM", "5-7 PM"],
    parking: { available: false, costPerDay: 0 },
  },
  {
    id: "lagos-island-station",
    name: "Lagos Island Station",
    location: { id: "lagos-island-loc", name: "Lagos Island", coordinates: { lat: 6.455, lng: 3.3841 } },
    lines: ["blue-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: ["Ticket booth", "ATM", "Restrooms", "Security", "AC Waiting Area"],
    accessibility: true,
    safetyRating: 4.7,
    peakTimes: ["7-9 AM", "5-7 PM"],
  },
  {
    id: "oyingbo-station",
    name: "Oyingbo Station",
    location: { id: "oyingbo-loc", name: "Oyingbo", coordinates: { lat: 6.47, lng: 3.39 } },
    lines: ["blue-line", "red-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: ["Ticket booth", "ATM", "Restrooms", "Security", "Shops", "Elevators"],
    accessibility: true,
    safetyRating: 4.6,
    peakTimes: ["7-9 AM", "5-7 PM"],
    parking: { available: true, costPerDay: 500 },
  },
  {
    id: "ebute-metta-station",
    name: "Ebute Metta Station",
    location: { id: "ebute-metta-loc", name: "Ebute Metta", coordinates: { lat: 6.4833, lng: 3.3833 } },
    lines: ["blue-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: ["Ticket booth", "Restrooms", "Security", "AC Waiting Area"],
    accessibility: true,
    safetyRating: 4.5,
    peakTimes: ["7-9 AM", "5-7 PM"],
  },
  {
    id: "yaba-station",
    name: "Yaba Station",
    location: { id: "yaba-loc", name: "Yaba", coordinates: { lat: 6.5158, lng: 3.3756 } },
    lines: ["blue-line", "red-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: ["Ticket booth", "ATM", "Restrooms", "Security", "Shops", "AC Waiting Area", "Elevators"],
    accessibility: true,
    safetyRating: 4.7,
    peakTimes: ["7-9 AM", "5-7 PM"],
    parking: { available: true, costPerDay: 500 },
  },
  {
    id: "mushin-station",
    name: "Mushin Station",
    location: { id: "mushin-loc", name: "Mushin", coordinates: { lat: 6.5294, lng: 3.3544 } },
    lines: ["blue-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: ["Ticket booth", "Restrooms", "Security"],
    accessibility: true,
    safetyRating: 4.3,
    peakTimes: ["7-9 AM", "5-7 PM"],
  },
  {
    id: "oshodi-station",
    name: "Oshodi Station",
    location: { id: "oshodi-loc", name: "Oshodi", coordinates: { lat: 6.5565, lng: 3.3415 } },
    lines: ["blue-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: [
      "Ticket booth",
      "ATM",
      "Restrooms",
      "Security",
      "Shops",
      "AC Waiting Area",
      "Elevators",
      "Park & Ride",
    ],
    accessibility: true,
    safetyRating: 4.6,
    peakTimes: ["7-9 AM", "5-7 PM"],
    parking: { available: true, costPerDay: 500 },
  },
  {
    id: "ikeja-station",
    name: "Ikeja Train Station",
    location: { id: "ikeja-loc", name: "Ikeja", coordinates: { lat: 6.6018, lng: 3.3515 } },
    lines: ["blue-line", "red-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: [
      "Ticket booth",
      "ATM",
      "Restrooms",
      "Security",
      "Shops",
      "AC Waiting Area",
      "Elevators",
      "Park & Ride",
    ],
    accessibility: true,
    safetyRating: 4.8,
    peakTimes: ["7-9 AM", "5-7 PM"],
    parking: { available: true, costPerDay: 500 },
  },
  {
    id: "mile2-station",
    name: "Mile 2 Station",
    location: { id: "mile2-station-loc", name: "Mile 2", coordinates: { lat: 6.4667, lng: 3.3167 } },
    lines: ["blue-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: ["Ticket booth", "ATM", "Restrooms", "Security", "Park & Ride"],
    accessibility: true,
    safetyRating: 4.4,
    peakTimes: ["7-9 AM", "5-7 PM"],
    parking: { available: true, costPerDay: 500 },
  },
  {
    id: "agege-station",
    name: "Agege Station",
    location: { id: "agege-loc", name: "Agege", coordinates: { lat: 6.62, lng: 3.32 } },
    lines: ["red-line"],
    operatingHours: { open: "06:00", close: "22:00" },
    facilities: ["Ticket booth", "Restrooms", "Security"],
    accessibility: true,
    safetyRating: 4.3,
    peakTimes: ["7-9 AM", "5-7 PM"],
  },
]

export const TRAIN_LINES: TrainLine[] = [
  {
    id: "blue-line",
    name: "Blue Line",
    color: "#0066CC",
    stations: [
      "marina-station",
      "lagos-island-station",
      "oyingbo-station",
      "ebute-metta-station",
      "yaba-station",
      "mushin-station",
      "oshodi-station",
      "ikeja-station",
      "mile2-station",
    ],
    operatingHours: { open: "06:00", close: "22:00" },
    peakInterval: 15,
    offPeakInterval: 20,
    totalDistance: 27,
    status: "operational",
  },
  {
    id: "red-line",
    name: "Red Line",
    color: "#CC0000",
    stations: ["oyingbo-station", "yaba-station", "ikeja-station", "agege-station"],
    operatingHours: { open: "06:00", close: "22:00" },
    peakInterval: 20,
    offPeakInterval: 30,
    totalDistance: 18,
    status: "limited",
  },
]
// </CHANGE>

// Jetty Data
export const JETTIES: Jetty[] = [
  {
    id: "falomo",
    name: "Falomo Jetty",
    location: { id: "falomo-loc", name: "Falomo, Victoria Island", coordinates: { lat: 6.4367, lng: 3.4219 } },
    operatingHours: { open: "06:00", close: "20:00" },
    destinations: ["cms", "marina", "apapa", "mile2"],
    facilities: ["Waiting area", "Restrooms", "Security", "Ticket booth"],
    safetyRating: 4.5,
  },
  {
    id: "cms",
    name: "CMS Jetty",
    location: { id: "cms-loc", name: "CMS, Lagos Island", coordinates: { lat: 6.4541, lng: 3.3947 } },
    operatingHours: { open: "06:00", close: "20:00" },
    destinations: ["falomo", "marina", "apapa", "ikorodu", "mile2"],
    facilities: ["Waiting area", "Restrooms", "Security", "Ticket booth", "Snacks"],
    safetyRating: 4.7,
  },
  {
    id: "ikorodu",
    name: "Ikorodu Jetty",
    location: { id: "ikorodu-loc", name: "Ikorodu Terminal", coordinates: { lat: 6.6194, lng: 3.5105 } },
    operatingHours: { open: "06:00", close: "19:00" },
    destinations: ["cms", "marina", "mile2"],
    facilities: ["Waiting area", "Restrooms", "Security", "Parking"],
    safetyRating: 4.3,
  },
  {
    id: "mile2",
    name: "Mile 2 Jetty",
    location: { id: "mile2-loc", name: "Mile 2", coordinates: { lat: 6.4667, lng: 3.3167 } },
    operatingHours: { open: "06:00", close: "19:00" },
    destinations: ["cms", "marina", "falomo"],
    facilities: ["Waiting area", "Security"],
    safetyRating: 4.0,
  },
  {
    id: "apapa",
    name: "Liverpool Jetty (Apapa)",
    location: { id: "apapa-loc", name: "Apapa", coordinates: { lat: 6.4488, lng: 3.3592 } },
    operatingHours: { open: "06:00", close: "18:00" },
    destinations: ["cms", "marina", "falomo"],
    facilities: ["Waiting area", "Security"],
    safetyRating: 4.1,
  },
]

// Ferry Schedules
export const FERRY_SCHEDULES: FerrySchedule[] = [
  {
    id: "falomo-cms",
    fromJetty: "falomo",
    toJetty: "cms",
    interval: 30,
    operatingHours: { open: "06:00", close: "20:00" },
    cost: 500,
    duration: { min: 20, max: 25 },
  },
  {
    id: "ikorodu-marina",
    fromJetty: "ikorodu",
    toJetty: "marina",
    interval: 45,
    operatingHours: { open: "06:00", close: "19:00" },
    cost: 1500,
    duration: { min: 45, max: 60 },
  },
  {
    id: "mile2-cms",
    fromJetty: "mile2",
    toJetty: "cms",
    interval: 30,
    operatingHours: { open: "06:00", close: "19:00" },
    cost: 800,
    duration: { min: 25, max: 35 },
  },
  {
    id: "cms-apapa",
    fromJetty: "cms",
    toJetty: "apapa",
    interval: 40,
    operatingHours: { open: "06:00", close: "18:00" },
    cost: 600,
    duration: { min: 15, max: 20 },
  },
]

// Pre-defined route comparisons
export const ROUTE_COMPARISONS: Record<string, RouteComparison> = {
  "vi-marina": {
    id: "vi-marina",
    origin: LAGOS_LOCATIONS.find((l) => l.id === "vi")!,
    destination: LAGOS_LOCATIONS.find((l) => l.id === "marina")!,
    roadRoute: {
      available: true,
      duration: { min: 105, max: 135 },
      cost: 2500,
      trafficStatus: "heavy",
      distance: 18.5,
      majorRoads: ["Ozumba Mbadiwe Ave", "Lekki-Ikoyi Link Bridge", "Admiralty Way", "Broad Street"],
      segments: [{ type: "road", from: "VI", to: "Marina", duration: { min: 105, max: 135 }, cost: 2500 }],
    },
    waterRoute: {
      available: true,
      duration: { min: 45, max: 55 },
      cost: 800,
      nearestJettyFrom: JETTIES.find((j) => j.id === "falomo")!,
      nearestJettyTo: JETTIES.find((j) => j.id === "cms")!,
      nextDepartures: ["07:15 AM", "07:45 AM", "08:15 AM"],
      ferrySchedule: FERRY_SCHEDULES.find((f) => f.id === "falomo-cms")!,
      segments: [
        {
          type: "walk",
          from: "Your location",
          to: "Falomo Jetty",
          distance: 650,
          duration: { min: 8, max: 10 },
          cost: 0,
        },
        {
          type: "ferry",
          from: "Falomo Jetty",
          to: "CMS Jetty",
          duration: { min: 20, max: 25 },
          cost: 500,
          details: "Lagos Ferry Services",
        },
        { type: "keke", from: "CMS Jetty", to: "Marina", duration: { min: 10, max: 15 }, cost: 200 },
      ],
    },
    trainRoute: {
      available: false,
      duration: { min: 0, max: 0 },
      cost: 0,
      line: null,
      segments: [],
      fromStation: null,
      toStation: null,
      stopsCount: 0,
      nextDepartures: [],
      status: "available",
    },
    timeSaved: 60,
    moneySaved: 1700,
    recommendation: "water",
  },
  "lekki-cms": {
    id: "lekki-cms",
    origin: LAGOS_LOCATIONS.find((l) => l.id === "lekki")!,
    destination: LAGOS_LOCATIONS.find((l) => l.id === "cms")!,
    roadRoute: {
      available: true,
      duration: { min: 120, max: 165 },
      cost: 3000,
      trafficStatus: "heavy",
      distance: 25.2,
      majorRoads: ["Lekki-Epe Expressway", "Lekki-Ikoyi Link", "Third Mainland Bridge", "Marina"],
      segments: [{ type: "road", from: "Lekki", to: "CMS", duration: { min: 120, max: 165 }, cost: 3000 }],
    },
    waterRoute: {
      available: true,
      duration: { min: 50, max: 70 },
      cost: 1200,
      nearestJettyFrom: JETTIES.find((j) => j.id === "falomo")!,
      nearestJettyTo: JETTIES.find((j) => j.id === "cms")!,
      nextDepartures: ["06:30 AM", "07:00 AM", "07:30 AM"],
      ferrySchedule: FERRY_SCHEDULES.find((f) => f.id === "falomo-cms")!,
      segments: [
        { type: "uber", from: "Your location", to: "Falomo Jetty", duration: { min: 15, max: 25 }, cost: 600 },
        {
          type: "ferry",
          from: "Falomo Jetty",
          to: "CMS Jetty",
          duration: { min: 20, max: 25 },
          cost: 500,
          details: "Lagos Ferry Services",
        },
        { type: "walk", from: "CMS Jetty", to: "Destination", duration: { min: 5, max: 10 }, cost: 0 },
      ],
    },
    trainRoute: {
      available: false,
      duration: { min: 0, max: 0 },
      cost: 0,
      line: null,
      segments: [],
      fromStation: null,
      toStation: null,
      stopsCount: 0,
      nextDepartures: [],
      status: "available",
    },
    timeSaved: 70,
    moneySaved: 1800,
    recommendation: "water",
  },
  "ikorodu-marina": {
    id: "ikorodu-marina",
    origin: LAGOS_LOCATIONS.find((l) => l.id === "ikorodu")!,
    destination: LAGOS_LOCATIONS.find((l) => l.id === "marina")!,
    roadRoute: {
      available: true,
      duration: { min: 150, max: 210 },
      cost: 2000,
      trafficStatus: "heavy",
      distance: 32.5,
      majorRoads: ["Ikorodu Road", "Third Mainland Bridge", "Broad Street"],
      segments: [{ type: "road", from: "Ikorodu", to: "Marina", duration: { min: 150, max: 210 }, cost: 2000 }],
    },
    waterRoute: {
      available: true,
      duration: { min: 60, max: 80 },
      cost: 1800,
      nearestJettyFrom: JETTIES.find((j) => j.id === "ikorodu")!,
      nearestJettyTo: JETTIES.find((j) => j.id === "cms")!,
      nextDepartures: ["06:15 AM", "07:00 AM", "07:45 AM"],
      ferrySchedule: FERRY_SCHEDULES.find((f) => f.id === "ikorodu-marina")!,
      segments: [
        { type: "keke", from: "Your location", to: "Ikorodu Jetty", duration: { min: 10, max: 15 }, cost: 200 },
        {
          type: "ferry",
          from: "Ikorodu Jetty",
          to: "Marina Jetty",
          duration: { min: 45, max: 60 },
          cost: 1500,
          details: "LAGFERRY",
        },
        { type: "walk", from: "Marina Jetty", to: "Destination", duration: { min: 5, max: 8 }, cost: 0 },
      ],
    },
    trainRoute: {
      available: false,
      duration: { min: 0, max: 0 },
      cost: 0,
      line: null,
      segments: [],
      fromStation: null,
      toStation: null,
      stopsCount: 0,
      nextDepartures: [],
      status: "available",
    },
    timeSaved: 90,
    moneySaved: 200,
    recommendation: "water",
  },
  "ajah-vi": {
    id: "ajah-vi",
    origin: LAGOS_LOCATIONS.find((l) => l.id === "ajah")!,
    destination: LAGOS_LOCATIONS.find((l) => l.id === "vi")!,
    roadRoute: {
      available: true,
      duration: { min: 90, max: 120 },
      cost: 2200,
      trafficStatus: "moderate",
      distance: 22.0,
      majorRoads: ["Lekki-Epe Expressway", "Admiralty Way", "Adeola Odeku"],
      segments: [{ type: "road", from: "Ajah", to: "VI", duration: { min: 90, max: 120 }, cost: 2200 }],
    },
    waterRoute: {
      available: false,
      duration: { min: 0, max: 0 },
      cost: 0,
      nearestJettyFrom: null,
      nearestJettyTo: null,
      nextDepartures: [],
      ferrySchedule: null,
      segments: [],
    },
    trainRoute: {
      available: false,
      duration: { min: 0, max: 0 },
      cost: 0,
      line: null,
      segments: [],
      fromStation: null,
      toStation: null,
      stopsCount: 0,
      nextDepartures: [],
      status: "available",
    },
    timeSaved: 0,
    moneySaved: 0,
    recommendation: "road",
  },
  "ikeja-marina": {
    id: "ikeja-marina",
    origin: LAGOS_LOCATIONS.find((l) => l.id === "ikeja")!,
    destination: LAGOS_LOCATIONS.find((l) => l.id === "marina")!,
    roadRoute: {
      available: true,
      duration: { min: 90, max: 150 },
      cost: 2500,
      trafficStatus: "heavy",
      distance: 20.5,
      majorRoads: ["Mobolaji Bank Anthony Way", "Ikorodu Road", "Third Mainland Bridge"],
      segments: [{ type: "road", from: "Ikeja", to: "Marina", duration: { min: 90, max: 150 }, cost: 2500 }],
    },
    waterRoute: {
      available: false,
      duration: { min: 0, max: 0 },
      cost: 0,
      nearestJettyFrom: null,
      nearestJettyTo: null,
      nextDepartures: [],
      ferrySchedule: null,
      segments: [],
    },
    trainRoute: {
      available: true,
      duration: { min: 35, max: 45 },
      cost: 400,
      line: TRAIN_LINES.find((l) => l.id === "blue-line")!,
      fromStation: TRAIN_STATIONS.find((s) => s.id === "ikeja-station")!,
      toStation: TRAIN_STATIONS.find((s) => s.id === "marina-station")!,
      stopsCount: 7,
      nextDepartures: ["08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM"],
      status: "recommended",
      segments: [
        {
          type: "walk",
          from: "Your location",
          to: "Ikeja Train Station",
          distance: 800,
          duration: { min: 10, max: 12 },
          cost: 0,
        },
        {
          type: "train",
          from: "Ikeja Station",
          to: "Marina Station",
          duration: { min: 25, max: 30 },
          cost: 400,
          details: "Blue Line - 7 stops",
        },
        {
          type: "walk",
          from: "Marina Station",
          to: "Destination",
          distance: 300,
          duration: { min: 3, max: 5 },
          cost: 0,
        },
      ],
    },
    timeSaved: 75,
    moneySaved: 2100,
    recommendation: "train",
  },
  "yaba-marina": {
    id: "yaba-marina",
    origin: LAGOS_LOCATIONS.find((l) => l.id === "yaba")!,
    destination: LAGOS_LOCATIONS.find((l) => l.id === "marina")!,
    roadRoute: {
      available: true,
      duration: { min: 60, max: 90 },
      cost: 1800,
      trafficStatus: "heavy",
      distance: 12.0,
      majorRoads: ["Herbert Macaulay Way", "Carter Bridge", "Broad Street"],
      segments: [{ type: "road", from: "Yaba", to: "Marina", duration: { min: 60, max: 90 }, cost: 1800 }],
    },
    waterRoute: {
      available: false,
      duration: { min: 0, max: 0 },
      cost: 0,
      nearestJettyFrom: null,
      nearestJettyTo: null,
      nextDepartures: [],
      ferrySchedule: null,
      segments: [],
    },
    trainRoute: {
      available: true,
      duration: { min: 20, max: 28 },
      cost: 300,
      line: TRAIN_LINES.find((l) => l.id === "blue-line")!,
      fromStation: TRAIN_STATIONS.find((s) => s.id === "yaba-station")!,
      toStation: TRAIN_STATIONS.find((s) => s.id === "marina-station")!,
      stopsCount: 4,
      nextDepartures: ["07:45 AM", "08:00 AM", "08:15 AM", "08:30 AM"],
      status: "recommended",
      segments: [
        {
          type: "walk",
          from: "Your location",
          to: "Yaba Train Station",
          distance: 500,
          duration: { min: 6, max: 8 },
          cost: 0,
        },
        {
          type: "train",
          from: "Yaba Station",
          to: "Marina Station",
          duration: { min: 15, max: 18 },
          cost: 300,
          details: "Blue Line - 4 stops",
        },
        {
          type: "walk",
          from: "Marina Station",
          to: "Destination",
          distance: 200,
          duration: { min: 2, max: 4 },
          cost: 0,
        },
      ],
    },
    timeSaved: 50,
    moneySaved: 1500,
    recommendation: "train",
  },
  "oshodi-lagos-island": {
    id: "oshodi-lagos-island",
    origin: LAGOS_LOCATIONS.find((l) => l.id === "oshodi")!,
    destination: LAGOS_LOCATIONS.find((l) => l.id === "lagos-island")!,
    roadRoute: {
      available: true,
      duration: { min: 75, max: 120 },
      cost: 2000,
      trafficStatus: "heavy",
      distance: 15.0,
      majorRoads: ["Oshodi Expressway", "Third Mainland Bridge", "Marina"],
      segments: [{ type: "road", from: "Oshodi", to: "Lagos Island", duration: { min: 75, max: 120 }, cost: 2000 }],
    },
    waterRoute: {
      available: false,
      duration: { min: 0, max: 0 },
      cost: 0,
      nearestJettyFrom: null,
      nearestJettyTo: null,
      nextDepartures: [],
      ferrySchedule: null,
      segments: [],
    },
    trainRoute: {
      available: true,
      duration: { min: 28, max: 35 },
      cost: 350,
      line: TRAIN_LINES.find((l) => l.id === "blue-line")!,
      fromStation: TRAIN_STATIONS.find((s) => s.id === "oshodi-station")!,
      toStation: TRAIN_STATIONS.find((s) => s.id === "lagos-island-station")!,
      stopsCount: 5,
      nextDepartures: ["07:30 AM", "07:45 AM", "08:00 AM", "08:15 AM"],
      status: "recommended",
      segments: [
        {
          type: "walk",
          from: "Your location",
          to: "Oshodi Train Station",
          distance: 600,
          duration: { min: 7, max: 9 },
          cost: 0,
        },
        {
          type: "train",
          from: "Oshodi Station",
          to: "Lagos Island Station",
          duration: { min: 20, max: 22 },
          cost: 350,
          details: "Blue Line - 5 stops",
        },
        {
          type: "walk",
          from: "Lagos Island Station",
          to: "Destination",
          distance: 400,
          duration: { min: 5, max: 6 },
          cost: 0,
        },
      ],
    },
    timeSaved: 65,
    moneySaved: 1650,
    recommendation: "train",
  },
  // </CHANGE>
}
// </CHANGE>

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-trip", name: "First Sail", description: "Take your first water route", icon: "anchor", unlocked: false },
  {
    id: "water-warrior",
    name: "Water Warrior",
    description: "Take 5 water route trips",
    icon: "ship",
    unlocked: false,
  },
  { id: "time-saver", name: "Time Saver", description: "Save over 5 hours total", icon: "clock", unlocked: false },
  { id: "money-saver", name: "Money Saver", description: "Save over ₦10,000 total", icon: "wallet", unlocked: false },
  {
    id: "consistent",
    name: "Consistent Commuter",
    description: "Use the app for 7 days straight",
    icon: "calendar",
    unlocked: false,
  },
  { id: "explorer", name: "Route Explorer", description: "Save 3 different routes", icon: "map", unlocked: false },
  { id: "rail-rider", name: "Rail Rider", description: "Take 5 train trips", icon: "train", unlocked: false },
  {
    id: "multimodal-master",
    name: "Multimodal Master",
    description: "Use all 3 transport modes in one week",
    icon: "shuffle",
    unlocked: false,
  },
  {
    id: "train-champion",
    name: "Train Champion",
    description: "Take 10 consecutive train commutes",
    icon: "trophy",
    unlocked: false,
  },
]
// </CHANGE>

// Helper functions
export function getTrafficStatus(hour: number): "light" | "moderate" | "heavy" {
  if (hour >= 6 && hour < 10) return "heavy"
  if (hour >= 10 && hour < 15) return "moderate"
  if (hour >= 15 && hour < 20) return "heavy"
  return "light"
}

export function getNextFerryDepartures(jettyId: string, currentTime: Date): string[] {
  const schedule = FERRY_SCHEDULES.find((s) => s.fromJetty === jettyId)
  if (!schedule) return []

  const departures: string[] = []
  const [openHour] = schedule.operatingHours.open.split(":").map(Number)
  const [closeHour] = schedule.operatingHours.close.split(":").map(Number)

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()

  for (let hour = openHour; hour < closeHour; hour++) {
    for (let min = 0; min < 60; min += schedule.interval) {
      const departureMinutes = hour * 60 + min
      if (departureMinutes > currentMinutes && departures.length < 3) {
        const time = new Date(currentTime)
        time.setHours(hour, min, 0, 0)
        departures.push(time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }))
      }
    }
  }

  return departures
}

export function getNextTrainDepartures(stationId: string, lineId: string, currentTime: Date): string[] {
  const line = TRAIN_LINES.find((l) => l.id === lineId)
  if (!line) return []

  const departures: string[] = []
  const [openHour] = line.operatingHours.open.split(":").map(Number)
  const [closeHour] = line.operatingHours.close.split(":").map(Number)
  const hour = currentTime.getHours()
  const isPeak = (hour >= 6 && hour < 10) || (hour >= 16 && hour < 20)
  const interval = isPeak ? line.peakInterval : line.offPeakInterval

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()

  for (let h = openHour; h < closeHour; h++) {
    for (let min = 0; min < 60; min += interval) {
      const departureMinutes = h * 60 + min
      if (departureMinutes > currentMinutes && departures.length < 4) {
        const time = new Date(currentTime)
        time.setHours(h, min, 0, 0)
        departures.push(time.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }))
      }
    }
  }

  return departures
}
// </CHANGE>

export function calculateTimeDifference(
  road: { min: number; max: number },
  water: { min: number; max: number },
): number {
  const roadAvg = (road.min + road.max) / 2
  const waterAvg = (water.min + water.max) / 2
  return Math.round(roadAvg - waterAvg)
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`
}
