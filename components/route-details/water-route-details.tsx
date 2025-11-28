"use client"

import { useRoute } from "@/lib/route-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Ship,
  Clock,
  MapPin,
  Navigation,
  Timer,
  Footprints,
  Info,
  Star,
  Shield,
  HelpCircle,
  CheckCircle2,
} from "lucide-react"
import { formatDuration, formatNaira } from "@/lib/mock-data"
import type { WaterRoute, Location } from "@/lib/types"

interface WaterRouteDetailsProps {
  route: WaterRoute
  origin: Location
  destination: Location
}

function getSegmentIcon(type: string) {
  switch (type) {
    case "walk":
      return Footprints
    case "ferry":
      return Ship
    case "keke":
    case "uber":
      return Navigation
    default:
      return MapPin
  }
}

function getSegmentLabel(type: string) {
  switch (type) {
    case "walk":
      return "Walk"
    case "ferry":
      return "Ferry"
    case "keke":
      return "Keke"
    case "uber":
      return "Uber/Bolt"
    default:
      return type
  }
}

export function WaterRouteDetails({ route, origin, destination }: WaterRouteDetailsProps) {
  const { setShowFerryGuide, recordTrip } = useRoute()

  const handleTakeRoute = () => {
    // Calculate savings
    const timeSaved = 60 // Simplified for MVP
    const moneySaved = 1700 // Simplified for MVP
    recordTrip("water", timeSaved, moneySaved)
  }

  return (
    <div className="space-y-6">
      {/* Map Preview */}
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-water-light to-muted relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="h-0.5 w-8 border-t-2 border-dashed border-muted-foreground/30" />
                <div className="w-10 h-10 rounded-full bg-water/20 flex items-center justify-center">
                  <Ship className="w-5 h-5 text-water" />
                </div>
                <div className="h-0.5 w-16 bg-water" />
                <div className="w-10 h-10 rounded-full bg-water/20 flex items-center justify-center">
                  <Ship className="w-5 h-5 text-water" />
                </div>
                <div className="h-0.5 w-8 border-t-2 border-dashed border-muted-foreground/30" />
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Water route map</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-water-light border-water/20">
          <CardContent className="p-4 text-center">
            <Clock className="w-5 h-5 text-water mx-auto mb-2" />
            <p className="text-lg font-bold text-water">
              {formatDuration(route.duration.min)} - {formatDuration(route.duration.max)}
            </p>
            <p className="text-xs text-water/80">Total travel time</p>
          </CardContent>
        </Card>
        <Card className="bg-success-light border-success/20">
          <CardContent className="p-4 text-center">
            <Ship className="w-5 h-5 text-success mx-auto mb-2" />
            <p className="text-lg font-bold text-success">{formatNaira(route.cost)}</p>
            <p className="text-xs text-success/80">Total cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Departures */}
      {route.nextDepartures.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Timer className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Next Ferry Departures</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {route.nextDepartures.map((time, i) => (
                <Badge key={i} variant={i === 0 ? "default" : "outline"} className="text-sm">
                  {time}
                  {i === 0 && <span className="ml-1 text-xs opacity-70">(Next)</span>}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Journey Breakdown */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Step-by-Step Journey</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {route.segments.map((segment, index) => {
                const Icon = getSegmentIcon(segment.type)
                const isFerry = segment.type === "ferry"

                return (
                  <div key={index} className={`p-4 ${isFerry ? "bg-water-light/50" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          isFerry ? "bg-water/20" : "bg-muted"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isFerry ? "text-water" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {getSegmentLabel(segment.type)} to {segment.to}
                            </p>
                            {segment.details && <p className="text-sm text-muted-foreground">{segment.details}</p>}
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">
                              {formatDuration(segment.duration.min)}
                              {segment.duration.min !== segment.duration.max &&
                                ` - ${formatDuration(segment.duration.max)}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {segment.cost > 0 ? formatNaira(segment.cost) : "Free"}
                            </p>
                          </div>
                        </div>

                        {/* Additional info for walk segments */}
                        {segment.type === "walk" && segment.distance && (
                          <p className="text-sm text-muted-foreground mt-1">{segment.distance}m walk</p>
                        )}

                        {/* Ferry schedule info */}
                        {isFerry && route.ferrySchedule && (
                          <div className="mt-2 p-2 bg-water/10 rounded-lg">
                            <p className="text-sm text-water">
                              Ferries every {route.ferrySchedule.interval} minutes,{" "}
                              {route.ferrySchedule.operatingHours.open} - {route.ferrySchedule.operatingHours.close}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Arrival */}
              <div className="p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Arrive at Destination</p>
                  <p className="text-sm text-muted-foreground">{destination.name}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jetty Information */}
      {route.nearestJettyFrom && (
        <div>
          <h3 className="font-semibold text-foreground mb-3">Jetty Information</h3>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Ship className="w-5 h-5 text-water" />
                  <div>
                    <p className="font-medium text-foreground">{route.nearestJettyFrom.name}</p>
                    <p className="text-sm text-muted-foreground">{route.nearestJettyFrom.location.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="font-medium text-foreground">{route.nearestJettyFrom.safetyRating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Operating Hours</p>
                  <p className="font-medium text-foreground">
                    {route.nearestJettyFrom.operatingHours.open} - {route.nearestJettyFrom.operatingHours.close}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Facilities</p>
                  <p className="font-medium text-foreground">
                    {route.nearestJettyFrom.facilities.slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-success">
                <Shield className="w-4 h-4" />
                <span>Safety verified</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* First Time Guide CTA */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">First time taking a ferry?</p>
              <p className="text-sm text-muted-foreground">Read our quick guide to feel confident</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowFerryGuide(true)}>
              <Info className="w-4 h-4 mr-1" />
              Read Guide
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Cost Breakdown</h3>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              {route.segments.map((segment, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {getSegmentLabel(segment.type)} to {segment.to}
                  </span>
                  <span className="font-medium text-foreground">
                    {segment.cost > 0 ? formatNaira(segment.cost) : "Free"}
                  </span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-2 flex items-center justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-foreground">{formatNaira(route.cost)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Button className="w-full h-12 text-base" onClick={handleTakeRoute}>
        I'll Take This Route
      </Button>
    </div>
  )
}
