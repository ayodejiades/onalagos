"use client"

import { useState } from "react"
import { useRoute } from "@/lib/route-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, X, ChevronRight } from "lucide-react"

export function AlertBanner() {
  const { currentComparison, preferences } = useRoute()
  const [dismissed, setDismissed] = useState(false)

  // Only show if water route is recommended and alerts are enabled
  if (dismissed || !preferences.alertsEnabled || !currentComparison?.waterRoute.available) {
    return null
  }

  if (currentComparison.recommendation !== "water") {
    return null
  }

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground">Route Alert for Tomorrow</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Water route to {currentComparison.destination.shortName || currentComparison.destination.name} could save
              you {Math.round(currentComparison.roadRoute.duration.min - currentComparison.waterRoute.duration.min)}{" "}
              minutes!
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={() => setDismissed(true)}
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
