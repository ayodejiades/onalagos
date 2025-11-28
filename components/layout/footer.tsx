"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Waves,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Shield,
  Users,
} from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-[#1a1a2e] text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Get Lagos Commute Tips Weekly</h3>
              <p className="text-sm text-gray-400">Route hacks, traffic alerts, and Lagos mobility news</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 w-full md:w-64"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 shrink-0">
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Subscribed
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center md:text-left">No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Waves className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-white">Ọna</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Navigate Lagos Smarter. Your intelligent route planner for Lagos roads, waterways, and rail. Save time,
              save money, beat the traffic.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "How It Works", href: "#" },
                { label: "Route Planner", href: "#" },
                { label: "Ferry Guide", href: "#" },
                { label: "Train Guide", href: "#" },
                { label: "About Us", href: "#" },
                { label: "Blog", href: "#" },
                { label: "FAQs", href: "#" },
                { label: "Contact Us", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Getting Started Guide", href: "#" },
                { label: "Safety Tips", href: "#" },
                { label: "Lagos Transport Map", href: "#" },
                { label: "Ferry Schedules", href: "#" },
                { label: "Train Schedules", href: "#" },
                { label: "Community Forum", href: "#" },
                { label: "Partner With Us", href: "#" },
                { label: "Developers API", href: "#", badge: "Coming Soon" },
                { label: "Download App", href: "#", badge: "Coming Soon" },
              ].map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary rounded">{link.badge}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support & Legal</h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: "Help Center", href: "#" },
                { label: "Report an Issue", href: "#" },
                { label: "Feedback", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
                { label: "Accessibility Statement", href: "#" },
                { label: "Careers", href: "#", badge: "We're hiring!" },
              ].map((link) => (
                <li key={link.label} className="flex items-center gap-2">
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                  {link.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-success/20 text-success rounded">{link.badge}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-2 pt-4 border-t border-gray-700">
              <a
                href="mailto:hello@ona.ng"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@ona.ng
              </a>
              <a
                href="tel:+2348001234567"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +234 (0) 800 123 4567
              </a>
              <p className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 shrink-0" />
                Lagos, Nigeria
              </p>
              <p className="text-xs text-gray-500 mt-1">Support: Mon-Fri 8AM-6PM WAT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© 2025 Ọna. All rights reserved.</p>

            <p className="text-sm text-gray-500 flex items-center gap-1">
              Made with <span className="text-red-500">❤️</span> in Lagos
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Shield className="w-3.5 h-3.5 text-success" />
                Secure
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                Verified Routes
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Users className="w-3.5 h-3.5 text-success" />
                5000+ Users
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
