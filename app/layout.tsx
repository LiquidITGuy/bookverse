import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BookVerse",
  description: "Explore a world of books in our digital library",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
          <nav className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                BookVerse
              </Link>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/books" className="hover:text-purple-200 transition duration-300">
                    Books
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="hover:text-purple-200 transition duration-300">
                    Search
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 BookVerse. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'