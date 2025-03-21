"use client"
import { useState, useRef, useEffect } from "react"

// Location service to handle all geolocation functionality
export function useLocationService() {
  const [userLocation, setUserLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState("idle") // idle, loading, success, error
  const [cityName, setCityName] = useState("")
  const [permissionRetries, setPermissionRetries] = useState(0)
  const [isProcessingLocation, setIsProcessingLocation] = useState(false)
  const [debugInfo, setDebugInfo] = useState("")

  const pendingMessageRef = useRef(false)
  const permissionTimeoutRef = useRef(null)

  // Get city name from coordinates using reverse geocoding
  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      // Set a timeout for the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=en`,
        { signal: controller.signal },
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Extract city name from the response
      // Nominatim returns different address structures, so we need to check multiple fields
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.county ||
        data.address?.state ||
        "Unknown location"

      setCityName(city)
      return city
    } catch (error) {
      console.error("Error getting city name:", error)
      // Use a fallback city name based on coordinates
      const fallbackCity = `Location at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
      setCityName(fallbackCity)
      return fallbackCity
    }
  }

  // Check if we have permission to access geolocation
  const checkGeolocationPermission = async () => {
    // Use the Permissions API if available
    if (navigator.permissions && navigator.permissions.query) {
      try {
        const result = await navigator.permissions.query({ name: "geolocation" })
        return result.state
      } catch (error) {
        console.error("Error checking geolocation permission:", error)
        return "unknown"
      }
    }
    return "unknown" // Can't determine permission state
  }

  // Request location with robust error handling and permission management
  const requestLocation = (language) => {
    console.log("Requesting location...")

    // Clear any existing timeout
    if (permissionTimeoutRef.current) {
      clearTimeout(permissionTimeoutRef.current)
      permissionTimeoutRef.current = null
    }

    // Options for geolocation request
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 second timeout
      maximumAge: 0, // Always get a fresh location
    }

    // Request location with robust error handling
    navigator.geolocation.getCurrentPosition(
      // Success handler
      async (position) => {
        try {
          console.log("Location obtained successfully:", position.coords)
          const { latitude, longitude } = position.coords
          const locationData = { latitude, longitude }

          // Update state with the new location
          setUserLocation(locationData)

          // Get city name from coordinates
          const city = await getCityFromCoordinates(latitude, longitude)
          console.log("City name obtained:", city)

          // Update location status
          setLocationStatus("success")
          setIsProcessingLocation(false)

          return { locationData, city }
        } catch (error) {
          console.error("Error processing location:", error)
          setLocationStatus("error")
          pendingMessageRef.current = false
          setIsProcessingLocation(false)
          alert(
            language === "en"
              ? "Error processing your location. Please try again or call emergency services directly."
              : "آپ کے مقام پر کارروائی کرنے میں خرابی۔ براہ کرم دوبارہ کوشش کریں یا براہ راست ہنگامی خدمات کو کال کریں۔",
          )
          return null
        }
      },
      // Error handler with specific error messages and retry logic
      async (error) => {
        console.error("Geolocation error:", error)

        // If this is a permission error, check if we should retry
        if (error.code === 1) {
          // PERMISSION_DENIED
          // Check current permission state
          const permissionState = await checkGeolocationPermission()

          // If permission appears to be granted or prompt, but we still got an error,
          // this might be a browser inconsistency - retry a few times
          if ((permissionState === "granted" || permissionState === "prompt") && permissionRetries < 3) {
            console.log(
              `Permission appears to be ${permissionState}, but got error. Retrying... (${permissionRetries + 1}/3)`,
            )
            setPermissionRetries((prev) => prev + 1)

            // Wait a moment before retrying to give the browser time to update permission state
            permissionTimeoutRef.current = setTimeout(() => {
              requestLocation(language)
            }, 1000)

            return null
          }
        }

        // If we've exhausted retries or it's not a permission issue, show the error
        setLocationStatus("error")
        pendingMessageRef.current = false
        setIsProcessingLocation(false)

        // Provide specific error messages based on the error code
        let errorMessage = ""
        if (language === "en") {
          switch (error.code) {
            case 1: // PERMISSION_DENIED
              errorMessage =
                "Location permission denied. Please enable location services in your browser settings and try again."
              break
            case 2: // POSITION_UNAVAILABLE
              errorMessage =
                "Your location information is unavailable. Please try again or call emergency services directly."
              break
            case 3: // TIMEOUT
              errorMessage =
                "The request to get your location timed out. Please try again or call emergency services directly."
              break
            default:
              errorMessage =
                "An unknown error occurred while getting your location. Please try again or call emergency services directly."
          }
        } else {
          switch (error.code) {
            case 1: // PERMISSION_DENIED
              errorMessage =
                "مقام کی اجازت سے انکار کر دیا گیا۔ براہ کرم اپنی براؤزر کی ترتیبات میں مقام کی خدمات کو فعال کریں اور دوبارہ کوشش کریں۔"
              break
            case 2: // POSITION_UNAVAILABLE
              errorMessage =
                "آپ کے مقام کی معلومات دستیاب نہیں ہیں۔ براہ کرم دوبارہ کوشش کریں یا براہ راست ہنگامی خدمات کو کال کریں۔"
              break
            case 3: // TIMEOUT
              errorMessage =
                "آپ کا مقام حاصل کرنے کی درخواست کا وقت ختم ہو گیا۔ براہ کرم دوبارہ کوشش کریں یا براہ راست ہنگامی خدمات کو کال کریں۔"
              break
            default:
              errorMessage =
                "آپ ک�� مقام حاصل کرتے وقت ایک نامعلوم خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں یا براہ راست ہنگامی خدمات کو کال کریں۔"
          }
        }

        alert(errorMessage)
        return null
      },
      geoOptions,
    )
  }

  // Handle location request
  const handleLocationRequest = async (language) => {
    console.log("Location request initiated")

    // Prevent multiple simultaneous requests
    if (isProcessingLocation) {
      console.log("Already processing location, ignoring request")
      return
    }

    // Set processing flag
    setIsProcessingLocation(true)

    // Set loading state immediately for UI feedback
    setLocationStatus("loading")

    // Set the pending message flag
    pendingMessageRef.current = true

    // Check if geolocation is available
    if (!navigator.geolocation) {
      console.error("Geolocation not supported")
      setLocationStatus("error")
      pendingMessageRef.current = false
      setIsProcessingLocation(false)
      alert(
        language === "en"
          ? "Geolocation is not supported by this browser. Please use a different device or browser, or call emergency services directly."
          : "جیو لوکیشن اس براؤزر کے ذریعے سپورٹ نہیں ہے۔ براہ کرم کوئی مختلف آلہ یا براؤزر استعمال کریں، یا براہ راست ہنگامی خدمات کو کال کریں۔",
      )
      return
    }

    // Clear any existing location data to ensure we get fresh data
    setUserLocation(null)
    setCityName("")

    // Check current permission state
    const permissionState = await checkGeolocationPermission()
    console.log("Current geolocation permission state:", permissionState)

    // Reset retry counter if this is a new request
    setPermissionRetries(0)

    // Request location
    requestLocation(language)
  }

  // Create message for WhatsApp
  const createWhatsAppMessage = (location, city, type, lang) => {
    let message = ""

    if (type === "self") {
      // For self booking, include location details
      if (lang === "en") {
        message = `Help! I am in ${city}, I need an ambulance!`

        // Add location information
        const googleMapsLink = `https://maps.google.com/?q=${location.latitude},${location.longitude}`
        message += `\n\nMy exact location: ${googleMapsLink}`
      } else {
        // Add RTL marker and formatting for Urdu text
        message = `\u200F\u061C${city} میں ہوں، مجھے ایمبولینس کی ضرورت ہے! مدد!`

        // Add location information with RTL marker
        const googleMapsLink = `https://maps.google.com/?q=${location.latitude},${location.longitude}`
        message += `\n\n\u200F\u061Cمیرا مقام: ${googleMapsLink}`
      }
    } else {
      // For someone else
      if (lang === "en") {
        message = "I need an ambulance for someone else. I will tell you the location on call."
      } else {
        // Add RTL marker and formatting for Urdu text
        message = "\u200F\u061Cمجھے کسی اور کے لیے ایمبولینس کی ضرورت ہے۔ میں آپ کو کال پر مقام بتاؤں گا۔"
      }
    }

    return message
  }

  // Send WhatsApp message with location
  const sendWhatsAppMessage = (location, city, bookingType, language) => {
    try {
      console.log("sendWhatsAppMessage called with:", { location, city, bookingType, language })
      setDebugInfo(
        `Sending message: type=${bookingType}, lang=${language}, loc=${JSON.stringify(location)}, city=${city}`,
      )

      // Create the message based on booking type and language
      const message = createWhatsAppMessage(location, city, bookingType, language)
      console.log("Message created:", message)

      // Format the phone number (remove + if present)
      const phoneNumber = "923185122832" // +923185122832 without the +

      // Create the WhatsApp URL with the encoded message
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      console.log("WhatsApp URL created:", whatsappUrl)

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank")

      // Reset the pending message flag
      pendingMessageRef.current = false

      // Reset permission retries
      setPermissionRetries(0)

      // Reset processing flag
      setIsProcessingLocation(false)

      console.log("WhatsApp message sent successfully")
      return true
    } catch (error) {
      console.error("Error sending WhatsApp message:", error)
      setIsProcessingLocation(false)
      alert(
        language === "en"
          ? "Error sending message. Please try again or call emergency services directly."
          : "پیغام بھیجنے میں خرابی۔ براہ کرم دوبارہ کوشش کریں یا براہ راست ہنگامی خدمات کو کال کریں۔",
      )
      return false
    }
  }

  // Cleanup function
  useEffect(() => {
    return () => {
      // Clear any pending message requests if the component unmounts
      pendingMessageRef.current = false

      // Clear any permission timeout
      if (permissionTimeoutRef.current) {
        clearTimeout(permissionTimeoutRef.current)
      }
    }
  }, [])

  return {
    userLocation,
    locationStatus,
    cityName,
    isProcessingLocation,
    debugInfo,
    handleLocationRequest,
    sendWhatsAppMessage,
  }
}

