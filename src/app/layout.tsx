import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
// Fonts are bundled locally (no Google Fonts download), so the app also works with bad Wi-Fi.
import "@fontsource-variable/inter"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/900.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "ENTR Hackathon",
  description: "Startapp voor de ENTR-hackathon in Dakhla",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-logged-in-bg antialiased">
        <header className="border-b bg-white">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="ENTR" width={101} height={32} priority />
              <span className="font-poppins text-sm font-medium text-muted-foreground">Hackathon</span>
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  )
}
