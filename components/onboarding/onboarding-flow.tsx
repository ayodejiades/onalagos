"use client"

import { useRoute } from "@/lib/route-context"
import { WelcomeScreen } from "./welcome-screen"
import { SetupCommuteScreen } from "./setup-commute-screen"
import { NotificationPrefsScreen } from "./notification-prefs-screen"

export function OnboardingFlow() {
  const { onboardingStep } = useRoute()

  return (
    <main className="min-h-screen bg-background">
      {onboardingStep === "welcome" && <WelcomeScreen />}
      {onboardingStep === "setup" && <SetupCommuteScreen />}
      {onboardingStep === "notifications" && <NotificationPrefsScreen />}
    </main>
  )
}
