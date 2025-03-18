"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { Phone, MapPin, AlertCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const [userLocation, setUserLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState("idle") // idle, loading, success, error
  const [cityName, setCityName] = useState("")
  const [language, setLanguage] = useState("ur") // "en" for English, "ur" for Urdu
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const pendingMessageRef = useRef(null)

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

  // Get city name from coordinates using reverse geocoding
  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=en`,
      )
      const data = await response.json()

      // Extract city name from the response
      // Nominatim returns different address structures, so we need to check multiple fields
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        data.address.state ||
        "Unknown location"

      setCityName(city)
      return city
    } catch (error) {
      console.error("Error getting city name:", error)
      setCityName("Unknown location")
      return "Unknown location"
    }
  }

  // Send WhatsApp message with location
  const sendWhatsAppMessage = (location, city) => {
    // Format the message with RTL markers for Urdu
    let message = ""

    if (language === "en") {
      message = `Help! I am in ${city}, I need an ambulance!`
    } else {
      // Add RTL marker and formatting for Urdu text
      message = `\u200F\u061C${city} میں ہوں، مجھے ایمبولینس کی ضرورت ہے! مدد!`
    }

    // Add location information
    const googleMapsLink = `https://maps.google.com/?q=${location.latitude},${location.longitude}`

    if (language === "en") {
      message += `\n\nMy exact location: ${googleMapsLink}`
    } else {
      // Add RTL marker for Urdu location text
      message += `\n\n\u200F\u061Cمیرا مقام: ${googleMapsLink}`
    }

    // Format the phone number (remove + if present)
    const phoneNumber = "923185122832" // +923185122832 without the +

    // Create the WhatsApp URL with the encoded message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")
  }

  const handleEmergencyRequest = () => {
    // If we already have the location, send the message immediately
    if (userLocation && cityName) {
      sendWhatsAppMessage(userLocation, cityName)
      return
    }

    // Otherwise, request location and set up to send message once we have it
    setLocationStatus("loading")

    // Store a flag that we want to send a message once location is obtained
    pendingMessageRef.current = true

    // Request location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const locationData = { latitude, longitude }
          setUserLocation(locationData)

          // Get city name from coordinates
          const city = await getCityFromCoordinates(latitude, longitude)

          setLocationStatus("success")

          // If we have a pending message request, send it now
          if (pendingMessageRef.current) {
            pendingMessageRef.current = false
            sendWhatsAppMessage(locationData, city)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationStatus("error")
          pendingMessageRef.current = false

          // Show error message based on the error code
          let errorMessage = ""
          if (language === "en") {
            errorMessage = "Please allow location access to send emergency request."
            if (error.code === 1) {
              errorMessage = "Location permission denied. Please enable location services to send emergency request."
            } else if (error.code === 2) {
              errorMessage = "Location unavailable. Please try again."
            } else if (error.code === 3) {
              errorMessage = "Location request timed out. Please try again."
            }
          } else {
            errorMessage = "براہ کرم ہنگامی درخواست بھیجنے کے لیے مقام تک رسائی کی اجازت دیں۔"
            if (error.code === 1) {
              errorMessage =
                "مقام کی اجازت سے انکار کر دیا گیا۔ براہ کرم ہنگامی درخواست بھیجنے کے لیے مقام کی خدمات کو فعال کریں۔"
            } else if (error.code === 2) {
              errorMessage = "مقام دستیاب نہیں ہے۔ براہ کرم دوبارہ کوشش کریں۔"
            } else if (error.code === 3) {
              errorMessage = "مقام کی درخواست کا وقت ختم ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔"
            }
          }

          alert(errorMessage)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    } else {
      setLocationStatus("error")
      pendingMessageRef.current = false
      alert(
        language === "en"
          ? "Geolocation is not supported by this browser. Please use a different device or browser."
          : "جیو لوکیشن اس براؤزر کے ذریعے سپورٹ نہیں ہے۔ براہ کرم کوئی مختلف آلہ یا براؤزر استعمال کریں۔",
      )
    }
  }

  // Effect to watch for location changes and update UI
  useEffect(() => {
    if (userLocation && pendingMessageRef.current) {
      // If we have location but no city yet, wait for the city to be set
      if (!cityName) return

      // Send the message
      pendingMessageRef.current = false
      sendWhatsAppMessage(userLocation, cityName)
    }
  }, [userLocation, cityName])

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
    quickStats: {
      en: "Quick Stats",
      ur: "فوری اعداد و شمار",
    },
    responseTime: {
      en: "Average Response Time",
      ur: "اوسط ردعمل کا وقت",
    },
    minutes: {
      en: "minutes",
      ur: "منٹ",
    },
    successRate: {
      en: "Success Rate",
      ur: "کامیابی کی شرح",
    },
    ambulances: {
      en: "Ambulances",
      ur: "ایمبولینس",
    },
    inService: {
      en: "in service",
      ur: "خدمت میں",
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
        ur: "پاکستان بھر میں غیر ہنگامی طبی اپائنٹم��ٹس کے لیے محفوظ، آرام دہ نقل و حمل۔",
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

  const floatingAnimation = {
    y: ["-5px", "5px"],
    transition: {
      y: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  // Add a directionality class to the main container based on language
  return (
    <div className={`min-h-screen bg-[#fffcf2] ${language === "ur" ? "text-right" : ""}`}>
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
              className={`mx-auto max-w-3xl text-center ${language === "ur" ? "rtl" : ""}`}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h1
                className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl"
                variants={itemVariants}
              >
                {translations.title[language]}
              </motion.h1>
              <motion.p className="mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl text-gray-700" variants={itemVariants}>
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
              <div className="space-y-4 md:space-y-6">
                {/* Update the location status indicators for RTL support */}
                {locationStatus === "loading" && (
                  <motion.div
                    className={`flex items-center justify-center ${language === "ur" ? "flex-row-reverse space-x-reverse" : "space-x-2"} text-amber-600`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span className="text-sm md:text-base">{translations.gettingLocation[language]}</span>
                  </motion.div>
                )}

                {locationStatus === "success" && (
                  <motion.div
                    className={`flex flex-col ${language === "ur" ? "items-end" : "items-start"} text-green-600`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`flex items-center ${language === "ur" ? "flex-row-reverse space-x-reverse" : "space-x-2"}`}
                    >
                      <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="text-sm md:text-base">{translations.locationSuccess[language]}</span>
                    </div>
                    {cityName && (
                      <div
                        className={`mt-1 flex items-center ${language === "ur" ? "flex-row-reverse space-x-reverse" : "space-x-2"} text-gray-700`}
                      >
                        <span className="text-xs md:text-sm font-medium">
                          {translations.detectedLocation[language]}:
                        </span>
                        <span className="text-xs md:text-sm">{cityName}</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {locationStatus === "error" && (
                  <motion.div
                    className={`flex items-center ${language === "ur" ? "flex-row-reverse space-x-reverse" : "space-x-2"} text-red-600`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                    <span className="text-sm md:text-base">{translations.locationError[language]}</span>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button
                    onClick={handleEmergencyRequest}
                    className="w-full bg-red-600 py-4 md:py-6 lg:py-8 text-xl md:text-2xl font-bold hover:bg-red-700 focus:ring-4 focus:ring-red-300 relative overflow-hidden group"
                    aria-label="Request emergency ambulance"
                    disabled={locationStatus === "loading"}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {translations.requestAmbulance[language]}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      >
                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                      </motion.div>
                    </span>
                    <span className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                </motion.div>
                <motion.p
                  className="text-center text-sm md:text-base lg:text-lg text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {translations.emergencyCall[language]}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Update the services section heading */}
            <h2
              className={`text-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 ${language === "ur" ? "rtl" : ""}`}
            >
              {translations.services[language]}
            </h2>
            <div className="mt-6 md:mt-8 lg:mt-10 grid gap-4 md:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={index} title={service.title[language]} description={service.description[language]} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-[#fffcf2] py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Update the "Why Choose Us" section */}
            <div className={`mx-auto max-w-3xl text-center ${language === "ur" ? "rtl" : ""}`}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {translations.whyChooseUs[language]}
              </h2>
              <p className="mt-2 md:mt-4 text-base md:text-lg lg:text-xl text-gray-700">
                {translations.safetyPriority[language]}
              </p>
            </div>
            <div className="mt-6 md:mt-8 lg:mt-10 grid gap-4 md:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} title={feature.title[language]} description={feature.description[language]} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-white py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              {/* Update the "Across Pakistan" section */}
              <div className={`mx-auto max-w-3xl ${language === "ur" ? "rtl" : ""}`}>
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                    {translations.acrossPakistan[language]}
                  </h2>
                  <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-700">
                    {translations.acrossPakistanDesc[language]}
                  </p>
                  <div className="mt-4 md:mt-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{translations.contactUs[language]}</h3>
                    <motion.div
                      className={`mt-2 md:mt-4 flex items-center gap-2 md:gap-3 ${language === "ur" ? "flex-row-reverse" : ""}`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Phone className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
                      <div>
                        <a
                          href="tel:+923369111122"
                          className="text-lg md:text-xl font-bold text-red-600 hover:underline flex items-center gap-1"
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
                        <p className="text-base md:text-lg text-gray-700">{translations.available[language]}</p>
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

// Update the ServiceCard component to support RTL and add animations
function ServiceCard({ title, description }) {
  return (
    <motion.div
      className="rounded-lg border-2 border-gray-200 bg-white p-4 md:p-6 shadow-md transition-all hover:shadow-lg h-full"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <h3 className="text-lg md:text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 md:mt-4 text-sm md:text-base lg:text-lg text-gray-600">{description}</p>
    </motion.div>
  )
}

// Update the FeatureCard component to support RTL and add animations
function FeatureCard({ title, description }) {
  return (
    <motion.div
      className="rounded-lg border-2 border-gray-200 bg-white p-4 md:p-6 shadow-md h-full"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <h3 className="text-lg md:text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-1 md:mt-2 text-sm md:text-base lg:text-lg text-gray-600">{description}</p>
    </motion.div>
  )
}

