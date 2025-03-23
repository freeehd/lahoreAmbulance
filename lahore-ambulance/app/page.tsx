"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Phone } from 'lucide-react'
import { useLocationService } from "@/components/location-service"
import {
  ServiceCard,
  FeatureCard,
  InitialBookingForm,
  BookingTypeForm,
  LocationForm,
  CompletionForm,
} from "@/components/ui-components"

export default function Home() {
  const [language, setLanguage] = useState("ur") // "en" for English, "ur" for Urdu
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [bookingStep, setBookingStep] = useState("initial") // initial, booking-type, location, complete
  const [bookingType, setBookingType] = useState("") // "self" or "other"

  const heroRef = useRef(null)

  // Get location service
  const {
    userLocation,
    locationStatus,
    cityName,
    isProcessingLocation,
    debugInfo,
    handleLocationRequest,
    sendWhatsAppMessage,
  } = useLocationService()

  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Listen for language change events from navbar
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail.language)
    }

    window.addEventListener("languageChange", handleLanguageChange)
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [])

  // Add a backup mechanism to ensure the message is sent if both location and city are available
  useEffect(() => {
    // Only proceed if we have a pending message and we're booking for self
    if (bookingType !== "self" || bookingStep !== "location") {
      return
    }

    // Check if we have both location and city name
    if (userLocation && cityName && locationStatus === "success") {
      console.log("Location and city name available in useEffect, sending message...")
      console.log("Location data:", userLocation)
      console.log("City name:", cityName)
      console.log("Booking type:", bookingType)

      // Send the message
      const success = sendWhatsAppMessage(userLocation, cityName, bookingType, language)
      if (success) {
        setBookingStep("complete")
      }
    }
  }, [userLocation, cityName, locationStatus, bookingType, language, sendWhatsAppMessage])

  // Handle the initial emergency request button click
  const handleEmergencyRequest = () => {
    console.log("Emergency request initiated")
    // Move to the booking type selection step
    setBookingStep("booking-type")
  }

  // Handle booking type selection
  const handleBookingTypeSelection = (type) => {
    console.log("Booking type selected:", type)
    setBookingType(type)

    if (type === "self") {
      // For self booking, proceed with location request
      setBookingStep("location")
      handleLocationRequest(language)
    } else {
      // For booking for someone else, skip location and send message directly
      console.log("Booking for someone else, skipping location request")
      // We need to pass dummy location data for the function to work
      // but it won't be used in the message
      const success = sendWhatsAppMessage({ latitude: 0, longitude: 0 }, "", type, language)
      if (success) {
        setBookingStep("complete")
      }
    }
  }

  // Translations
  const translations = {
    title: {
      en: "Lahore Ambulance at Your Service",
      ur: "لاہور ایمبولینس آپ کی خدمت میں",
    },
    subtitle: {
      en: "Fast, reliable ambulance service when you need it most",
      ur: "تیز، قابل اعتماد ایمبولینس سروس جب آپ کو اس کی سب سے زیادہ ضرورت ہو",
    },
    shareLocation: {
      en: "Share my location",
      ur: "میرا مقام شیئر کریں",
    },
    locationHelp: {
      en: "We need your location to send emergency services to you",
      ur: "ہمیں آپ کو ہنگامی خدمات بھیجنے کے لیے آپ کے مقام کی ضرورت ہے",
    },
    gettingLocation: {
      en: "Getting your location...",
      ur: "آپ کا مقام حاصل کر رہے ہیں...",
    },
    locationSuccess: {
      en: "Location acquired successfully",
      ur: "مقام کامیابی سے حاصل کر لیا گیا",
    },
    locationError: {
      en: "Could not access your location. Please ensure location permissions are enabled.",
      ur: "آپ کے مقام تک رسائی حاصل نہیں کر سکا۔ براہ کرم یقینی بنائیں کہ مقام کی اجازتیں فعال ہیں۔",
    },
    detectedLocation: {
      en: "Detected location",
      ur: "پتہ چلا مقام",
    },
    requestAmbulance: {
      en: "REQUEST AMBULANCE NOW",
      ur: "ابھی ایمبولینس کی درخواست کریں",
    },
    emergencyCall: {
      en: "For life-threatening emergencies, call 1122 directly",
      ur: "زندگی کو خطرہ لاحق ہونے والی ہنگامی صورتحال کے لیے، براہ راست 1122 پر کال کریں",
    },
    bookingTypeQuestion: {
      en: "Who needs the ambulance?",
      ur: "ایمبولینس کس کو درکار ہے؟",
    },
    forSelf: {
      en: "For myself",
      ur: "میرے لیے",
    },
    forOther: {
      en: "For someone else",
      ur: "کسی اور کے لیے",
    },
    bookingTypeDescription: {
      en: "This helps us determine if we need your location",
      ur: "یہ ہمیں یہ طے کرنے میں مدد کرتا ہے کہ آیا ہمیں آپ کے مقام کی ضرورت ہے",
    },
    services: {
      en: "Our Services",
      ur: "ہماری خدمات",
    },
    whyChooseUs: {
      en: "Why Choose Us",
      ur: "ہمیں کیوں منتخب کریں",
    },
    safetyPriority: {
      en: "We prioritize your safety with rapid response times and professional care",
      ur: "ہم تیز ردعمل کے اوقات اور پیشہ ورانہ دیکھ بھال کے ساتھ آپ کی حفاظت کو ترجیح دیتے ہیں",
    },
    acrossPakistan: {
      en: "Ambulance Services Across Pakistan",
      ur: "پاکستان بھر میں ایمبولینس خدمات",
    },
    acrossPakistanDesc: {
      en: "While we are based in Lahore, our services extend to major cities across Pakistan. We provide reliable emergency medical transportation with professional care and modern equipment.",
      ur: "اگرچہ ہمارا بنیادی مقام لاہور ہے، ہماری خدمات پاکستان کے بڑے شہروں تک پھیلی ہوئی ہیں۔ ہم پیشہ ورانہ دیکھ بھال اور جدید آلات کے ساتھ قابل اعتماد ہنگامی طبی نقل و حمل فراہم کرتے ہیں۔",
    },
    contactUs: {
      en: "Contact Us",
      ur: "ہم سے رابطہ کریں",
    },
    available: {
      en: "Available 24/7 for emergencies",
      ur: "ہنگامی صورتحال کے لیے 24/7 دستیاب",
    },
    requestSent: {
      en: "Request sent successfully!",
      ur: "درخواست کامیابی سے بھیج دی گئی!",
    },
    requestSentDesc: {
      en: "Our team will contact you shortly. For immediate assistance, please call us directly.",
      ur: "ہماری ٹیم جلد ہی آپ سے رابطہ کرے گی۔ فوری مدد کے لیے، براہ کرم ہمیں براہ راست کال کریں۔",
    },
    tryAgain: {
      en: "Try Again",
      ur: "دوبارہ کوشش کریں",
    },
  }

  // Service cards data with translations
  const services = [
    {
      title: { en: "Emergency Response", ur: "ہنگامی ردعمل" },
      description: {
        en: "24/7 rapid response to medical emergencies with fully equipped ambulances across Lahore.",
        ur: "لاہور بھر میں مکمل طور پر لیس ایمبولینسوں کے ساتھ طبی ہنگامی صورتحال کے لیے 24/7 تیز ردعمل۔",
      },
    },
    {
      title: { en: "Medical Transport", ur: "طبی نقل و حمل" },
      description: {
        en: "Safe, comfortable transportation for non-emergency medical appointments throughout Pakistan.",
        ur: "پاکستان بھر میں غیر ہنگامی طبی اپائنٹمنٹس کے لیے محفوظ، آرام دہ نقل و حمل۔",
      },
    },
    {
      title: { en: "Critical Care", ur: "نازک دیکھ بھال" },
      description: {
        en: "Specialized care for critical patients with advanced life support equipment.",
        ur: "جدید لائف سپورٹ آلات کے ساتھ نازک مریضوں کے لیے خصوصی دیکھ بھال۔",
      },
    },
  ]

  // Feature cards data with translations
  const features = [
    {
      title: { en: "Fast Response", ur: "تیز ردعمل" },
      description: {
        en: "Average response time under 8 minutes in urban areas of Lahore.",
        ur: "لاہور کے شہری علاقوں میں اوسط ردعمل کا وقت 8 منٹ سے کم ہے۔",
      },
    },
    {
      title: { en: "Certified EMTs", ur: "سرٹیفائیڈ ای ایم ٹیز" },
      description: {
        en: "All our staff are certified and regularly trained.",
        ur: "ہمارے تمام عملے کو سرٹیفائیڈ کیا گیا ہے اور باقاعدگی سے تربیت دی جاتی ہے۔",
      },
    },
    {
      title: { en: "Modern Equipment", ur: "جدید آلات" },
      description: {
        en: "State-of-the-art medical equipment in all vehicles.",
        ur: "تمام گاڑیوں میں جدید ترین طبی آلات۔",
      },
    },
    {
      title: { en: "24/7 Availability", ur: "24/7 دستیابی" },
      description: {
        en: "Round-the-clock service, 365 days a year.",
        ur: "سال کے 365 دن، چوبیس گھنٹے سروس۔",
      },
    },
    {
      title: { en: "GPS Tracking", ur: "جی پی ایس ٹریکنگ" },
      description: {
        en: "Real-time ambulance tracking for peace of mind.",
        ur: "ذہنی سکون کے لیے ریئل ٹائم ایمبولینس ٹریکنگ۔",
      },
    },
    {
      title: { en: "Compassionate Care", ur: "ہمدردانہ دیکھ بھال" },
      description: {
        en: "Patient-centered approach with empathy and respect.",
        ur: "ہمدردی اور احترام کے ساتھ مریض پر مرکوز نقطہ نظر۔",
      },
    },
  ]

  // Calculate parallax effect based on mouse position
  const calculateParallaxValue = (strength = 0.02) => {
    if (!heroRef.current) return { x: 0, y: 0 }

    const rect = heroRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const offsetX = (mousePosition.x - centerX) * strength
    const offsetY = (mousePosition.y - centerY) * strength

    return { x: offsetX, y: offsetY }
  }

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  // Render the appropriate form based on the booking step
  const renderBookingForm = () => {
    switch (bookingStep) {
      case "initial":
        return (
          <InitialBookingForm
            onEmergencyRequest={handleEmergencyRequest}
            translations={translations}
            language={language}
          />
        )
      case "booking-type":
        return (
          <BookingTypeForm
            onBookingTypeSelection={handleBookingTypeSelection}
            translations={translations}
            language={language}
          />
        )
      case "location":
        return (
          <LocationForm
            locationStatus={locationStatus}
            cityName={cityName}
            onRetry={() => handleLocationRequest(language)}
            isProcessingLocation={isProcessingLocation}
            debugInfo={debugInfo}
            translations={translations}
            language={language}
          />
        )
      case "complete":
        return <CompletionForm translations={translations} language={language} />
      default:
        return null
    }
  }

  // Add a directionality class to the main container based on language
  return (
    <div 
      className={`min-h-screen bg-[#fffcf2] ${language === "ur" ? "text-right" : ""}`}
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <main>
        <section ref={heroRef} className="relative bg-[#fffcf2] py-8 md:py-16 lg:py-20 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-red-100 opacity-20 blur-3xl"
              animate={{
                x: calculateParallaxValue(0.05).x,
                y: calculateParallaxValue(0.05).y,
              }}
            />
            <motion.div
              className="absolute bottom-20 right-[15%] w-80 h-80 rounded-full bg-red-200 opacity-20 blur-3xl"
              animate={{
                x: calculateParallaxValue(-0.03).x,
                y: calculateParallaxValue(-0.03).y,
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-yellow-100 opacity-20 blur-3xl"
              animate={{
                x: calculateParallaxValue(0.02).x,
                y: calculateParallaxValue(0.02).y,
              }}
            />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Hero content with animations */}
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h1
                className={`text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl ${language === "ur" ? "font-urdu leading-[1.6]" : ""}`}
                variants={itemVariants}
              >
                {translations.title[language]}
              </motion.h1>
              <motion.p 
                className={`mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl text-gray-700 ${language === "ur" ? "font-urdu leading-[1.8] tracking-wide" : ""}`} 
                variants={itemVariants}
              >
                {translations.subtitle[language]}
              </motion.p>
            </motion.div>

            {/* Emergency request form with animations */}
            <motion.div
              className="mx-auto mt-8 md:mt-12 max-w-lg rounded-xl border-2 border-gray-200 bg-white p-4 md:p-6 lg:p-8 shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="space-y-4 md:space-y-6">{renderBookingForm()}</div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Update the services section heading */}
            <h2
              className={`text-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 ${language === "ur" ? "font-urdu leading-[1.8]" : ""}`}
            >
              {translations.services[language]}
            </h2>
            <div className="mt-6 md:mt-8 lg:mt-10 grid gap-4 md:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  title={service.title[language]} 
                  description={service.description[language]} 
                  language={language}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-[#fffcf2] py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Update the "Why Choose Us" section */}
            <div className="mx-auto max-w-3xl text-center">
              <h2 
                className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 ${language === "ur" ? "font-urdu leading-[1.8]" : ""}`}
              >
                {translations.whyChooseUs[language]}
              </h2>
              <p 
                className={`mt-2 md:mt-4 text-base md:text-lg lg:text-xl text-gray-700 ${language === "ur" ? "font-urdu leading-[1.8] tracking-wide" : ""}`}
              >
                {translations.safetyPriority[language]}
              </p>
            </div>
            <div className="mt-6 md:mt-8 lg:mt-10 grid gap-4 md:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index} 
                  title={feature.title[language]} 
                  description={feature.description[language]} 
                  language={language}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              {/* Update the "Across Pakistan" section */}
              <div className="mx-auto max-w-3xl">
                <div>
                  <h2 
                    className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 ${language === "ur" ? "font-urdu leading-[1.8]" : ""}`}
                  >
                    {translations.acrossPakistan[language]}
                  </h2>
                  <p 
                    className={`mt-2 md:mt-4 text-base md:text-lg text-gray-700 ${language === "ur" ? "font-urdu leading-[1.8] tracking-wide" : ""}`}
                  >
                    {translations.acrossPakistanDesc[language]}
                  </p>
                  <div className="mt-4 md:mt-8">
                    <h3 
                      className={`text-lg md:text-xl font-bold text-gray-900 ${language === "ur" ? "font-urdu leading-[1.8]" : ""}`}
                    >
                      {translations.contactUs[language]}
                    </h3>
                    <motion.div
                      className={`mt-2 md:mt-4 flex items-center gap-2 md:gap-3 ${language === "ur" ? "flex-row-reverse" : ""}`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Phone className="h-6 w-6 md:h-8 md:w:8 text-red-600" />
                      <div>
                        <a
                          href="tel:+923369111122"
                          className="text-lg md:text-xl font-bold text-red-600 hover:underline flex items-center gap-1"
                          dir="ltr" // Keep phone number in LTR direction
                        >
                          0336 911 1122
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </a>
                        <p 
                          className={`text-base md:text-lg text-gray-700 ${language === "ur" ? "font-urdu leading-[1.8]" : ""}`}
                        >
                          {translations.available[language]}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
