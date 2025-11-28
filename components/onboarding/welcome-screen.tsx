"use client"

import { useRoute } from "@/lib/route-context"
import { Button } from "@/components/ui/button"
import { Ship, Car, Train, Clock, Wallet, Waves, MapPin, Sparkles, ArrowRight } from "lucide-react"

export function WelcomeScreen() {
  const { setOnboardingStep } = useRoute()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-primary/10 via-background to-secondary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-40 right-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Hero Illustration */}
      <div className="relative w-full max-w-md mb-8 z-10">
        <div className="relative flex items-center justify-center">
          {/* Water Background */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cyan-500/20 via-blue-500/10 to-transparent rounded-b-3xl" />

          {/* Lagos Skyline Silhouette - More colorful */}
          <div className="relative z-10 flex items-end justify-center gap-2 h-52">
            {/* Buildings with gradient colors */}
            <div className="w-8 h-20 bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-t-sm shadow-lg" />
            <div className="w-6 h-28 bg-gradient-to-t from-cyan-400/50 to-cyan-300/50 dark:from-cyan-700 dark:to-cyan-800 rounded-t-sm shadow-lg" />
            <div className="w-10 h-36 bg-gradient-to-t from-slate-500 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-t-sm shadow-lg" />
            <div className="w-8 h-24 bg-gradient-to-t from-violet-400/50 to-violet-300/50 dark:from-violet-700 dark:to-violet-800 rounded-t-sm shadow-lg" />
            <div className="w-12 h-44 bg-gradient-to-t from-primary to-primary/70 rounded-t-sm shadow-xl shadow-primary/30" />
            <div className="w-8 h-32 bg-gradient-to-t from-emerald-400/50 to-emerald-300/50 dark:from-emerald-700 dark:to-emerald-800 rounded-t-sm shadow-lg" />
            <div className="w-6 h-22 bg-gradient-to-t from-slate-400 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-t-sm shadow-lg" />
            <div className="w-10 h-28 bg-gradient-to-t from-amber-400/50 to-amber-300/50 dark:from-amber-700 dark:to-amber-800 rounded-t-sm shadow-lg" />
          </div>

          {/* Transport Icons - More vibrant */}
          <div className="absolute bottom-6 left-1/4 animate-float">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white p-3 rounded-full shadow-xl shadow-cyan-500/40">
              <Ship className="w-6 h-6" />
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-train">
            <div className="bg-gradient-to-br from-violet-400 to-purple-500 text-white p-3 rounded-full shadow-xl shadow-violet-500/40">
              <Train className="w-6 h-6" />
            </div>
          </div>

          <div className="absolute bottom-6 right-1/4">
            <div className="bg-gradient-to-br from-slate-400 to-slate-500 text-white p-3 rounded-full shadow-xl shadow-slate-500/40">
              <Car className="w-6 h-6" />
            </div>
          </div>

          {/* Wave Animation */}
          <div className="absolute bottom-0 inset-x-0 flex justify-center gap-1">
            <Waves className="w-8 h-8 text-cyan-400/60 animate-wave" />
            <Waves className="w-8 h-8 text-blue-400/50 animate-wave" style={{ animationDelay: "0.5s" }} />
            <Waves className="w-8 h-8 text-cyan-400/60 animate-wave" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-center max-w-md z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
            Smart Commute
          </span>
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
          <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Beat Lagos Traffic with
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-cyan-500 to-violet-500 bg-clip-text text-transparent">
            Smart Route Alerts
          </span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-pretty">
          Get daily notifications when water or train routes save you time and money. Make smarter commute decisions.
        </p>
      </div>

      {/* Benefits - More colorful */}
      <div className="grid grid-cols-3 gap-4 max-w-md w-full mb-10 z-10">
        <div className="flex flex-col items-center text-center p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/30">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Save Time</span>
        </div>
        <div className="flex flex-col items-center text-center p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-2 shadow-lg shadow-amber-500/30">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Save Money</span>
        </div>
        <div className="flex flex-col items-center text-center p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-2 shadow-lg shadow-cyan-500/30">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">Skip Traffic</span>
        </div>
      </div>

      {/* CTA - Enhanced button */}
      <Button
        size="lg"
        className="w-full max-w-md h-14 text-lg font-semibold bg-gradient-to-r from-primary via-cyan-500 to-primary bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500 shadow-xl shadow-primary/30 z-10"
        onClick={() => setOnboardingStep("setup")}
      >
        Set Up My Commute
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>

      {/* Footer */}
      <p className="text-xs text-muted-foreground mt-6 z-10">Free forever. No account required.</p>
    </div>
  )
}
