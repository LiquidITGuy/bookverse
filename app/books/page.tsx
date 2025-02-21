import BookList from "@/components/BookList"
import Pagination from "@/components/Pagination"
import { getBooks } from "@/lib/api"

export default async function BooksPage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1
  const { books, totalPages } = await getBooks(currentPage)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-purple-600">Our Book Collection</h1>
      <BookList books={books} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  )
}

