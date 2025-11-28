"use client"

import { useState, useEffect } from "react"
import { useRoute } from "@/lib/route-context"
import { DashboardHeader } from "./dashboard-header"
import { RouteComparisonCards } from "./route-comparison-cards"
import { QuickStats } from "./quick-stats"
import { SavedRoutesList } from "./saved-routes-list"
import { AlertBanner } from "./alert-banner"
import { RouteDetailsModal } from "../route-details/route-details-modal"
import { FerryGuideModal } from "../ferry-guide/ferry-guide-modal"
import { TrainGuideModal } from "../train-guide/train-guide-modal"
import { SettingsSheet } from "../settings/settings-sheet"
import { WeeklySummaryModal } from "../weekly-summary/weekly-summary-modal"
import { Footer } from "../layout/footer"
import type { RouteTab } from "@/lib/types"

export function Dashboard() {
  const { savedRoutes, getRouteComparison, setCurrentComparison, currentComparison } = useRoute()
  const [showRouteDetails, setShowRouteDetails] = useState(false)
  const [activeRouteTab, setActiveRouteTab] = useState<RouteTab>("road")
  const [showSettings, setShowSettings] = useState(false)
  const [showWeeklySummary, setShowWeeklySummary] = useState(false)

  // Load first saved route on mount
  useEffect(() => {
    if (savedRoutes.length > 0 && !currentComparison) {
      const route = savedRoutes[0]
      const comparison = getRouteComparison(route.origin.id, route.destination.id)
      if (comparison) {
        setCurrentComparison(comparison)
      }
    }
  }, [savedRoutes, currentComparison, getRouteComparison, setCurrentComparison])

  const handleViewDetails = (tab: RouteTab) => {
    setActiveRouteTab(tab)
    setShowRouteDetails(true)
  }

  const handleSelectRoute = (originId: string, destinationId: string) => {
    const comparison = getRouteComparison(originId, destinationId)
    if (comparison) {
      setCurrentComparison(comparison)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader
        onOpenSettings={() => setShowSettings(true)}
        onOpenWeeklySummary={() => setShowWeeklySummary(true)}
      />

      <main className="flex-1 px-4 py-4 max-w-6xl mx-auto w-full space-y-6 pb-8">
        {/* Alert Banner */}
        <AlertBanner />

        {/* Route Comparison */}
        {currentComparison ? (
          <RouteComparisonCards comparison={currentComparison} onViewDetails={handleViewDetails} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No route selected. Add a route to get started.</p>
          </div>
        )}

        {/* Quick Stats */}
        <QuickStats onViewDetails={() => setShowWeeklySummary(true)} />

        {/* Saved Routes */}
        <SavedRoutesList onSelectRoute={handleSelectRoute} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Route Details Modal */}
      <RouteDetailsModal
        open={showRouteDetails}
        onOpenChange={setShowRouteDetails}
        comparison={currentComparison}
        defaultTab={activeRouteTab}
      />

      {/* Ferry Guide Modal */}
      <FerryGuideModal />

      {/* Train Guide Modal */}
      <TrainGuideModal />

      {/* Settings Sheet */}
      <SettingsSheet open={showSettings} onOpenChange={setShowSettings} />

      {/* Weekly Summary Modal */}
      <WeeklySummaryModal open={showWeeklySummary} onOpenChange={setShowWeeklySummary} />
    </div>
  )
}
// </CHANGE>
