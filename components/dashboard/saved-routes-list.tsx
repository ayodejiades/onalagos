"use client"

import { useState } from "react"
import { useRoute } from "@/lib/route-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Clock, Plus, MoreVertical, Pencil, Trash2, Route } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddRouteForm } from "./add-route-form"

interface SavedRoutesListProps {
  onSelectRoute: (originId: string, destinationId: string) => void
}

export function SavedRoutesList({ onSelectRoute }: SavedRoutesListProps) {
  const { savedRoutes, removeSavedRoute, currentComparison } = useRoute()
  const [showAddRoute, setShowAddRoute] = useState(false)

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const displayHours = hours % 12 || 12
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  if (savedRoutes.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-4">Saved Routes</h2>
        <Card className="bg-muted/50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Route className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium mb-2">No routes saved yet</p>
            <p className="text-sm text-muted-foreground mb-4">Add your regular commute routes to get smart alerts</p>
            <Button onClick={() => setShowAddRoute(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Route
            </Button>
          </CardContent>
        </Card>

        <Dialog open={showAddRoute} onOpenChange={setShowAddRoute}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Route</DialogTitle>
            </DialogHeader>
            <AddRouteForm onComplete={() => setShowAddRoute(false)} />
          </DialogContent>
        </Dialog>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Saved Routes</h2>
        {savedRoutes.length < 3 && (
          <Button variant="outline" size="sm" onClick={() => setShowAddRoute(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Add Route
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {savedRoutes.map((route) => {
          const isActive =
            currentComparison?.origin.id === route.origin.id &&
            currentComparison?.destination.id === route.destination.id

          return (
            <Card
              key={route.id}
              className={`transition-all cursor-pointer hover:shadow-md ${isActive ? "ring-2 ring-primary" : ""}`}
              onClick={() => onSelectRoute(route.origin.id, route.destination.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Route Icons */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div className="w-0.5 h-4 bg-border" />
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Navigation className="w-4 h-4 text-secondary" />
                      </div>
                    </div>

                    {/* Route Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate">
                          {route.origin.shortName || route.origin.name}
                        </span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium text-foreground truncate">
                          {route.destination.shortName || route.destination.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(route.departureTime)}
                        </span>
                        <span>{route.daysPerWeek} days/week</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectRoute(route.origin.id, route.destination.id)
                      }}
                    >
                      {isActive ? "Active" : "Check Now"}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                          <span className="sr-only">Route options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit route
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeSavedRoute(route.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete route
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={showAddRoute} onOpenChange={setShowAddRoute}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Route</DialogTitle>
          </DialogHeader>
          <AddRouteForm onComplete={() => setShowAddRoute(false)} />
        </DialogContent>
      </Dialog>
    </section>
  )
}
