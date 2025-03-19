"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fffcf2]">
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900">
            Contact Us
          </h1>
          <p className="mt-3 md:mt-6 text-lg md:text-xl lg:text-2xl text-gray-700">
            We're here to help. Reach out to us with any questions or concerns.
          </p>

          <div className="mt-8 md:mt-12 grid gap-6 md:gap-8 md:grid-cols-2">
            <div className="space-y-6 md:space-y-8 rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6 shadow-lg">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Emergency Contact</h2>
                <div className="mt-3 md:mt-4 flex items-center gap-3">
                  <Phone className="h-6 w-6 md:h-8 md:w-8 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-lg md:text-xl font-bold text-red-600">1122</p>
                    <p className="text-base md:text-lg text-gray-700">For life-threatening emergencies</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Non-Emergency Contact</h2>
                <div className="mt-3 md:mt-4 space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-6 w-6 md:h-7 md:w-7 text-gray-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base md:text-lg font-medium text-gray-900">0336 911 1122</p>
                      <p className="text-sm md:text-base text-gray-600">Available 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-6 w-6 md:h-7 md:w-7 text-gray-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base md:text-lg font-medium text-gray-900 break-all">
                        info@lahoreambulance.com
                      </p>
                      <p className="text-sm md:text-base text-gray-600">For general inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 md:h-7 md:w-7 text-gray-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-base md:text-lg font-medium text-gray-900">Lahore, Pakistan</p>
                      <p className="text-sm md:text-base text-gray-600">Serving all areas of the city</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6 shadow-lg">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Send Us a Message</h2>
              <p className="mt-2 text-base md:text-lg text-gray-600">For non-emergency inquiries only</p>

              <form className="mt-4 md:mt-6 space-y-4 md:space-y-6">
                <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="name" className="text-base md:text-lg font-medium">
                    Your Name
                  </Label>
                  <Input id="name" className="h-10 md:h-12 text-base md:text-lg" placeholder="Full Name" />
                </div>

                <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="email" className="text-base md:text-lg font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-10 md:h-12 text-base md:text-lg"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="phone" className="text-base md:text-lg font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="h-10 md:h-12 text-base md:text-lg"
                    placeholder="03XX XXXXXXX"
                  />
                </div>

                <div className="space-y-1 md:space-y-2">
                  <Label htmlFor="message" className="text-base md:text-lg font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    className="min-h-[100px] md:min-h-[150px] text-base md:text-lg"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button className="h-10 md:h-12 w-full bg-red-600 text-base md:text-lg font-medium hover:bg-red-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-[#fffcf2] py-6 md:py-8 lg:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold">Lahore Ambulance</h3>
              <p className="mt-2 md:mt-4 text-sm md:text-base text-gray-600">
                Providing emergency medical services with care and compassion across Pakistan.
              </p>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold">Quick Links</h3>
              <ul className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                <li>
                  <Link href="/" className="text-sm md:text-base text-gray-600 hover:text-red-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm md:text-base text-gray-600 hover:text-red-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-sm md:text-base text-gray-600 hover:text-red-600">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm md:text-base text-gray-600 hover:text-red-600">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold">Contact</h3>
              <ul className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                  <span className="text-sm md:text-base text-gray-600">Emergency: 1122</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                  <span className="text-sm md:text-base text-gray-600">Hotline: 0336 911 1122</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold">Legal</h3>
              <ul className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm md:text-base text-gray-600 hover:text-red-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm md:text-base text-gray-600 hover:text-red-600">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 md:mt-8 border-t border-gray-200 pt-4 md:pt-8 text-center">
            <p className="text-sm md:text-base text-gray-600">
              © {new Date().getFullYear()} Lahore Ambulance. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

