"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Phone, Ambulance, Heart, Clock, Shield, Star } from "lucide-react"
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
      ur: "تیز رفتار، قابل اعتماد ایمبولینس سروس جب آپ کو سب سے زیادہ ضرورت ہو",
    },
    shareLocation: {
      en: "Share my location",
      ur: "میرا مقام شیئر کریں",
    },
    locationHelp: {
      en: "We need your location to send emergency services to you",
      ur: "ہمیں آپ کو ہنگامی خدمات بھیجنے کے لیے آپ کا مقام درکار ہے",
    },
    gettingLocation: {
      en: "Getting your location...",
      ur: "آپ کا مقام دریافت کیا جا رہا ہے...",
    },
    locationSuccess: {
      en: "Location acquired successfully",
      ur: "مقام کامیابی سے دریافت ہو گیا",
    },
    locationError: {
      en: "Could not access your location. Please ensure location permissions are enabled.",
      ur: "آپ کے مقام تک رسائی نہیں ہو سکی۔ براہ کرم یقینی بنائیں کہ مقام کی اجازتیں فعال ہیں۔",
    },
    detectedLocation: {
      en: "Detected location",
      ur: "دریافت شدہ مقام",
    },
    requestAmbulance: {
      en: "REQUEST AMBULANCE NOW",
      ur: "ابھی ایمبولینس کی درخواست کریں",
    },
    emergencyCall: {
      en: "For life-threatening emergencies, call 1122 directly",
      ur: "زندگی کو خطرے والے ہنگامی حالات کے لیے، براہ راست 1122 پر کال کریں",
    },
    bookingTypeQuestion: {
      en: "Who needs the ambulance?",
      ur: "ایمبولینس کس کے لیے درکار ہے؟",
    },
    forSelf: {
      en: "For myself",
      ur: "اپنے لیے",
    },
    forOther: {
      en: "For someone else",
      ur: "کسی اور کے لیے",
    },
    bookingTypeDescription: {
      en: "This helps us determine if we need your location",
      ur: "یہ ہمیں یہ طے کرنے میں مدد دیتا ہے کہ کیا ہمیں آپ کے مقام کی ضرورت ہے",
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
      ur: "ہم تیز رفتار ردعمل اور پیشہ ورانہ دیکھ بھال کے ساتھ آپ کی حفاظت کو ترجیح دیتے ہیں",
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
      ur: "ہنگامی حالات کے لیے 24/7 دستیاب",
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
    heroStats: {
      response: {
        en: "Average Response Time",
        ur: "اوسط ردعمل کا وقت",
        value: "8 min",
      },
      ambulances: {
        en: "Ambulances",
        ur: "ایمبولینسز",
        value: "50+",
      },
      served: {
        en: "Patients Served",
        ur: "مریضوں کی خدمت",
        value: "10,000+",
      },
    },
  }

  // Service cards data with translations
  const services = [
    {
      title: { en: "Emergency Response", ur: "ہنگامی ردعمل" },
      description: {
        en: "24/7 rapid response to medical emergencies with fully equipped ambulances across Lahore.",
        ur: "لاہور بھر میں مکمل طور پر لیس ایمبولینسوں کے ساتھ طبی ہنگامی حالات کے لیے 24/7 تیز رفتار ردعمل۔",
      },
    },
    {
      title: { en: "Medical Transport", ur: "طبی نقل و حمل" },
      description: {
        en: "Safe, comfortable transportation for non-emergency medical appointments throughout Pakistan.",
        ur: "پاکستان بھر میں غیر ہنگامی طبی اپائنٹمنٹس کے لیے محفوظ اور آرام دہ نقل و حمل۔",
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
      title: { en: "Fast Response", ur: "تیز رفتار ردعمل" },
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
      className={`min-h-screen bg-gradient-to-b from-red-50 to-white ${language === "ur" ? "text-right" : ""}`}
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <main>
        <section ref={heroRef} className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-red-100 opacity-30 blur-3xl"
              animate={{
                x: calculateParallaxValue(0.05).x,
                y: calculateParallaxValue(0.05).y,
              }}
            />
            <motion.div
              className="absolute bottom-20 right-[15%] w-80 h-80 rounded-full bg-red-200 opacity-30 blur-3xl"
              animate={{
                x: calculateParallaxValue(-0.03).x,
                y: calculateParallaxValue(-0.03).y,
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-yellow-100 opacity-30 blur-3xl"
              animate={{
                x: calculateParallaxValue(0.02).x,
                y: calculateParallaxValue(0.02).y,
              }}
            />

            {/* Ambulance icons floating in the background */}
            <motion.div
              className="absolute top-[15%] right-[20%] text-red-400 opacity-20"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 6,
                ease: "easeInOut",
              }}
            >
              <Ambulance size={80} />
            </motion.div>

            <motion.div
              className="absolute bottom-[25%] left-[15%] text-red-400 opacity-20"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 7,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <Ambulance size={60} />
            </motion.div>

            <motion.div
              className="absolute top-[40%] right-[10%] text-red-300 opacity-15 hidden md:block"
              animate={{
                y: [0, 10, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 8,
                ease: "easeInOut",
                delay: 3,
              }}
            >
              <Ambulance size={50} />
            </motion.div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Hero content with animations */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <motion.div
                  className={`text-center md:text-left ${language === "ur" ? "md:text-right" : ""}`}
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div
                    className="inline-block mb-4 p-2 bg-red-100 text-red-600 rounded-full"
                    variants={itemVariants}
                  >
                    <Ambulance size={32} className="animate-pulse" />
                  </motion.div>

                  <motion.h1
                    className={`text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
                    variants={itemVariants}
                  >
                    {translations.title[language]}
                  </motion.h1>

                  <motion.p
                    className={`mt-4 md:mt-6 text-lg md:text-xl text-gray-700 ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
                    variants={itemVariants}
                  >
                    {translations.subtitle[language]}
                  </motion.p>

                  {/* Stats section - hide on small screens */}
                  <motion.div className="mt-8 hidden md:grid grid-cols-3 gap-4" variants={itemVariants}>
                    <div className="text-center">
                      <div className="flex justify-center">
                        <Clock className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="mt-2 text-2xl font-bold text-gray-900">{translations.heroStats.response.value}</p>
                      <p className={`text-sm text-gray-600 ${language === "ur" ? "font-urdu" : ""}`}>
                        {translations.heroStats.response[language]}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex justify-center">
                        <Ambulance className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="mt-2 text-2xl font-bold text-gray-900">{translations.heroStats.ambulances.value}</p>
                      <p className={`text-sm text-gray-600 ${language === "ur" ? "font-urdu" : ""}`}>
                        {translations.heroStats.ambulances[language]}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="flex justify-center">
                        <Heart className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="mt-2 text-2xl font-bold text-gray-900">{translations.heroStats.served.value}</p>
                      <p className={`text-sm text-gray-600 ${language === "ur" ? "font-urdu" : ""}`}>
                        {translations.heroStats.served[language]}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <div className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
                {/* Emergency request form with animations */}
                <motion.div
                  className="mx-auto max-w-lg rounded-xl border-2 border-red-100 bg-white p-4 md:p-6 lg:p-8 shadow-lg"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
                  whileHover={{
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="space-y-4 md:space-y-6">{renderBookingForm()}</div>
                </motion.div>
              </div>
            </div>

            {/* Mobile stats section - only show on small screens */}
            <motion.div
              className="mt-8 grid grid-cols-3 gap-2 md:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center bg-white rounded-lg p-2 shadow-sm">
                <div className="flex justify-center">
                  <Clock className="h-5 w-5 text-red-500" />
                </div>
                <p className="mt-1 text-xl font-bold text-gray-900">{translations.heroStats.response.value}</p>
                <p className={`text-xs text-gray-600 ${language === "ur" ? "font-urdu" : ""}`}>
                  {translations.heroStats.response[language]}
                </p>
              </div>

              <div className="text-center bg-white rounded-lg p-2 shadow-sm">
                <div className="flex justify-center">
                  <Ambulance className="h-5 w-5 text-red-500" />
                </div>
                <p className="mt-1 text-xl font-bold text-gray-900">{translations.heroStats.ambulances.value}</p>
                <p className={`text-xs text-gray-600 ${language === "ur" ? "font-urdu" : ""}`}>
                  {translations.heroStats.ambulances[language]}
                </p>
              </div>

              <div className="text-center bg-white rounded-lg p-2 shadow-sm">
                <div className="flex justify-center">
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <p className="mt-1 text-xl font-bold text-gray-900">{translations.heroStats.served.value}</p>
                <p className={`text-xs text-gray-600 ${language === "ur" ? "font-urdu" : ""}`}>
                  {translations.heroStats.served[language]}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            {/* Update the services section heading */}
            <div className="flex flex-col items-center justify-center gap-2 mb-6 md:mb-8">
              <Shield className="h-7 w-7 md:h-8 md:w-8 text-red-500" />
              <h2
                className={`text-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
              >
                {translations.services[language]}
              </h2>
            </div>
            <div className="mt-4 md:mt-8 lg:mt-10 grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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

        <section className="border-t border-gray-200 bg-red-50 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            {/* Update the "Why Choose Us" section */}
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex flex-col items-center justify-center gap-2 mb-4">
                <Star className="h-7 w-7 md:h-8 md:w-8 text-red-500" />
                <h2
                  className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
                >
                  {translations.whyChooseUs[language]}
                </h2>
              </div>
              <p
                className={`mt-2 md:mt-4 text-base md:text-lg lg:text-xl text-gray-700 ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
              >
                {translations.safetyPriority[language]}
              </p>
            </div>
            <div className="mt-6 md:mt-8 lg:mt-10 grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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

        <section className="border-t border-gray-200 bg-white py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              {/* Update the "Across Pakistan" section */}
              <div className="mx-auto max-w-3xl">
                <div>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-4">
                    <Ambulance className="h-7 w-7 md:h-8 md:w-8 text-red-500" />
                    <h2
                      className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center sm:text-left ${language === "ur" ? "sm:text-right font-urdu leading-relaxed" : ""}`}
                    >
                      {translations.acrossPakistan[language]}
                    </h2>
                  </div>
                  <p
                    className={`mt-2 md:mt-4 py-2 text-base md:text-lg text-gray-700 ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
                  >
                    {translations.acrossPakistanDesc[language]}
                  </p>
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-red-50 rounded-xl">
                    <h3
                      className={`text-lg md:text-xl font-bold text-gray-900 mb-4 text-center sm:text-left ${language === "ur" ? "sm:text-right font-urdu" : ""}`}
                    >
                      {translations.contactUs[language]}
                    </h3>
                    <motion.div
                      className={`flex flex-col sm:flex-row items-center gap-4 ${language === "ur" ? "sm:flex-row-reverse" : ""}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="bg-white p-3 rounded-full shadow-md mb-2 sm:mb-0">
                        <Phone className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
                      </div>
                      <div className={`text-center sm:text-left ${language === "ur" ? "sm:text-right" : ""}`}>
                        <a
                          href="tel:+923369111122"
                          className="text-lg md:text-xl font-bold text-red-600 hover:underline flex items-center justify-center sm:justify-start gap-1"
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
                        <p className={`text-base md:text-lg text-gray-700 ${language === "ur" ? "font-urdu" : ""}`}>
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

