import Link from "next/link"

export default function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      {currentPage > 1 && (
        <Link
          href={`/books?page=${currentPage - 1}`}
          className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors"
        >
          Previous
        </Link>
      )}
      <span className="text-purple-600 font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={`/books?page=${currentPage + 1}`}
          className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  )
}

