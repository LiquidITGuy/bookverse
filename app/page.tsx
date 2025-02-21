import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
      <div className="text-center text-white p-8 max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">Welcome to BookVerse</h1>
        <p className="text-xl mb-8">
          Dive into a world of literary wonders. Explore our vast collection, find your next favorite read, and join a
          community of book lovers.
        </p>
        <div className="space-x-4">
          <Link
            href="/books"
            className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition duration-300"
          >
            Explore Books
          </Link>
          <Link
            href="/search"
            className="bg-purple-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition duration-300"
          >
            Search Books
          </Link>
        </div>
      </div>
    </div>
  )
}

