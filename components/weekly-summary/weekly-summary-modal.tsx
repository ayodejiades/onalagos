"use client"

import { useRoute } from "@/lib/route-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Wallet, Ship, Car, Train, TrendingUp, Share2, Award, CalendarDays } from "lucide-react"
import { formatDuration, formatNaira } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts"

interface WeeklySummaryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WeeklySummaryModal({ open, onOpenChange }: WeeklySummaryModalProps) {
  const { weeklyStats, achievements } = useRoute()

  // Transform daily data for chart
  const chartData = weeklyStats.dailyData.map((day, index) => {
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return {
      name: dayNames[index % 7],
      timeSaved: day.timeSaved,
      routeType: day.routeType,
    }
  })

  const unlockedAchievements = achievements.filter((a) => a.unlocked)

  const handleShare = () => {
    const text = `I saved ${formatDuration(weeklyStats.timeSaved)} and ${formatNaira(weeklyStats.moneySaved)} this week using Ọna - Lagos Route Optimizer! Beat the traffic with smart water and train routes.`
    if (navigator.share) {
      navigator.share({ title: "My Weekly Commute Summary", text })
    } else {
      navigator.clipboard.writeText(text)
      alert("Summary copied to clipboard!")
    }
  }

  const getRouteColor = (type: string | null) => {
    switch (type) {
      case "train":
        return "#0066CC"
      case "water":
        return "oklch(0.50 0.18 240)"
      case "road":
        return "oklch(0.50 0.02 240)"
      default:
        return "var(--muted)"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Weekly Summary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-success-light border-success/20">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-3xl font-bold text-success">{formatDuration(weeklyStats.timeSaved)}</p>
                <p className="text-sm text-success/80">Total time saved</p>
              </CardContent>
            </Card>

            <Card className="bg-success-light border-success/20">
              <CardContent className="p-4 text-center">
                <Wallet className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-3xl font-bold text-success">{formatNaira(weeklyStats.moneySaved)}</p>
                <p className="text-sm text-success/80">Total money saved</p>
              </CardContent>
            </Card>
          </div>

          {/* Route Breakdown */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                This Week's Routes
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#0066CC]/10">
                  <div className="w-8 h-8 rounded-full bg-[#0066CC]/20 flex items-center justify-center">
                    <Train className="w-4 h-4 text-[#0066CC]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#0066CC]">{weeklyStats.trainRoutesTaken}</p>
                    <p className="text-xs text-[#0066CC]/80">Train</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-water-light">
                  <div className="w-8 h-8 rounded-full bg-water/20 flex items-center justify-center">
                    <Ship className="w-4 h-4 text-water" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-water">{weeklyStats.waterRoutesTaken}</p>
                    <p className="text-xs text-water/80">Water</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-road-light">
                  <div className="w-8 h-8 rounded-full bg-road/20 flex items-center justify-center">
                    <Car className="w-4 h-4 text-road" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-road">{weeklyStats.roadRoutesTaken}</p>
                    <p className="text-xs text-road/80">Road</p>
                  </div>
                </div>
              </div>

              {/* Calendar View */}
              <div className="flex gap-2 justify-center">
                {weeklyStats.dailyData.slice(-7).map((day, i) => {
                  const dayNames = ["M", "T", "W", "T", "F", "S", "S"]
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-xs text-muted-foreground">{dayNames[i]}</span>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground"
                        style={{ backgroundColor: getRouteColor(day.routeType) }}
                      >
                        {day.routeType === "train" && <Train className="w-4 h-4" />}
                        {day.routeType === "water" && <Ship className="w-4 h-4" />}
                        {day.routeType === "road" && <Car className="w-4 h-4" />}
                        {!day.routeType && <span className="text-muted-foreground text-xs">-</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Daily Time Saved Chart */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Daily Time Saved</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      tickFormatter={(value) => `${value}m`}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value} min`, "Time Saved"]}
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="timeSaved" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRouteColor(entry.routeType)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Achievements
              </h3>

              {unlockedAchievements.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {unlockedAchievements.map((achievement) => (
                    <Badge
                      key={achievement.id}
                      className="bg-accent/20 text-accent-foreground border-accent/30 py-1.5 px-3"
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {achievement.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Take more trips to unlock achievements!
                </p>
              )}

              {/* Next Achievement */}
              {!achievements.find((a) => a.id === "rail-rider")?.unlocked && weeklyStats.trainRoutesTaken < 5 && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium text-foreground">Next Achievement</p>
                  <p className="text-xs text-muted-foreground">
                    Rail Rider - Take {5 - weeklyStats.trainRoutesTaken} more train trips
                  </p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0066CC] transition-all"
                      style={{ width: `${(weeklyStats.trainRoutesTaken / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {!achievements.find((a) => a.id === "multimodal-master")?.unlocked && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium text-foreground">Multimodal Master</p>
                  <p className="text-xs text-muted-foreground">Use all 3 transport modes in one week</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={weeklyStats.trainRoutesTaken > 0 ? "default" : "outline"} className="text-xs">
                      <Train className="w-3 h-3 mr-1" /> Train {weeklyStats.trainRoutesTaken > 0 ? "✓" : ""}
                    </Badge>
                    <Badge variant={weeklyStats.waterRoutesTaken > 0 ? "default" : "outline"} className="text-xs">
                      <Ship className="w-3 h-3 mr-1" /> Water {weeklyStats.waterRoutesTaken > 0 ? "✓" : ""}
                    </Badge>
                    <Badge variant={weeklyStats.roadRoutesTaken > 0 ? "default" : "outline"} className="text-xs">
                      <Car className="w-3 h-3 mr-1" /> Road {weeklyStats.roadRoutesTaken > 0 ? "✓" : ""}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Share Button */}
          <Button variant="outline" className="w-full bg-transparent" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share My Results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
// </CHANGE>
