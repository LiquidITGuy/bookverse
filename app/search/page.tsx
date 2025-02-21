import { searchBooks } from "@/lib/api"
import BookList from "@/components/BookList"
import Link from "next/link"

export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query || ""
  const books = query ? await searchBooks(query) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/books" className="text-purple-600 hover:underline mb-4 inline-block">
        &larr; Back to list
      </Link>
      <h1 className="text-4xl font-bold mb-8 text-purple-600">Search Books</h1>
      <form action="/search" method="get" className="mb-8">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search by book title"
          className="w-full px-4 py-2 border border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors"
        >
          Search
        </button>
      </form>
      {query && <BookList books={books} />}
    </div>
  )
}

