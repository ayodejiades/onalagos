"use client"

import { useRoute } from "@/lib/route-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  BellRing,
  Route,
  Sparkles,
  Info,
  Shield,
  FileText,
  HelpCircle,
  Trash2,
  Download,
  ChevronRight,
  Ship,
  Train,
  Car,
} from "lucide-react"

interface SettingsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const { preferences, updatePreferences, savedRoutes, removeSavedRoute, setShowFerryGuide, setShowTrainGuide } =
    useRoute()

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all your data? This cannot be undone.")) {
      savedRoutes.forEach((route) => removeSavedRoute(route.id))
      updatePreferences({ hasCompletedOnboarding: false })
      onOpenChange(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">Settings</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* My Commute Section */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">My Commute</h3>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Route className="w-5 h-5 text-muted-foreground" />
                      <div className="text-left">
                        <p className="font-medium text-foreground">Saved Routes</p>
                        <p className="text-sm text-muted-foreground">{savedRoutes.length} routes saved</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Transport Preferences */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Transport Preferences
            </h3>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-road" />
                    <Label htmlFor="pref-road" className="font-medium cursor-pointer">
                      Road routes
                    </Label>
                  </div>
                  <Switch
                    id="pref-road"
                    checked={preferences.preferredModes.road}
                    onCheckedChange={(checked) =>
                      updatePreferences({
                        preferredModes: { ...preferences.preferredModes, road: checked },
                      })
                    }
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Ship className="w-5 h-5 text-water" />
                    <Label htmlFor="pref-water" className="font-medium cursor-pointer">
                      Water routes (Ferry)
                    </Label>
                  </div>
                  <Switch
                    id="pref-water"
                    checked={preferences.preferredModes.water}
                    onCheckedChange={(checked) =>
                      updatePreferences({
                        preferredModes: { ...preferences.preferredModes, water: checked },
                      })
                    }
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Train className="w-5 h-5 text-[#0066CC]" />
                    <Label htmlFor="pref-train" className="font-medium cursor-pointer">
                      Train routes
                    </Label>
                  </div>
                  <Switch
                    id="pref-train"
                    checked={preferences.preferredModes.train}
                    onCheckedChange={(checked) =>
                      updatePreferences({
                        preferredModes: { ...preferences.preferredModes, train: checked },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Notification Settings */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Notifications</h3>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                {/* Daily alerts toggle */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BellRing className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="alerts" className="font-medium cursor-pointer">
                        Daily route alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">Get notified about the best route</p>
                    </div>
                  </div>
                  <Switch
                    id="alerts"
                    checked={preferences.alertsEnabled}
                    onCheckedChange={(checked) => updatePreferences({ alertsEnabled: checked })}
                  />
                </div>

                {/* Alert timing */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="timing" className="font-medium">
                        Alert before departure
                      </Label>
                    </div>
                  </div>
                  <Select
                    value={preferences.alertMinutesBefore.toString()}
                    onValueChange={(val) => updatePreferences({ alertMinutesBefore: Number.parseInt(val) })}
                    disabled={!preferences.alertsEnabled}
                  >
                    <SelectTrigger id="timing" className="w-24">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Only alert when better */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <Label htmlFor="better-only" className="font-medium cursor-pointer">
                        Only when there's a better route
                      </Label>
                    </div>
                  </div>
                  <Switch
                    id="better-only"
                    checked={preferences.onlyAlertWhenBetter}
                    onCheckedChange={(checked) => updatePreferences({ onlyAlertWhenBetter: checked })}
                    disabled={!preferences.alertsEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* About Section */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Guides & Help</h3>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                <button
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    setShowFerryGuide(true)
                    onOpenChange(false)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Ship className="w-5 h-5 text-water" />
                    <span className="font-medium text-foreground">First-Time Ferry Guide</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>

                <button
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    setShowTrainGuide(true)
                    onOpenChange(false)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Train className="w-5 h-5 text-[#0066CC]" />
                    <span className="font-medium text-foreground">First-Time Train Guide</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>

                <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">How it works</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>

                <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Contact Support</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </section>

          {/* Legal Section */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Legal</h3>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>

                <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Terms of Service</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>
          </section>

          {/* Data & Privacy */}
          <section>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Data & Privacy</h3>
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">Export my data</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>

                <button
                  className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-destructive"
                  onClick={handleClearData}
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="font-medium">Clear all my data</span>
                </button>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* App Version */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Ọna - Lagos Route Optimizer</p>
            <p>Version 1.1.0 (Train Update)</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
// </CHANGE>
