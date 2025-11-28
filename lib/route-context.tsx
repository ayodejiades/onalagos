"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type {
  Location,
  SavedRoute,
  WeeklyStats,
  UserPreferences,
  RouteComparison,
  OnboardingStep,
  Achievement,
} from "./types"
import {
  LAGOS_LOCATIONS,
  ROUTE_COMPARISONS,
  ACHIEVEMENTS,
  getTrafficStatus,
  getNextFerryDepartures,
  getNextTrainDepartures,
  calculateTimeDifference,
} from "./mock-data"

interface RouteContextType {
  // Locations
  locations: Location[]

  // Onboarding
  onboardingStep: OnboardingStep
  setOnboardingStep: (step: OnboardingStep) => void

  // User preferences
  preferences: UserPreferences
  updatePreferences: (prefs: Partial<UserPreferences>) => void

  // Saved routes
  savedRoutes: SavedRoute[]
  addSavedRoute: (route: Omit<SavedRoute, "id">) => void
  removeSavedRoute: (id: string) => void
  updateSavedRoute: (id: string, route: Partial<SavedRoute>) => void

  // Current route comparison
  currentComparison: RouteComparison | null
  setCurrentComparison: (comparison: RouteComparison | null) => void
  getRouteComparison: (originId: string, destinationId: string) => RouteComparison | null

  // Weekly stats
  weeklyStats: WeeklyStats
  recordTrip: (routeType: "road" | "water" | "train", timeSaved: number, moneySaved: number) => void

  // Achievements
  achievements: Achievement[]
  checkAchievements: () => void

  // UI State
  showFerryGuide: boolean
  setShowFerryGuide: (show: boolean) => void
  showTrainGuide: boolean
  setShowTrainGuide: (show: boolean) => void
}

const RouteContext = createContext<RouteContextType | null>(null)

export function RouteProvider({ children }: { children: ReactNode }) {
  // Onboarding
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("welcome")

  const [preferences, setPreferences] = useState<UserPreferences>({
    alertsEnabled: true,
    alertMinutesBefore: 30,
    onlyAlertWhenBetter: true,
    hasCompletedOnboarding: false,
    preferredModes: {
      road: true,
      water: true,
      train: true,
    },
  })
  // </CHANGE>

  // Saved routes
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([])

  // Current comparison
  const [currentComparison, setCurrentComparison] = useState<RouteComparison | null>(null)

  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({
    timeSaved: 200,
    moneySaved: 3400,
    waterRoutesTaken: 2,
    roadRoutesTaken: 1,
    trainRoutesTaken: 3,
    dailyData: [
      { date: "2024-01-22", routeType: "train", timeSaved: 65, moneySaved: 1650 },
      { date: "2024-01-23", routeType: "water", timeSaved: 45, moneySaved: 800 },
      { date: "2024-01-24", routeType: "road", timeSaved: 0, moneySaved: 0 },
      { date: "2024-01-25", routeType: "train", timeSaved: 50, moneySaved: 500 },
      { date: "2024-01-26", routeType: "train", timeSaved: 40, moneySaved: 450 },
    ],
  })
  // </CHANGE>

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS)

  // UI State
  const [showFerryGuide, setShowFerryGuide] = useState(false)
  const [showTrainGuide, setShowTrainGuide] = useState(false)

  // Update preferences
  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...prefs }))
  }, [])

  // Add saved route
  const addSavedRoute = useCallback((route: Omit<SavedRoute, "id">) => {
    const newRoute: SavedRoute = {
      ...route,
      id: `route-${Date.now()}`,
    }
    setSavedRoutes((prev) => [...prev, newRoute])
  }, [])

  // Remove saved route
  const removeSavedRoute = useCallback((id: string) => {
    setSavedRoutes((prev) => prev.filter((r) => r.id !== id))
  }, [])

  // Update saved route
  const updateSavedRoute = useCallback((id: string, route: Partial<SavedRoute>) => {
    setSavedRoutes((prev) => prev.map((r) => (r.id === id ? { ...r, ...route } : r)))
  }, [])

  const getRouteComparison = useCallback((originId: string, destinationId: string): RouteComparison | null => {
    const key = `${originId}-${destinationId}`
    const comparison = ROUTE_COMPARISONS[key]

    if (comparison) {
      // Update with current traffic and ferry/train times
      const now = new Date()
      const hour = now.getHours()
      const trafficStatus = getTrafficStatus(hour)

      // Adjust road duration based on traffic
      const trafficMultiplier = trafficStatus === "heavy" ? 1.3 : trafficStatus === "moderate" ? 1.1 : 0.9
      const adjustedRoadDuration = {
        min: Math.round(comparison.roadRoute.duration.min * trafficMultiplier),
        max: Math.round(comparison.roadRoute.duration.max * trafficMultiplier),
      }

      // Get next ferry departures
      const nextFerryDepartures = comparison.waterRoute.nearestJettyFrom
        ? getNextFerryDepartures(comparison.waterRoute.nearestJettyFrom.id, now)
        : []

      // Get next train departures
      const nextTrainDepartures =
        comparison.trainRoute.fromStation && comparison.trainRoute.line
          ? getNextTrainDepartures(comparison.trainRoute.fromStation.id, comparison.trainRoute.line.id, now)
          : []

      const updatedComparison: RouteComparison = {
        ...comparison,
        roadRoute: {
          ...comparison.roadRoute,
          duration: adjustedRoadDuration,
          trafficStatus,
        },
        waterRoute: {
          ...comparison.waterRoute,
          nextDepartures: nextFerryDepartures,
        },
        trainRoute: {
          ...comparison.trainRoute,
          nextDepartures: nextTrainDepartures,
        },
        timeSaved: comparison.trainRoute.available
          ? calculateTimeDifference(adjustedRoadDuration, comparison.trainRoute.duration)
          : comparison.waterRoute.available
            ? calculateTimeDifference(adjustedRoadDuration, comparison.waterRoute.duration)
            : 0,
      }

      return updatedComparison
    }

    // Generate a generic comparison if not found
    const origin = LAGOS_LOCATIONS.find((l) => l.id === originId)
    const destination = LAGOS_LOCATIONS.find((l) => l.id === destinationId)

    if (origin && destination) {
      return {
        id: key,
        origin,
        destination,
        roadRoute: {
          available: true,
          duration: { min: 60, max: 90 },
          cost: 1500,
          trafficStatus: getTrafficStatus(new Date().getHours()),
          distance: 15,
          majorRoads: ["Main roads"],
          segments: [],
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
      }
    }

    return null
  }, [])
  // </CHANGE>

  const recordTrip = useCallback((routeType: "road" | "water" | "train", timeSaved: number, moneySaved: number) => {
    const today = new Date().toISOString().split("T")[0]

    setWeeklyStats((prev) => ({
      timeSaved: prev.timeSaved + timeSaved,
      moneySaved: prev.moneySaved + moneySaved,
      waterRoutesTaken: routeType === "water" ? prev.waterRoutesTaken + 1 : prev.waterRoutesTaken,
      roadRoutesTaken: routeType === "road" ? prev.roadRoutesTaken + 1 : prev.roadRoutesTaken,
      trainRoutesTaken: routeType === "train" ? prev.trainRoutesTaken + 1 : prev.trainRoutesTaken,
      dailyData: [...prev.dailyData, { date: today, routeType, timeSaved, moneySaved }],
    }))
  }, [])
  // </CHANGE>

  const checkAchievements = useCallback(() => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.unlocked) return achievement

        switch (achievement.id) {
          case "first-trip":
            return weeklyStats.waterRoutesTaken >= 1
              ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
              : achievement
          case "water-warrior":
            return weeklyStats.waterRoutesTaken >= 5
              ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
              : achievement
          case "rail-rider":
            return weeklyStats.trainRoutesTaken >= 5
              ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
              : achievement
          case "multimodal-master":
            return weeklyStats.waterRoutesTaken >= 1 &&
              weeklyStats.trainRoutesTaken >= 1 &&
              weeklyStats.roadRoutesTaken >= 1
              ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
              : achievement
          case "time-saver":
            return weeklyStats.timeSaved >= 300
              ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
              : achievement
          case "money-saver":
            return weeklyStats.moneySaved >= 10000
              ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
              : achievement
          case "explorer":
            return savedRoutes.length >= 3
              ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
              : achievement
          default:
            return achievement
        }
      }),
    )
  }, [weeklyStats, savedRoutes])
  // </CHANGE>

  return (
    <RouteContext.Provider
      value={{
        locations: LAGOS_LOCATIONS,
        onboardingStep,
        setOnboardingStep,
        preferences,
        updatePreferences,
        savedRoutes,
        addSavedRoute,
        removeSavedRoute,
        updateSavedRoute,
        currentComparison,
        setCurrentComparison,
        getRouteComparison,
        weeklyStats,
        recordTrip,
        achievements,
        checkAchievements,
        showFerryGuide,
        setShowFerryGuide,
        showTrainGuide,
        setShowTrainGuide,
      }}
    >
      {children}
    </RouteContext.Provider>
  )
}

export function useRoute() {
  const context = useContext(RouteContext)
  if (!context) {
    throw new Error("useRoute must be used within a RouteProvider")
  }
  return context
}
