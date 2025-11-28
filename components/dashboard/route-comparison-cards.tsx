"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  Ship,
  Train,
  Clock,
  ArrowRight,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Timer,
  ArrowLeftRight,
  Sparkles,
} from "lucide-react"
import { formatDuration, formatNaira } from "@/lib/mock-data"
import type { RouteComparison, RouteTab } from "@/lib/types"
import { useRoute } from "@/lib/route-context"

interface RouteComparisonCardsProps {
  comparison: RouteComparison
  onViewDetails: (tab: RouteTab) => void
}

function getTrafficBadgeStyles(status: "light" | "moderate" | "heavy") {
  switch (status) {
    case "heavy":
      return "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30"
    case "moderate":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
    case "light":
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
  }
}

function getTrafficLabel(status: "light" | "moderate" | "heavy") {
  switch (status) {
    case "heavy":
      return "Heavy Traffic"
    case "moderate":
      return "Moderate Traffic"
    case "light":
      return "Light Traffic"
  }
}

export function RouteComparisonCards({ comparison, onViewDetails }: RouteComparisonCardsProps) {
  const { setShowFerryGuide, setShowTrainGuide, getRouteComparison, setCurrentComparison } = useRoute()
  const { origin, destination, roadRoute, waterRoute, trainRoute, timeSaved, moneySaved, recommendation } = comparison

  // Count available routes
  const availableRoutes = [roadRoute.available, waterRoute.available, trainRoute.available].filter(Boolean).length

  const handleSwapRoute = () => {
    const reversedComparison = getRouteComparison(destination.id, origin.id)
    if (reversedComparison) {
      setCurrentComparison(reversedComparison)
    }
  }

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-foreground">Today's Recommendation</h2>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{origin.shortName || origin.name}</span>
            <ArrowRight className="w-3 h-3" />
            <span className="font-medium text-foreground">{destination.shortName || destination.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10"
              onClick={handleSwapRoute}
            >
              <ArrowLeftRight className="w-3 h-3 mr-1" />
              Swap
            </Button>
          </div>
        </div>
        {(recommendation === "water" || recommendation === "train") && timeSaved > 0 && (
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg shadow-emerald-500/25">
            <TrendingDown className="w-3 h-3 mr-1" />
            Save {formatDuration(timeSaved)}
          </Badge>
        )}
      </div>

      {/* Cards Grid - responsive 1/2/3 columns */}
      <div
        className={`grid gap-4 ${availableRoutes === 1 ? "grid-cols-1 max-w-md mx-auto" : availableRoutes === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
      >
        {/* Road Route Card */}
        <Card
          className={`relative overflow-hidden transition-all hover:shadow-lg hover:shadow-slate-500/10 ${recommendation === "road" ? "ring-2 ring-primary shadow-lg shadow-primary/20" : "hover:border-slate-400/50"}`}
        >
          {recommendation === "road" && (
            <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
              Recommended
            </div>
          )}
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-inner">
                  <Car className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </div>
                <span className="font-semibold text-foreground">Road Route</span>
              </div>
              <Badge variant="outline" className={getTrafficBadgeStyles(roadRoute.trafficStatus)}>
                {getTrafficLabel(roadRoute.trafficStatus)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Duration & Cost */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground">
                  {formatDuration(roadRoute.duration.min)} - {formatDuration(roadRoute.duration.max)}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Est. travel time
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{formatNaira(roadRoute.cost)}</p>
                <p className="text-xs text-muted-foreground">Est. cost</p>
              </div>
            </div>

            {/* Route Preview - More colorful */}
            <div className="h-16 rounded-lg bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center relative overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 px-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-sm" />
                  <div className="h-0.5 w-6 bg-slate-300 dark:bg-slate-600 rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <div className="h-0.5 w-6 bg-slate-300 dark:bg-slate-600 rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <div className="h-0.5 w-6 bg-slate-300 dark:bg-slate-600 rounded-full" />
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 shadow-sm" />
                </div>
              </div>
            </div>

            {/* Major Roads */}
            <div>
              <p className="text-xs text-muted-foreground mb-1">Via:</p>
              <p className="text-xs text-foreground line-clamp-1">{roadRoute.majorRoads.slice(0, 2).join(" → ")}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent"
              onClick={() => onViewDetails("road")}
            >
              View Details
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Water Route Card */}
        {waterRoute.available ? (
          <Card
            className={`relative overflow-hidden transition-all hover:shadow-lg ${recommendation === "water" ? "ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20" : "hover:border-cyan-400/50 hover:shadow-cyan-500/10"}`}
          >
            {recommendation === "water" && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                Recommended
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Ship className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-foreground">Water Route</span>
                </div>
                <Badge className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Available
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Duration & Cost */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {formatDuration(waterRoute.duration.min)} - {formatDuration(waterRoute.duration.max)}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Est. travel time
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{formatNaira(waterRoute.cost)}</p>
                  <p className="text-xs text-muted-foreground">Est. cost</p>
                </div>
              </div>

              {/* Savings Badge */}
              {recommendation === "water" && (timeSaved > 0 || moneySaved > 0) && (
                <div className="bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-lg p-2 flex items-center justify-center gap-3 border border-emerald-500/20">
                  {timeSaved > 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                      Save {formatDuration(timeSaved)}
                    </span>
                  )}
                  {timeSaved > 0 && moneySaved > 0 && <span className="text-emerald-400/50">•</span>}
                  {moneySaved > 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                      Save {formatNaira(moneySaved)}
                    </span>
                  )}
                </div>
              )}

              {/* Route Preview - Water themed */}
              <div className="h-16 rounded-lg bg-gradient-to-br from-cyan-100 via-blue-50 to-cyan-100 dark:from-cyan-950 dark:via-blue-950 dark:to-cyan-950 flex items-center justify-center relative overflow-hidden border border-cyan-200/50 dark:border-cyan-800/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
                    <Ship className="w-5 h-5 text-cyan-500 animate-float" />
                    <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-500" />
                  </div>
                </div>
              </div>

              {/* Next Ferry */}
              {waterRoute.nextDepartures.length > 0 && (
                <div className="flex items-center gap-2 text-xs bg-cyan-500/10 rounded-md px-2 py-1.5">
                  <Timer className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-muted-foreground">Next:</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">{waterRoute.nextDepartures[0]}</span>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25"
                  onClick={() => onViewDetails("water")}
                >
                  View Details
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-cyan-300 dark:border-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-950 bg-transparent"
                  onClick={() => setShowFerryGuide(true)}
                  title="First time taking a ferry?"
                >
                  <AlertCircle className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="relative overflow-hidden bg-muted/50 border-dashed">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Ship className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="font-semibold text-muted-foreground">Water Route</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">No water route available</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Train Route Card */}
        {trainRoute.available ? (
          <Card
            className={`relative overflow-hidden transition-all hover:shadow-lg ${recommendation === "train" ? "ring-2 ring-violet-500 shadow-lg shadow-violet-500/20" : "hover:border-violet-400/50 hover:shadow-violet-500/10"}`}
          >
            {recommendation === "train" && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                Recommended
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${trainRoute.line?.color || "#8B5CF6"}, ${trainRoute.line?.color || "#8B5CF6"}dd)`,
                      boxShadow: `0 4px 14px ${trainRoute.line?.color || "#8B5CF6"}40`,
                    }}
                  >
                    <Train className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-foreground">Train Route</span>
                </div>
                <Badge
                  className="border font-medium"
                  style={{
                    backgroundColor: `${trainRoute.line?.color}20`,
                    color: trainRoute.line?.color,
                    borderColor: `${trainRoute.line?.color}40`,
                  }}
                >
                  {trainRoute.line?.name}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Duration & Cost */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {formatDuration(trainRoute.duration.min)} - {formatDuration(trainRoute.duration.max)}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Est. travel time
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{formatNaira(trainRoute.cost)}</p>
                  <p className="text-xs text-muted-foreground">Est. cost</p>
                </div>
              </div>

              {/* Savings Badge */}
              {recommendation === "train" && (timeSaved > 0 || moneySaved > 0) && (
                <div className="bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-lg p-2 flex items-center justify-center gap-3 border border-emerald-500/20">
                  {timeSaved > 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                      Save {formatDuration(timeSaved)}
                    </span>
                  )}
                  {timeSaved > 0 && moneySaved > 0 && <span className="text-emerald-400/50">•</span>}
                  {moneySaved > 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                      Save {formatNaira(moneySaved)}
                    </span>
                  )}
                </div>
              )}

              {/* Route Preview - Train themed */}
              <div
                className="h-16 rounded-lg flex items-center justify-center relative overflow-hidden border"
                style={{
                  background: `linear-gradient(135deg, ${trainRoute.line?.color}15, ${trainRoute.line?.color}08)`,
                  borderColor: `${trainRoute.line?.color}30`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-1 px-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
                    <div className="flex items-center">
                      {[...Array(Math.min(trainRoute.stopsCount, 5))].map((_, i) => (
                        <div key={i} className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full shadow-sm"
                            style={{ backgroundColor: trainRoute.line?.color }}
                          />
                          {i < Math.min(trainRoute.stopsCount, 5) - 1 && (
                            <div
                              className="h-0.5 w-4 rounded-full"
                              style={{ backgroundColor: `${trainRoute.line?.color}60` }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-500" />
                  </div>
                </div>
              </div>

              {/* Stops info */}
              <p className="text-xs text-muted-foreground">
                {trainRoute.stopsCount} stops • Every {trainRoute.line?.peakInterval} min
              </p>

              {/* Next Train */}
              {trainRoute.nextDepartures.length > 0 && (
                <div
                  className="flex items-center gap-2 text-xs rounded-md px-2 py-1.5"
                  style={{ backgroundColor: `${trainRoute.line?.color}15` }}
                >
                  <Timer className="w-3 h-3" style={{ color: trainRoute.line?.color }} />
                  <span className="text-muted-foreground">Next:</span>
                  <span className="font-semibold" style={{ color: trainRoute.line?.color }}>
                    {trainRoute.nextDepartures[0]}
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${trainRoute.line?.color}, ${trainRoute.line?.color}dd)`,
                    boxShadow: `0 4px 14px ${trainRoute.line?.color}40`,
                  }}
                  onClick={() => onViewDetails("train")}
                >
                  View Details
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  style={{
                    borderColor: `${trainRoute.line?.color}40`,
                  }}
                  onClick={() => setShowTrainGuide(true)}
                  title="First time taking the train?"
                >
                  <AlertCircle className="w-3 h-3" style={{ color: trainRoute.line?.color }} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="relative overflow-hidden bg-muted/50 border-dashed">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Train className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="font-semibold text-muted-foreground">Train Route</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">No train route available</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
