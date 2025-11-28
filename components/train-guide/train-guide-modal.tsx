"use client"

import { useRoute } from "@/lib/route-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Train, MapPin, CreditCard, Shield, Users, Accessibility, CheckCircle2, Lightbulb } from "lucide-react"

export function TrainGuideModal() {
  const { showTrainGuide, setShowTrainGuide } = useRoute()

  return (
    <Dialog open={showTrainGuide} onOpenChange={setShowTrainGuide}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Train className="w-5 h-5 text-[#0066CC]" />
            Taking the Train in Lagos
          </DialogTitle>
          <p className="text-sm text-muted-foreground">Your complete guide to Lagos rail transport</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Before You Go Section */}
          <section className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Badge variant="outline" className="bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC]/30">
                1
              </Badge>
              Before You Go
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">What to bring:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-success" /> Cowry Card or cash for tickets
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-success" /> Comfortable shoes for walking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-success" /> Light bag or backpack
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Best times to travel:</p>
                <p className="text-sm text-muted-foreground">
                  Off-peak hours (10 AM - 4 PM) for a more comfortable journey with available seats.
                </p>
              </div>
            </div>
          </section>

          {/* At the Station Section */}
          <section className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Badge variant="outline" className="bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC]/30">
                2
              </Badge>
              At the Station
            </h3>

            <div className="space-y-4">
              {/* Finding Platform */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#0066CC]" />
                  <p className="font-medium text-sm">Finding Your Platform</p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                  <li>• Look for digital departure boards</li>
                  <li>• Follow signs for your train line (Blue/Red)</li>
                  <li>• Station staff can help if you're unsure</li>
                </ul>
              </div>

              {/* Buying Tickets */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4 text-[#0066CC]" />
                  <p className="font-medium text-sm">Buying Tickets</p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                  <li>
                    • <strong>Cowry Card:</strong> Tap to pay at gates (fastest)
                  </li>
                  <li>
                    • <strong>Ticket Booth:</strong> Pay cash, state your destination
                  </li>
                  <li>
                    • <strong>Fare:</strong> ₦200 base + ₦50 per zone
                  </li>
                </ul>
              </div>

              {/* Security */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-[#0066CC]" />
                  <p className="font-medium text-sm">Security Checks</p>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Brief bag screening at entry. No sharp objects or large items allowed.
                </p>
              </div>
            </div>
          </section>

          {/* Boarding & Riding Section */}
          <section className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Badge variant="outline" className="bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC]/30">
                3
              </Badge>
              Boarding & Riding
            </h3>

            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0066CC]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#0066CC]">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Wait for passengers to exit first</p>
                  <p className="text-xs text-muted-foreground">Stand to the side of doors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0066CC]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#0066CC]">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Mind the gap when boarding</p>
                  <p className="text-xs text-muted-foreground">Watch the space between platform and train</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0066CC]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#0066CC]">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Find a seat or hold the rails</p>
                  <p className="text-xs text-muted-foreground">
                    Priority seats for elderly, pregnant, and disabled passengers
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0066CC]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#0066CC]">4</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Listen for announcements</p>
                  <p className="text-xs text-muted-foreground">Stations are announced before arrival</p>
                </div>
              </div>
            </div>
          </section>

          {/* Train Features */}
          <section className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Badge variant="outline" className="bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC]/30">
                4
              </Badge>
              Train Features
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Air-conditioned
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                <Accessibility className="w-4 h-4 text-[#0066CC]" />
                Wheelchair access
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                <Users className="w-4 h-4 text-[#0066CC]" />
                Priority seating
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                <Shield className="w-4 h-4 text-success" />
                Security onboard
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Badge variant="outline" className="bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC]/30">
                5
              </Badge>
              Frequently Asked Questions
            </h3>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="safe">
                <AccordionTrigger className="text-sm">Is it safe?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Yes! Lagos trains have security personnel on every train and at all stations. CCTV cameras monitor all
                  areas, and emergency call points are available throughout.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="lost">
                <AccordionTrigger className="text-sm">What if I get lost?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Station staff are available at information desks and on platforms. Help points with intercoms are also
                  located throughout stations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="luggage">
                <AccordionTrigger className="text-sm">Can I bring luggage?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Small to medium bags are allowed. Large suitcases and bulky items may not be permitted during peak
                  hours. Check with station staff if unsure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="full">
                <AccordionTrigger className="text-sm">What if the train is full?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Wait for the next train - they run every 15-20 minutes. Try traveling during off-peak hours (10 AM - 4
                  PM) for a more comfortable journey.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="miss">
                <AccordionTrigger className="text-sm">What if I miss my stop?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Simply exit at the next station and take a train going in the opposite direction. Your ticket remains
                  valid for the return journey.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="disability">
                <AccordionTrigger className="text-sm">Accessibility services?</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  All stations have elevators, ramps, and tactile paving. Staff are trained to assist passengers with
                  disabilities. Wheelchair spaces are available on all trains.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Pro Tips */}
          <section className="bg-[#0066CC]/5 rounded-lg p-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#0066CC]" />
              Pro Tips
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-success mt-1 shrink-0" />
                Board the first or last carriage for quicker exits at major stations
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-success mt-1 shrink-0" />
                Get a Cowry Card for faster entry and potential discounts
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-success mt-1 shrink-0" />
                Arrive 5-10 minutes before your intended departure
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-success mt-1 shrink-0" />
                Use Park & Ride at Oshodi, Yaba, and Ikeja stations
              </li>
            </ul>
          </section>

          {/* CTA Button */}
          <Button className="w-full h-12" onClick={() => setShowTrainGuide(false)}>
            <Train className="w-4 h-4 mr-2" />
            Got it, I'm ready to ride!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
