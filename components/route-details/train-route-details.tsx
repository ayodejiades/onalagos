"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Train,
  MapPin,
  Clock,
  Wallet,
  Navigation,
  Star,
  ParkingCircle,
  Accessibility,
  CreditCard,
  Timer,
  Users,
} from "lucide-react"
import { formatDuration, formatNaira } from "@/lib/mock-data"
import type { TrainRoute, Location } from "@/lib/types"

interface TrainRouteDetailsProps {
  route: TrainRoute
  origin: Location
  destination: Location
}

export function TrainRouteDetails({ route, origin, destination }: TrainRouteDetailsProps) {
  if (!route.available || !route.line || !route.fromStation || !route.toStation) {
    return <p className="text-muted-foreground">Train route details not available.</p>
  }

  return (
    <div className="space-y-6">
      {/* Map Preview */}
      <div
        className="h-48 rounded-lg relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${route.line.color}15 0%, ${route.line.color}05 100%)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            {/* Origin */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{origin.shortName || origin.name}</span>
            </div>

            {/* Train Line */}
            <div className="flex items-center gap-2">
              <div className="h-16 w-1 rounded-full" style={{ backgroundColor: route.line.color }} />
              <div className="flex flex-col items-center gap-1">
                {[...Array(Math.min(route.stopsCount, 6))].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: route.line.color }} />
                ))}
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: `${route.line.color}20` }}
              >
                <Train className="w-4 h-4" style={{ color: route.line.color }} />
                <span className="text-sm font-medium" style={{ color: route.line.color }}>
                  {route.line.name}
                </span>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                <Navigation className="w-4 h-4 text-secondary" />
              </div>
              <span className="text-sm font-medium">{destination.shortName || destination.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-3 text-center">
            <Clock className="w-5 h-5 mx-auto mb-1" style={{ color: route.line.color }} />
            <p className="text-lg font-bold text-foreground">
              {formatDuration(route.duration.min)}-{formatDuration(route.duration.max)}
            </p>
            <p className="text-xs text-muted-foreground">Total time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Wallet className="w-5 h-5 mx-auto mb-1" style={{ color: route.line.color }} />
            <p className="text-lg font-bold text-foreground">{formatNaira(route.cost)}</p>
            <p className="text-xs text-muted-foreground">Total cost</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Train className="w-5 h-5 mx-auto mb-1" style={{ color: route.line.color }} />
            <p className="text-lg font-bold text-foreground">{route.stopsCount}</p>
            <p className="text-xs text-muted-foreground">Stops</p>
          </CardContent>
        </Card>
      </div>

      {/* Step by Step */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Step-by-Step Journey</h3>

        {route.segments.map((segment, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: segment.type === "train" ? `${route.line.color}20` : "var(--muted)",
                  }}
                >
                  {segment.type === "walk" && <MapPin className="w-5 h-5 text-muted-foreground" />}
                  {segment.type === "train" && <Train className="w-5 h-5" style={{ color: route.line.color }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-foreground">
                      {segment.type === "walk" ? "Walk" : "Board Train"} to {segment.to}
                    </p>
                    {segment.cost > 0 && (
                      <Badge variant="outline" className="shrink-0">
                        {formatNaira(segment.cost)}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(segment.duration.min)}-{formatDuration(segment.duration.max)}
                    </span>
                    {segment.distance && <span>{segment.distance}m</span>}
                  </div>
                  {segment.details && <p className="text-sm text-muted-foreground mt-1">{segment.details}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Departures */}
      {route.nextDepartures.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Timer className="w-4 h-4" style={{ color: route.line.color }} />
              Next Departures
            </h4>
            <div className="flex flex-wrap gap-2">
              {route.nextDepartures.map((time, i) => (
                <Badge key={i} variant={i === 0 ? "default" : "outline"} className={i === 0 ? "" : "bg-transparent"}>
                  {time}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Trains every {route.line.peakInterval} min (peak) / {route.line.offPeakInterval} min (off-peak)
            </p>
          </CardContent>
        </Card>
      )}

      {/* Station Information */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: route.line.color }} />
            {route.fromStation.name}
          </h4>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Operating hours:</span>
              <span className="font-medium">
                {route.fromStation.operatingHours.open} - {route.fromStation.operatingHours.close}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-muted-foreground">Safety rating:</span>
              <span className="font-medium">{route.fromStation.safetyRating}/5</span>
            </div>

            {route.fromStation.parking?.available && (
              <div className="flex items-center gap-2 text-sm">
                <ParkingCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Park & Ride:</span>
                <span className="font-medium">{formatNaira(route.fromStation.parking.costPerDay)}/day</span>
              </div>
            )}

            <Separator />

            <div>
              <p className="text-sm font-medium text-foreground mb-2">Facilities:</p>
              <div className="flex flex-wrap gap-2">
                {route.fromStation.facilities.map((facility, i) => (
                  <Badge key={i} variant="outline" className="bg-muted/50 text-xs">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>

            {route.fromStation.accessibility && (
              <div className="flex items-center gap-2 text-sm text-success">
                <Accessibility className="w-4 h-4" />
                Fully wheelchair accessible
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-warning" />
              <span className="text-muted-foreground">Peak times:</span>
              <span className="font-medium">{route.fromStation.peakTimes.join(", ")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" style={{ color: route.line.color }} />
            Payment & Ticketing
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: route.line.color }} />
              <strong className="text-foreground">Cowry Card:</strong> Tap to pay (fastest entry)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: route.line.color }} />
              <strong className="text-foreground">Cash:</strong> Pay at ticket booth
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: route.line.color }} />
              <strong className="text-foreground">Fare structure:</strong> ₦200 base + ₦50 per zone
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Line Information */}
      <Card style={{ borderColor: `${route.line.color}30` }}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${route.line.color}20` }}
            >
              <Train className="w-5 h-5" style={{ color: route.line.color }} />
            </div>
            <div>
              <p className="font-medium text-foreground">{route.line.name}</p>
              <p className="text-sm text-muted-foreground">
                {route.line.totalDistance} km • {route.line.stations.length} stations
              </p>
            </div>
            <Badge
              className="ml-auto"
              style={{
                backgroundColor: route.line.status === "operational" ? "var(--success-light)" : "var(--warning-light)",
                color: route.line.status === "operational" ? "var(--success)" : "var(--warning)",
              }}
            >
              {route.line.status === "operational" ? "Operational" : "Limited Service"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Modern air-conditioned trains • Average speed: 40-50 km/h</p>
        </CardContent>
      </Card>

      {/* CTA Button */}
      <Button className="w-full h-12" style={{ backgroundColor: route.line.color }}>
        <Train className="w-4 h-4 mr-2" />
        I'll Take This Route
      </Button>
    </div>
  )
}
