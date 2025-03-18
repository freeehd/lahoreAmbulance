import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
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
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">Medical Blog</h1>
          <p className="mt-6 text-xl text-gray-700 md:text-2xl">
            Stay informed with the latest medical news, emergency response tips, and health advice.
          </p>

          <div className="mt-12 space-y-12">
            <BlogPost
              title="What to Do in a Medical Emergency Before Help Arrives"
              excerpt="The first few minutes of a medical emergency are critical. Learn the essential steps to take while waiting for an ambulance to arrive in Lahore."
              date="March 15, 2025"
              author="Dr. Asad Khan"
              category="Emergency Response"
              image="/placeholder.svg?height=300&width=600"
              slug="what-to-do-in-medical-emergency"
            />

            <BlogPost
              title="Understanding the Different Types of Ambulance Services in Pakistan"
              excerpt="Not all ambulance services are the same. Learn about BLS, ALS, critical care transport, and when each type is appropriate for your needs."
              date="March 10, 2025"
              author="Fatima Ahmed, EMT"
              category="Medical Services"
              image="/placeholder.svg?height=300&width=600"
              slug="types-of-ambulance-services"
            />

            <BlogPost
              title="CPR Basics Everyone Should Know"
              excerpt="CPR can double or triple the chances of survival after cardiac arrest. Learn the updated guidelines and techniques that could save a life."
              date="March 5, 2025"
              author="Dr. Imran Malik, Paramedic"
              category="First Aid"
              image="/placeholder.svg?height=300&width=600"
              slug="cpr-basics"
            />

            <BlogPost
              title="Recognizing the Signs of Stroke: BE FAST"
              excerpt="Time is brain when it comes to stroke. Learn the expanded BE FAST method to quickly identify stroke symptoms and get help immediately."
              date="February 28, 2025"
              author="Dr. Saima Rashid"
              category="Medical Education"
              image="/placeholder.svg?height=300&width=600"
              slug="recognizing-stroke-signs"
            />

            <BlogPost
              title="How to Create an Emergency Medical Information Card"
              excerpt="Having your medical information readily available can be life-saving. Learn how to create a comprehensive emergency medical card."
              date="February 20, 2025"
              author="Zainab Khan, Healthcare Advocate"
              category="Preparedness"
              image="/placeholder.svg?height=300&width=600"
              slug="emergency-medical-card"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-600"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                  </svg>
                  <span className="text-gray-600">Emergency: 1122</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                  </svg>
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

function BlogPost({ title, excerpt, date, author, category, image, slug }) {
  return (
    <article className="grid gap-6 md:grid-cols-2">
      <Link href={`/blog/${slug}`} className="overflow-hidden rounded-xl border-2 border-gray-200">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={300}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </Link>
      <div className="flex flex-col justify-center">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">{category}</span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          <Link href={`/blog/${slug}`} className="hover:text-red-600">
            {title}
          </Link>
        </h2>
        <p className="mt-2 text-lg text-gray-600">{excerpt}</p>
        <p className="mt-4 text-gray-500">By {author}</p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-flex items-center font-medium text-red-600 hover:text-red-800"
        >
          Read More
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
            className="ml-1 h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

