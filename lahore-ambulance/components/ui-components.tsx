"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, AlertCircle, ArrowRight, User, Users, Ambulance } from "lucide-react"

// Service card component
export function ServiceCard({ title, description, language }) {
  return (
    <motion.div
      className="rounded-lg border-2 border-gray-200 bg-white p-4 md:p-6 shadow-md transition-all hover:shadow-lg h-full"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100 }}
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
        <div className="bg-red-100 p-2 rounded-full text-red-600 mb-2 sm:mb-0">
          <Ambulance className="h-5 w-5" />
        </div>
        <div className={`text-center sm:text-left ${language === "ur" ? "sm:text-right" : ""}`}>
          <h3 className={`text-lg md:text-xl font-bold text-gray-900 ${language === "ur" ? "font-urdu" : ""}`}>
            {title}
          </h3>
          <p
            className={`mt-2 md:mt-4 text-sm md:text-base lg:text-lg text-gray-600 ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Feature card component
export function FeatureCard({ title, description, language }) {
  return (
    <motion.div
      className="rounded-lg border-2 border-gray-200 bg-white p-4 md:p-6 shadow-md h-full"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100 }}
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <h3 className={`text-lg md:text-xl font-bold text-gray-900 ${language === "ur" ? "font-urdu" : ""}`}>{title}</h3>
      <p
        className={`mt-1 md:mt-2 text-sm md:text-base lg:text-lg text-gray-600 ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
      >
        {description}
      </p>
    </motion.div>
  )
}

// Booking form components
export function InitialBookingForm({ onEmergencyRequest, translations, language }) {
  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 p-3 rounded-full">
          <Ambulance className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <Button
          onClick={onEmergencyRequest}
          className={`w-full bg-red-600 py-6 sm:py-6 md:py-6 lg:py-8 text-lg sm:text-xl md:text-2xl font-bold hover:bg-red-700 focus:ring-4 focus:ring-red-300 relative overflow-hidden group ${language === "ur" ? "font-urdu" : ""}`}
          aria-label="Request emergency ambulance"
          dir={language === "ur" ? "rtl" : "ltr"}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {translations.requestAmbulance[language]}
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </motion.div>
          </span>
          <span className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </Button>
      </motion.div>
      <motion.p
        className={`text-center text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        dir={language === "ur" ? "rtl" : "ltr"}
      >
        {translations.emergencyCall[language]}
      </motion.p>
    </>
  )
}

export function BookingTypeForm({ onBookingTypeSelection, translations, language }) {
  return (
    <motion.div
      className="space-y-4 md:space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <h3
        className={`text-lg md:text-xl font-bold text-center ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
      >
        {translations.bookingTypeQuestion[language]}
      </h3>
      <p
        className={`text-sm md:text-base text-gray-600 text-center ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}
      >
        {translations.bookingTypeDescription[language]}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={() => onBookingTypeSelection("self")}
            className={`w-full py-6 md:py-8 bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center gap-2 h-auto ${language === "ur" ? "font-urdu" : ""}`}
          >
            <User className="h-6 w-6 md:h-8 md:w-8" />
            <span className="text-base md:text-lg font-medium text-center">{translations.forSelf[language]}</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            onClick={() => onBookingTypeSelection("other")}
            className={`w-full py-6 md:py-8 bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center gap-2 h-auto ${language === "ur" ? "font-urdu" : ""}`}
          >
            <Users className="h-6 w-6 md:h-8 md:w-8" />
            <span className="text-base md:text-lg font-medium text-center">{translations.forOther[language]}</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function LocationForm({
  locationStatus,
  cityName,
  onRetry,
  isProcessingLocation,
  debugInfo,
  translations,
  language,
}) {
  return (
    <div className="space-y-4 md:space-y-6" dir={language === "ur" ? "rtl" : "ltr"}>
      {/* Location status indicators */}
      {locationStatus === "loading" && (
        <motion.div
          className={`flex items-center justify-center ${language === "ur" ? "flex-row-reverse space-x-reverse" : "space-x-2"} text-amber-600`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          <span className={`text-sm md:text-base ${language === "ur" ? "font-urdu" : ""}`}>
            {translations.gettingLocation[language]}
          </span>
        </motion.div>
      )}

      {locationStatus === "success" && (
        <motion.div
          className={`flex flex-col ${language === "ur" ? "items-end" : "items-start"} text-green-600`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={`flex items-center ${language === "ur" ? "flex-row-reverse space-x-reverse" : "space-x-2"}`}>
            <MapPin className="h-4 w-4 md:h-5 md:w-5" />
            <span className={`text-sm md:text-base ${language === "ur" ? "font-urdu" : ""}`}>
              {translations.locationSuccess[language]}
            </span>
          </div>
          {cityName && (
            <div
              className={`mt-1 flex items-center ${language === "ur" ? "flex-row-reverse space-x-reverse" : "space-x-2"} text-gray-700`}
            >
              <span className={`text-xs md:text-sm font-medium ${language === "ur" ? "font-urdu" : ""}`}>
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
          <span className={`text-sm md:text-base ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}>
            {translations.locationError[language]}
          </span>
        </motion.div>
      )}

      {/* Add a retry button for error cases */}
      {locationStatus === "error" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <Button
            onClick={onRetry}
            className={`w-full bg-red-600 hover:bg-red-700 text-white ${language === "ur" ? "font-urdu" : ""}`}
            disabled={isProcessingLocation}
          >
            {translations.tryAgain[language]}
          </Button>
        </motion.div>
      )}

      {/* Debug info */}
      {debugInfo && (
        <div className="mt-2 text-xs text-gray-500 border-t pt-2">
          <p>Debug: {debugInfo}</p>
        </div>
      )}
    </div>
  )
}

export function CompletionForm({ translations, language }) {
  return (
    <motion.div
      className={`space-y-4 md:space-y-6 text-center`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="mx-auto bg-green-100 text-green-800 rounded-full p-3 w-16 h-16 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      <h3 className={`text-xl md:text-2xl font-bold text-gray-900 ${language === "ur" ? "font-urdu" : ""}`}>
        {translations.requestSent[language]}
      </h3>
      <p className={`text-base md:text-lg text-gray-700 ${language === "ur" ? "font-urdu leading-relaxed" : ""}`}>
        {translations.requestSentDesc[language]}
      </p>
      <div className="pt-2">
        <a
          href="tel:+923369111122"
          className="inline-flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors"
          dir="ltr" // Keep phone number in LTR direction
        >
          <Phone className="h-5 w-5" />
          0336 911 1122
        </a>
      </div>
    </motion.div>
  )
}

