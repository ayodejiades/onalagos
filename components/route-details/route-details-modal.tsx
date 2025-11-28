"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Ship, Train } from "lucide-react"
import { RoadRouteDetails } from "./road-route-details"
import { WaterRouteDetails } from "./water-route-details"
import { TrainRouteDetails } from "./train-route-details"
import type { RouteComparison, RouteTab } from "@/lib/types"

interface RouteDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  comparison: RouteComparison | null
  defaultTab: RouteTab
}

export function RouteDetailsModal({ open, onOpenChange, comparison, defaultTab }: RouteDetailsModalProps) {
  if (!comparison) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl">
            {comparison.origin.shortName || comparison.origin.name} to{" "}
            {comparison.destination.shortName || comparison.destination.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="px-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="road" className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                <span className="hidden sm:inline">Road</span>
              </TabsTrigger>
              <TabsTrigger
                value="water"
                className="flex items-center gap-2"
                disabled={!comparison.waterRoute.available}
              >
                <Ship className="w-4 h-4" />
                <span className="hidden sm:inline">Water</span>
              </TabsTrigger>
              <TabsTrigger
                value="train"
                className="flex items-center gap-2"
                disabled={!comparison.trainRoute.available}
              >
                <Train className="w-4 h-4" />
                <span className="hidden sm:inline">Train</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="road" className="p-6 pt-4 mt-0">
            <RoadRouteDetails route={comparison.roadRoute} />
          </TabsContent>

          <TabsContent value="water" className="p-6 pt-4 mt-0">
            {comparison.waterRoute.available && (
              <WaterRouteDetails
                route={comparison.waterRoute}
                origin={comparison.origin}
                destination={comparison.destination}
              />
            )}
          </TabsContent>

          <TabsContent value="train" className="p-6 pt-4 mt-0">
            {comparison.trainRoute.available && (
              <TrainRouteDetails
                route={comparison.trainRoute}
                origin={comparison.origin}
                destination={comparison.destination}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
// </CHANGE>
