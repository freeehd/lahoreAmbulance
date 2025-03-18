import Link from "next/link"
import { Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#fffcf2] py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold">Lahore Ambulance</h3>
            <p className="mt-4 text-gray-600">
              Providing emergency medical services with care and compassion across Pakistan.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-red-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-red-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-600 hover:text-red-600">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-red-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-600">Emergency: 1122</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">Hotline: 0336 911 1122</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-red-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-red-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} Lahore Ambulance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

