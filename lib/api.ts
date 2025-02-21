import type { Book } from "./types"

const books: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "/placeholder.svg?height=300&width=200",
    summary: "A classic novel about racial injustice in the American South.",
    comments: ["Great book!", "A must-read for everyone."],
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    coverImage: "/placeholder.svg?height=300&width=200",
    summary: "A dystopian novel set in a totalitarian society.",
    comments: ["Chilling and thought-provoking.", "Still relevant today."],
  },
  // Add more books here...
]

const BOOKS_PER_PAGE = 6

export async function getBooks(page: number): Promise<{ books: Book[]; totalPages: number }> {
  const start = (page - 1) * BOOKS_PER_PAGE
  const end = start + BOOKS_PER_PAGE
  const paginatedBooks = books.slice(start, end)
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ books: paginatedBooks, totalPages })
    }, 500) // Simulate network delay
  })
}

export async function getBookById(id: string): Promise<Book | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books.find((book) => book.id === id))
    }, 500) // Simulate network delay
  })
}

export async function searchBooks(query: string): Promise<Book[]> {
  const lowercaseQuery = query.toLowerCase()
  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(lowercaseQuery))

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filteredBooks)
    }, 500) // Simulate network delay
  })
}

