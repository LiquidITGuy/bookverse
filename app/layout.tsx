import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import Script from "next/script"
import OnlineStatusIndicator from "@/components/OnlineStatusIndicator"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "BookVerse",
    description: "Explore a world of books in our digital library",
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
        <OnlineStatusIndicator />
        <main>{children}</main>
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; 2023 BookVerse. All rights reserved.</p>
            </div>
        </footer>
        <Script
            id="register-sw"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/service-worker.js').then(
                    (registration) => {
                      console.log('Service Worker registered with scope:', registration.scope);
                    },
                    (err) => {
                      console.log('Service Worker registration failed:', err);
                    }
                  );
                });
              }
            `,
            }}
        />
        </body>
        </html>
    )
}
