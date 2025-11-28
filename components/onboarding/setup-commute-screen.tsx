"use client"

import { useState, useMemo } from "react"
import { useRoute } from "@/lib/route-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, MapPin, Navigation, Clock, Car, Ship, Train } from "lucide-react"
import type { Location } from "@/lib/types"

export function SetupCommuteScreen() {
  const { locations, setOnboardingStep, addSavedRoute, preferences, updatePreferences } = useRoute()

  const [origin, setOrigin] = useState<Location | null>(null)
  const [destination, setDestination] = useState<Location | null>(null)
  const [departureTime, setDepartureTime] = useState("07:30")
  const [daysPerWeek, setDaysPerWeek] = useState("5")

  const [originSearch, setOriginSearch] = useState("")
  const [destSearch, setDestSearch] = useState("")
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false)
  const [showDestSuggestions, setShowDestSuggestions] = useState(false)

  // Transport mode preferences
  const [preferRoad, setPreferRoad] = useState(true)
  const [preferWater, setPreferWater] = useState(true)
  const [preferTrain, setPreferTrain] = useState(true)

  const filteredOrigins = useMemo(() => {
    if (!originSearch) return locations
    return locations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(originSearch.toLowerCase()) ||
        loc.shortName?.toLowerCase().includes(originSearch.toLowerCase()),
    )
  }, [locations, originSearch])

  const filteredDestinations = useMemo(() => {
    if (!destSearch) return locations.filter((l) => l.id !== origin?.id)
    return locations.filter(
      (loc) =>
        loc.id !== origin?.id &&
        (loc.name.toLowerCase().includes(destSearch.toLowerCase()) ||
          loc.shortName?.toLowerCase().includes(destSearch.toLowerCase())),
    )
  }, [locations, destSearch, origin])

  const handleSelectOrigin = (loc: Location) => {
    setOrigin(loc)
    setOriginSearch(loc.shortName || loc.name)
    setShowOriginSuggestions(false)
  }

  const handleSelectDestination = (loc: Location) => {
    setDestination(loc)
    setDestSearch(loc.shortName || loc.name)
    setShowDestSuggestions(false)
  }

  const handleNext = () => {
    if (origin && destination) {
      addSavedRoute({
        origin,
        destination,
        departureTime,
        daysPerWeek: Number.parseInt(daysPerWeek),
      })
      // Save transport preferences
      updatePreferences({
        preferredModes: {
          road: preferRoad,
          water: preferWater,
          train: preferTrain,
        },
      })
      setOnboardingStep("notifications")
    }
  }

  const isValid = origin && destination && departureTime && (preferRoad || preferWater || preferTrain)

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={() => setOnboardingStep("welcome")} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">Go back</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Setup Your Commute</h1>
          <p className="text-sm text-muted-foreground">Tell us about your daily journey</p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex gap-2 mb-8">
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-muted" />
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        {/* Origin */}
        <div className="space-y-2">
          <Label htmlFor="origin" className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Where do you commute from?
          </Label>
          <div className="relative">
            <Input
              id="origin"
              placeholder="e.g., Victoria Island, Lekki, Ikeja"
              value={originSearch}
              onChange={(e) => {
                setOriginSearch(e.target.value)
                setShowOriginSuggestions(true)
                if (!e.target.value) setOrigin(null)
              }}
              onFocus={() => setShowOriginSuggestions(true)}
              className="h-12"
            />
            {showOriginSuggestions && filteredOrigins.length > 0 && (
              <Card className="absolute z-20 w-full mt-1 max-h-48 overflow-auto shadow-lg">
                <CardContent className="p-0">
                  {filteredOrigins.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectOrigin(loc)}
                      className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="font-medium">{loc.shortName || loc.name}</span>
                      {loc.shortName && <span className="text-sm text-muted-foreground">({loc.name})</span>}
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" />
            Where do you commute to?
          </Label>
          <div className="relative">
            <Input
              id="destination"
              placeholder="e.g., Marina, CMS, Yaba"
              value={destSearch}
              onChange={(e) => {
                setDestSearch(e.target.value)
                setShowDestSuggestions(true)
                if (!e.target.value) setDestination(null)
              }}
              onFocus={() => setShowDestSuggestions(true)}
              className="h-12"
            />
            {showDestSuggestions && filteredDestinations.length > 0 && (
              <Card className="absolute z-20 w-full mt-1 max-h-48 overflow-auto shadow-lg">
                <CardContent className="p-0">
                  {filteredDestinations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectDestination(loc)}
                      className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 transition-colors"
                    >
                      <Navigation className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="font-medium">{loc.shortName || loc.name}</span>
                      {loc.shortName && <span className="text-sm text-muted-foreground">({loc.name})</span>}
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Map Preview */}
        {origin && destination && (
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium mt-1">{origin.shortName || origin.name}</span>
                  </div>
                  <div className="w-24 h-0.5 bg-primary/30 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-xs font-medium mt-1">{destination.shortName || destination.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Time and Days */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Usual departure time
            </Label>
            <Input
              id="time"
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="days" className="text-sm font-medium">
              Days per week
            </Label>
            <Select value={daysPerWeek} onValueChange={setDaysPerWeek}>
              <SelectTrigger id="days" className="h-12">
                <SelectValue placeholder="Select days" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <SelectItem key={day} value={day.toString()}>
                    {day} {day === 1 ? "day" : "days"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Transport Mode Preferences */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Preferred transport modes</Label>
          <p className="text-xs text-muted-foreground">We'll prioritize these modes in your recommendations</p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <Checkbox
                id="road"
                checked={preferRoad}
                onCheckedChange={(checked) => setPreferRoad(checked as boolean)}
              />
              <div className="w-8 h-8 rounded-lg bg-road-light flex items-center justify-center">
                <Car className="w-4 h-4 text-road" />
              </div>
              <Label htmlFor="road" className="flex-1 cursor-pointer font-medium">
                Road
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <Checkbox
                id="water"
                checked={preferWater}
                onCheckedChange={(checked) => setPreferWater(checked as boolean)}
              />
              <div className="w-8 h-8 rounded-lg bg-water-light flex items-center justify-center">
                <Ship className="w-4 h-4 text-water" />
              </div>
              <Label htmlFor="water" className="flex-1 cursor-pointer font-medium">
                Water (Ferry)
              </Label>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <Checkbox
                id="train"
                checked={preferTrain}
                onCheckedChange={(checked) => setPreferTrain(checked as boolean)}
              />
              <div className="w-8 h-8 rounded-lg bg-[#0066CC]/10 flex items-center justify-center">
                <Train className="w-4 h-4 text-[#0066CC]" />
              </div>
              <Label htmlFor="train" className="flex-1 cursor-pointer font-medium">
                Train/Rail
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6">
        <Button size="lg" className="w-full h-14 text-lg font-semibold" disabled={!isValid} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}
// </CHANGE>
