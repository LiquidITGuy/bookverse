"use client";
import BookList from "@/components/BookList"
import Pagination from "@/components/Pagination"
import {getBooks} from "@/lib/api"
import {Book} from "@/lib/types";
import {useEffect, useState} from "react";

export default function BooksPage({ searchParams }: { searchParams: { page?: string } }) {
    const currentPage = Number(searchParams.page) || 1
    // used if we didnt use use client for server side
    // we need to add async function into the default export
    // const { books, totalPages } = await getBooks(currentPage)
    const [books, setBooks] = useState<Book[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    useEffect(() => {
        getBooks(currentPage).then(({books, totalPages}) => {
            setBooks(books)
            setTotalPages(totalPages)
        })
    }, [currentPage]) //curentPage ?
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-purple-600">Our Book Collection</h1>
      <BookList books={books} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  )
}
