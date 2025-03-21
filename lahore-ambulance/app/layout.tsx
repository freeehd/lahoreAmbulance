import type React from "react"
import type { Metadata } from "next"
import { Noto_Nastaliq_Urdu} from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Noto_Nastaliq_Urdu({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lahore Ambulance Service",
  description: "Fast, reliable ambulance service across Pakistan",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
      </body>
    </html>
  )
}

