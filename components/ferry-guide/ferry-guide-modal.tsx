"use client"

import { useState } from "react"
import { useRoute } from "@/lib/route-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Ship,
  MapPin,
  Ticket,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Shield,
  Cloud,
  Luggage,
  CreditCard,
  HelpCircle,
} from "lucide-react"

const GUIDE_STEPS = [
  {
    id: 1,
    title: "Arriving at the Jetty",
    icon: MapPin,
    description: "Find your nearest jetty using the app. Look for the Lagos Ferry Services signage.",
    tips: [
      "Arrive at least 15 minutes before departure",
      "Most jetties have clear signage",
      "Security personnel can help direct you",
      "There are usually waiting areas with seats",
    ],
  },
  {
    id: 2,
    title: "Buying Your Ticket",
    icon: Ticket,
    description: "Purchase your ticket at the ticket booth before boarding.",
    tips: [
      "Cash is accepted at all jetties",
      "Some jetties accept mobile payments",
      "Keep your ticket safe until you disembark",
      "Fares are fixed - no bargaining needed",
    ],
  },
  {
    id: 3,
    title: "Boarding the Ferry",
    icon: Ship,
    description: "Wait for your ferry and follow the staff instructions to board safely.",
    tips: [
      "Wait for passengers to disembark first",
      "Follow crew instructions",
      "Life jackets are provided on board",
      "Seats are first-come, first-served",
    ],
  },
  {
    id: 4,
    title: "During the Journey",
    icon: Clock,
    description: "Enjoy a smooth ride across the Lagos Lagoon. Most trips take 20-45 minutes.",
    tips: [
      "Sit comfortably and enjoy the view",
      "Ferries are generally stable and safe",
      "Some ferries have fans/AC",
      "You can use your phone during the trip",
    ],
  },
  {
    id: 5,
    title: "Arriving & Disembarking",
    icon: CheckCircle2,
    description: "The crew will announce your arrival. Exit carefully and follow the signs.",
    tips: [
      "Wait for the ferry to dock completely",
      "Exit in an orderly manner",
      "Follow signs to the exit",
      "Transport options are usually available nearby",
    ],
  },
]

const FAQ_ITEMS = [
  {
    id: "safety",
    question: "Is it safe?",
    answer:
      "Yes! Lagos ferries are operated by licensed companies with trained crews. Life jackets are provided on all vessels, and regular safety checks are conducted. The Lagos State Waterways Authority (LASWA) regulates all ferry operations.",
    icon: Shield,
  },
  {
    id: "miss-ferry",
    question: "What if I miss the ferry?",
    answer:
      "Don't worry! Ferries run regularly throughout the day, typically every 30-45 minutes. Just wait for the next one. Check the schedule in the app for exact times.",
    icon: Clock,
  },
  {
    id: "luggage",
    question: "Can I bring luggage?",
    answer:
      "Yes, you can bring reasonable luggage like bags, backpacks, and small suitcases. Very large items may need special arrangements. There is usually space on the ferry for your belongings.",
    icon: Luggage,
  },
  {
    id: "weather",
    question: "What if the weather is bad?",
    answer:
      "Ferry services may be suspended during severe weather for safety reasons. The app will show real-time service status. Light rain doesn't usually affect services.",
    icon: Cloud,
  },
  {
    id: "payment",
    question: "How do I pay?",
    answer:
      "Cash is accepted at all jetties. Some locations also accept bank transfers or mobile payments. Prices are fixed and displayed at ticket booths.",
    icon: CreditCard,
  },
]

export function FerryGuideModal() {
  const { showFerryGuide, setShowFerryGuide } = useRoute()
  const [currentStep, setCurrentStep] = useState(0)
  const [view, setView] = useState<"steps" | "faq">("steps")

  const handleNext = () => {
    if (currentStep < GUIDE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setView("faq")
    }
  }

  const handlePrev = () => {
    if (view === "faq") {
      setView("steps")
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setShowFerryGuide(false)
    setCurrentStep(0)
    setView("steps")
  }

  const step = GUIDE_STEPS[currentStep]
  const StepIcon = step?.icon

  return (
    <Dialog open={showFerryGuide} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-primary" />
            First-Time Ferry Guide
          </DialogTitle>
        </DialogHeader>

        {view === "steps" ? (
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex gap-1">
              {GUIDE_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {StepIcon && <StepIcon className="w-8 h-8 text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                Step {step.id} of {GUIDE_STEPS.length}
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>

            {/* Illustration placeholder */}
            <Card className="overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-water-light to-muted flex items-center justify-center">
                <div className="text-center">
                  {StepIcon && <StepIcon className="w-12 h-12 text-water mx-auto mb-2" />}
                  <p className="text-sm text-muted-foreground">Visual guide</p>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <div>
              <p className="font-medium text-foreground mb-2">Tips:</p>
              <ul className="space-y-2">
                {step.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button className="flex-1" onClick={handleNext}>
                {currentStep === GUIDE_STEPS.length - 1 ? "FAQs" : "Next"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* FAQ Header */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Frequently Asked Questions</h3>
              <p className="text-muted-foreground">Everything you need to know</p>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary shrink-0" />
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={handlePrev}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Guide
              </Button>
              <Button className="flex-1" onClick={handleClose}>
                Got it, I'm ready!
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
