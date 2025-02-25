import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/lib/types"

export default function BookList({ books }: { books: Book[] }) {
  return (
    <div data-testid="booklist" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            width={200}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-purple-600">{book.title}</h2>
            <p className="text-gray-600 mb-4">by {book.author}</p>
            <Link
              href={`/book/${book.id}`}
              className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors inline-block"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
