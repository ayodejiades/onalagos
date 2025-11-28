"use client"

import { useRoute } from "@/lib/route-context"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function HomePage() {
  const { preferences } = useRoute()

  if (!preferences.hasCompletedOnboarding) {
    return <OnboardingFlow />
  }

  return <Dashboard />
}
