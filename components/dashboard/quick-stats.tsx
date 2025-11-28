"use client"

import { useRoute } from "@/lib/route-context"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Wallet, Ship, Train, ChevronRight, Car, TrendingUp } from "lucide-react"
import { formatDuration, formatNaira } from "@/lib/mock-data"

interface QuickStatsProps {
  onViewDetails: () => void
}

export function QuickStats({ onViewDetails }: QuickStatsProps) {
  const { weeklyStats } = useRoute()

  // Determine most used mode
  const modes = [
    { type: "road", count: weeklyStats.roadRoutesTaken, icon: Car, color: "slate" },
    { type: "water", count: weeklyStats.waterRoutesTaken, icon: Ship, color: "cyan" },
    { type: "train", count: weeklyStats.trainRoutesTaken, icon: Train, color: "violet" },
  ]
  const preferredMode = modes.reduce((prev, curr) => (curr.count > prev.count ? curr : prev))
  const totalTrips = weeklyStats.waterRoutesTaken + weeklyStats.trainRoutesTaken + weeklyStats.roadRoutesTaken

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">This Week</h2>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" />
            <span>+{totalTrips} trips</span>
          </div>
        </div>
        <button
          onClick={onViewDetails}
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          View details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Time Saved */}
        <Card className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/20 overflow-hidden">
          <CardContent className="p-4 text-center relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-500/30">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              {formatDuration(weeklyStats.timeSaved)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Time saved</p>
          </CardContent>
        </Card>

        {/* Money Saved */}
        <Card className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 overflow-hidden">
          <CardContent className="p-4 text-center relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-amber-500/30">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
              {formatNaira(weeklyStats.moneySaved)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Money saved</p>
          </CardContent>
        </Card>

        {/* Routes Taken */}
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 overflow-hidden">
          <CardContent className="p-4 text-center relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center justify-center gap-1 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-md">
                <Ship className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md">
                <Train className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-md">
                <Car className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalTrips}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {weeklyStats.trainRoutesTaken} train • {weeklyStats.waterRoutesTaken} ferry •{" "}
              {weeklyStats.roadRoutesTaken} road
            </p>
          </CardContent>
        </Card>

        {/* Preferred Mode */}
        <Card
          className={`overflow-hidden ${
            preferredMode.type === "train"
              ? "bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-transparent border-violet-500/20"
              : preferredMode.type === "water"
                ? "bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-500/20"
                : "bg-gradient-to-br from-slate-500/10 via-slate-500/5 to-transparent border-slate-500/20"
          }`}
        >
          <CardContent className="p-4 text-center relative">
            <div
              className={`absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-1/2 translate-x-1/2 ${
                preferredMode.type === "train"
                  ? "bg-violet-500/10"
                  : preferredMode.type === "water"
                    ? "bg-cyan-500/10"
                    : "bg-slate-500/10"
              }`}
            />
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg ${
                preferredMode.type === "train"
                  ? "bg-gradient-to-br from-violet-400 to-purple-500 shadow-violet-500/30"
                  : preferredMode.type === "water"
                    ? "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/30"
                    : "bg-gradient-to-br from-slate-400 to-slate-500 shadow-slate-500/30"
              }`}
            >
              {preferredMode.type === "train" && <Train className="w-5 h-5 text-white" />}
              {preferredMode.type === "water" && <Ship className="w-5 h-5 text-white" />}
              {preferredMode.type === "road" && <Car className="w-5 h-5 text-white" />}
            </div>
            <p
              className={`text-lg font-bold capitalize ${
                preferredMode.type === "train"
                  ? "text-violet-600 dark:text-violet-400"
                  : preferredMode.type === "water"
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-slate-600 dark:text-slate-400"
              }`}
            >
              {preferredMode.type}
            </p>
            <p className="text-xs text-muted-foreground">Preferred mode</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
