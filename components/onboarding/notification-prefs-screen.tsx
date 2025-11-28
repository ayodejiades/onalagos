"use client"

import { useRoute } from "@/lib/route-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bell, BellRing, CheckCircle2, Sparkles } from "lucide-react"
import { useState } from "react"

export function NotificationPrefsScreen() {
  const { setOnboardingStep, preferences, updatePreferences } = useRoute()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleComplete = () => {
    setShowSuccess(true)
    setTimeout(() => {
      updatePreferences({ hasCompletedOnboarding: true })
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 bg-background">
        <div className="text-center max-w-md animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">You're all set!</h1>
          <p className="text-muted-foreground mb-6">
            We'll send your first route alert tomorrow morning. Get ready to beat the traffic!
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <Sparkles className="w-4 h-4" />
            <span>Loading your dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={() => setOnboardingStep("setup")} className="shrink-0">
          <ArrowLeft className="w-5 h-5" />
          <span className="sr-only">Go back</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notification Preferences</h1>
          <p className="text-sm text-muted-foreground">How should we alert you?</p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex gap-2 mb-8">
        <div className="h-1 flex-1 rounded-full bg-primary" />
        <div className="h-1 flex-1 rounded-full bg-primary" />
      </div>

      {/* Settings */}
      <div className="flex-1 space-y-4">
        {/* Daily alerts toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BellRing className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="alerts" className="text-base font-medium cursor-pointer">
                    Send me daily route alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">Get notified about the best route each day</p>
                </div>
              </div>
              <Switch
                id="alerts"
                checked={preferences.alertsEnabled}
                onCheckedChange={(checked) => updatePreferences({ alertsEnabled: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Alert timing */}
        <Card className={!preferences.alertsEnabled ? "opacity-50" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <Label htmlFor="timing" className="text-base font-medium">
                    Alert me before I leave
                  </Label>
                  <p className="text-sm text-muted-foreground">How much advance notice do you need?</p>
                </div>
              </div>
              <Select
                value={preferences.alertMinutesBefore.toString()}
                onValueChange={(val) => updatePreferences({ alertMinutesBefore: Number.parseInt(val) })}
                disabled={!preferences.alertsEnabled}
              >
                <SelectTrigger id="timing" className="w-28">
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
          </CardContent>
        </Card>

        {/* Only alert when better */}
        <Card className={!preferences.alertsEnabled ? "opacity-50" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-success" />
                </div>
                <div>
                  <Label htmlFor="better-only" className="text-base font-medium cursor-pointer">
                    Only alert when there's a better route
                  </Label>
                  <p className="text-sm text-muted-foreground">Skip alerts when road is your best option</p>
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

        {/* Preview notification */}
        <div className="pt-4">
          <p className="text-sm text-muted-foreground mb-3">Preview notification:</p>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  <BellRing className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Lagos Route Optimizer</p>
                  <p className="text-sm text-muted-foreground">
                    Water route to Marina saves 1hr today! Ferry leaves in {preferences.alertMinutesBefore} min.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6">
        <Button size="lg" className="w-full h-14 text-lg font-semibold" onClick={handleComplete}>
          Start Saving Time
        </Button>
      </div>
    </div>
  )
}
