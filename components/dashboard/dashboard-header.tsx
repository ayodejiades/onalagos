"use client"

import { Button } from "@/components/ui/button"
import { Settings, BarChart3, Ship, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardHeaderProps {
  onOpenSettings: () => void
  onOpenWeeklySummary: () => void
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning!"
  if (hour < 18) return "Good afternoon!"
  return "Good evening!"
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

export function DashboardHeader({ onOpenSettings, onOpenWeeklySummary }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-primary/5 via-background to-secondary/5 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="px-4 py-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25">
                <Ship className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {getGreeting()}
              </h1>
              <p className="text-sm text-muted-foreground">{formatDate()}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenWeeklySummary}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="sr-only">View weekly summary</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenSettings}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="sr-only">Open settings</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
