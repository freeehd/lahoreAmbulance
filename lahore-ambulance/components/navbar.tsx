"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState("en") // "en" for English, "ur" for Urdu
  const pathname = usePathname()

  // Only show language toggle on home page
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      // Calculate scroll progress for smoother transitions (0 to 1)
      const progress = Math.min(offset / 100, 1)
      setScrollProgress(progress)

      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Toggle language function
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ur" : "en"
    setLanguage(newLanguage)
    // Dispatch a custom event so other components can react to language change
    window.dispatchEvent(new CustomEvent("languageChange", { detail: { language: newLanguage } }))
  }

  // Calculate a more balanced max-width for the pill state
  // Start with container width and reduce by a percentage based on scroll
  const maxWidthPercentage = 100 - scrollProgress * 30 // Reduces from 100% to 70%

  // Dynamic styles based on scroll progress
  const containerStyles = {
    maxWidth: scrolled ? `${maxWidthPercentage}%` : "100%",
    borderRadius: `${scrollProgress * 9999}px`,
    transform: `translateY(${scrollProgress * -4}px) scale(${1 - scrollProgress * 0.02})`,
    boxShadow: scrolled ? `0 ${4 + scrollProgress * 6}px ${10 + scrollProgress * 10}px rgba(0, 0, 0, 0.05)` : "none",
    // Add a minimum width to prevent the pill from becoming too narrow on mobile
    minWidth: scrolled ? "min(85%, 300px)" : "100%",
  }

  const logoContainerWidth = scrolled ? "2px" : "50px"
  const logoScale = 1 + scrollProgress * 0.5
  const logoTranslate = scrollProgress * -6

  // Navigation items with translations
  const navItems = [
    { en: "Home", ur: "ہوم", href: "/" },
    { en: "Contact", ur: "رابطہ", href: "/contact" },
    { en: "Testimonials", ur: "تعریفیں", href: "/testimonials" },
    { en: "Blog", ur: "بلاگ", href: "/blog" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex justify-center ${
          scrolled ? "py-2" : "bg-[#fffcf2] border-b border-gray-200 py-2.5"
        }`}
      >
        <div
          className={`container mx-auto px-4 md:px-6 transition-all duration-500 ease-out ${
            scrolled ? "border border-gray-100 bg-white/95 max-w-full sm:max-w-[85%]" : ""
          }`}
          style={containerStyles}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div
                className="transition-all duration-500 ease-out overflow-hidden"
                style={{
                  width: logoContainerWidth,
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4ge0bMFjtfd0Gn0CbUgPUUOMipuGQN.png"
                  alt="Lahore Ambulance Logo"
                  width={50}
                  height={48}
                  className="transition-all duration-500 ease-out"
                  style={{
                    transform: `scale(${logoScale}) translateX(${logoTranslate}px)`,
                    opacity: scrolled ? 0 : 1,
                  }}
                  priority
                />
              </div>
              <span
                className="text-base font-bold text-red-600 md:text-lg transition-all duration-500 ease-out"
                style={{
                  opacity: scrollProgress,
                  transform: `translateX(${(1 - scrollProgress) * -20}px)`,
                }}
              >
                {language === "en" ? "Lahore Ambulance" : "لاہور ایمبولینس"}
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex md:gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.en}
                    href={item.href}
                    className={`text-base font-medium transition-all duration-300 ease-out ${
                      scrolled ? "text-gray-900 hover:text-red-600" : "text-gray-900 hover:text-red-600"
                    }`}
                    style={{
                      transform: `translateY(${scrollProgress * -2}px)`,
                    }}
                  >
                    {item.en}
                  </Link>
                ))}
              </nav>

              {isHomePage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="hidden md:flex items-center gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === "en" ? "اردو" : "English"}</span>
                </Button>
              )}

              <div className="md:hidden flex items-center gap-2">
                {isHomePage && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleLanguage}
                    className="h-8 w-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  className="transition-all duration-300"
                  style={{
                    transform: `scale(${1 - scrollProgress * 0.1})`,
                  }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isOpen && (
        <div className="fixed z-50 md:hidden flex justify-center w-full" style={{ top: scrolled ? "60px" : "64px" }}>
          <div
            className={`${scrolled ? "rounded-b-xl border-x border-b border-gray-100 bg-white/95 shadow-lg" : "bg-[#fffcf2]"} p-4 w-full`}
            style={{
              maxWidth: scrolled ? `${maxWidthPercentage}%` : "100%",
              minWidth: scrolled ? "min(85%, 300px)" : "100%",
            }}
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.en}
                  href={item.href}
                  className="text-xl font-medium text-gray-900 hover:text-red-600 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.en}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      <div className={`h-14 md:h-16 ${isOpen ? "mb-40" : ""}`}></div> {/* Spacer to account for fixed header */}
    </>
  )
}

