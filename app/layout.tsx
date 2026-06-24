import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KillShill — KOL Audit Board",
  description: "Track and audit trading influencer credibility",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} bg-[#0a0a0d] text-white antialiased`}>
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}