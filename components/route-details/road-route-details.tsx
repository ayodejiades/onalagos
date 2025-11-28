"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Clock, MapPin, Navigation, ExternalLink, Ruler, AlertCircle } from "lucide-react"
import { formatDuration, formatNaira } from "@/lib/mock-data"
import type { RoadRoute } from "@/lib/types"

interface RoadRouteDetailsProps {
  route: RoadRoute
}

function getTrafficBadgeStyles(status: "light" | "moderate" | "heavy") {
  switch (status) {
    case "heavy":
      return "bg-danger-light text-danger border-danger/20"
    case "moderate":
      return "bg-warning-light text-warning border-warning/20"
    case "light":
      return "bg-success-light text-success border-success/20"
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

export function RoadRouteDetails({ route }: RoadRouteDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Map Preview */}
      <Card className="overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-road-light to-muted relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-16 bg-road/30" />
                  <Car className="w-6 h-6 text-road" />
                  <div className="h-0.5 w-16 bg-road/30" />
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Interactive map</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-lg font-bold text-foreground">
              {formatDuration(route.duration.min)} - {formatDuration(route.duration.max)}
            </p>
            <p className="text-xs text-muted-foreground">Travel time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Ruler className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-lg font-bold text-foreground">{route.distance} km</p>
            <p className="text-xs text-muted-foreground">Distance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Car className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-lg font-bold text-foreground">{formatNaira(route.cost)}</p>
            <p className="text-xs text-muted-foreground">Est. cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Current Traffic</p>
                <p className="text-sm text-muted-foreground">Based on real-time conditions</p>
              </div>
            </div>
            <Badge variant="outline" className={getTrafficBadgeStyles(route.trafficStatus)}>
              {getTrafficLabel(route.trafficStatus)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Step by Step */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Route Overview</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {/* Start Point */}
              <div className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Start</p>
                  <p className="text-sm text-muted-foreground">Your location</p>
                </div>
              </div>

              {/* Major Roads */}
              {route.majorRoads.map((road, index) => (
                <div key={index} className="p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-road-light flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-road">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{road}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          route.trafficStatus === "heavy"
                            ? "bg-danger-light text-danger border-danger/20"
                            : route.trafficStatus === "moderate"
                              ? "bg-warning-light text-warning border-warning/20"
                              : "bg-success-light text-success border-success/20"
                        }`}
                      >
                        {route.trafficStatus === "heavy"
                          ? "Slow"
                          : route.trafficStatus === "moderate"
                            ? "Moving"
                            : "Clear"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}

              {/* End Point */}
              <div className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Navigation className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Destination</p>
                  <p className="text-sm text-muted-foreground">Your destination</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 bg-transparent">
          <ExternalLink className="w-4 h-4 mr-2" />
          Open in Google Maps
        </Button>
        <Button className="flex-1">I'll Take This Route</Button>
      </div>
    </div>
  )
}
