import Link from "next/link"
import Image from "next/image"
import { Star, Phone } from "lucide-react"

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#fffcf2]">
      <header className="border-b border-gray-200 bg-[#fffcf2]">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4ge0bMFjtfd0Gn0CbUgPUUOMipuGQN.png"
              alt="Lahore Ambulance Logo"
              width={180}
              height={80}
              priority
            />
          </Link>
        
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Patient Testimonials
          </h1>
          <p className="mt-6 text-xl text-gray-700 md:text-2xl">
            Read what our patients have to say about their experiences with our ambulance service.
          </p>

          <div className="mt-12 space-y-10">
            <TestimonialCard
              name="Ahmed Khan"
              location="Gulberg, Lahore"
              quote="When my father had a heart attack, Lahore Ambulance arrived within minutes. The EMTs were professional and compassionate. They stabilized him quickly and got him to the hospital in time. I'm forever grateful for their quick response."
              rating={5}
              image="/placeholder.svg?height=100&width=100"
            />

            <TestimonialCard
              name="Fatima Ali"
              location="DHA, Lahore"
              quote="I needed emergency transport after a severe allergic reaction. The response time was incredible, and the medical team knew exactly what to do. They monitored me closely during transport and communicated clearly with the hospital staff."
              rating={5}
              image="/placeholder.svg?height=100&width=100"
            />

            <TestimonialCard
              name="Zainab Malik"
              location="Johar Town, Lahore"
              quote="As someone with chronic health issues, I've unfortunately needed ambulance services multiple times. Lahore Ambulance has consistently provided exceptional care. The EMTs remember me and always make me feel safe during a scary time."
              rating={5}
              image="/placeholder.svg?height=100&width=100"
            />

            <TestimonialCard
              name="Usman Butt"
              location="Model Town, Lahore"
              quote="When my elderly mother fell at home, the Lahore Ambulance team arrived quickly and treated her with such dignity and respect. They were patient, gentle, and thoroughly professional. They even followed up with a call the next day."
              rating={4}
              image="/placeholder.svg?height=100&width=100"
            />

            <TestimonialCard
              name="Ayesha Imran"
              location="Cantt, Lahore"
              quote="I was in a car accident and needed immediate medical attention. The Lahore Ambulance team arrived promptly, stabilized me at the scene, and transported me safely to the hospital. Their calm demeanor helped reduce my anxiety."
              rating={5}
              image="/placeholder.svg?height=100&width=100"
            />
          </div>
        </div>
      </main>
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
    </div>
  )
}

function TestimonialCard({ name, location, quote, rating, image }) {
  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-gray-600">{location}</p>
          <div className="mt-1 flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
      <blockquote className="mt-4 border-l-4 border-red-600 pl-4 text-lg text-gray-700">"{quote}"</blockquote>
    </div>
  )
}

