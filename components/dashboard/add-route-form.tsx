"use client"

import { useState, useMemo } from "react"
import { useRoute } from "@/lib/route-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, Clock } from "lucide-react"
import type { Location } from "@/lib/types"

interface AddRouteFormProps {
  onComplete: () => void
}

export function AddRouteForm({ onComplete }: AddRouteFormProps) {
  const { locations, addSavedRoute } = useRoute()

  const [origin, setOrigin] = useState<Location | null>(null)
  const [destination, setDestination] = useState<Location | null>(null)
  const [departureTime, setDepartureTime] = useState("07:30")
  const [daysPerWeek, setDaysPerWeek] = useState("5")

  const [originSearch, setOriginSearch] = useState("")
  const [destSearch, setDestSearch] = useState("")
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false)
  const [showDestSuggestions, setShowDestSuggestions] = useState(false)

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

  const handleSubmit = () => {
    if (origin && destination) {
      addSavedRoute({
        origin,
        destination,
        departureTime,
        daysPerWeek: Number.parseInt(daysPerWeek),
      })
      onComplete()
    }
  }

  const isValid = origin && destination && departureTime

  return (
    <div className="space-y-4">
      {/* Origin */}
      <div className="space-y-2">
        <Label htmlFor="origin" className="text-sm font-medium flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          From
        </Label>
        <div className="relative">
          <Input
            id="origin"
            placeholder="e.g., Victoria Island, Lekki"
            value={originSearch}
            onChange={(e) => {
              setOriginSearch(e.target.value)
              setShowOriginSuggestions(true)
              if (!e.target.value) setOrigin(null)
            }}
            onFocus={() => setShowOriginSuggestions(true)}
            onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
          />
          {showOriginSuggestions && filteredOrigins.length > 0 && (
            <Card className="absolute z-20 w-full mt-1 max-h-40 overflow-auto shadow-lg">
              <CardContent className="p-0">
                {filteredOrigins.slice(0, 5).map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectOrigin(loc)}
                    className="w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-2 text-sm transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span>{loc.shortName || loc.name}</span>
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
          To
        </Label>
        <div className="relative">
          <Input
            id="destination"
            placeholder="e.g., Marina, CMS"
            value={destSearch}
            onChange={(e) => {
              setDestSearch(e.target.value)
              setShowDestSuggestions(true)
              if (!e.target.value) setDestination(null)
            }}
            onFocus={() => setShowDestSuggestions(true)}
            onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
          />
          {showDestSuggestions && filteredDestinations.length > 0 && (
            <Card className="absolute z-20 w-full mt-1 max-h-40 overflow-auto shadow-lg">
              <CardContent className="p-0">
                {filteredDestinations.slice(0, 5).map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectDestination(loc)}
                    className="w-full px-3 py-2 text-left hover:bg-muted flex items-center gap-2 text-sm transition-colors"
                  >
                    <Navigation className="w-3 h-3 text-muted-foreground shrink-0" />
                    <span>{loc.shortName || loc.name}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Time and Days */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Departure
          </Label>
          <Input id="time" type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="days" className="text-sm font-medium">
            Days/week
          </Label>
          <Select value={daysPerWeek} onValueChange={setDaysPerWeek}>
            <SelectTrigger id="days">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-2 pt-2">
        <Button variant="outline" className="flex-1 bg-transparent" onClick={onComplete}>
          Cancel
        </Button>
        <Button className="flex-1" disabled={!isValid} onClick={handleSubmit}>
          Add Route
        </Button>
      </div>
    </div>
  )
}
