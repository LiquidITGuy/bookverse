import type {Book, BookApi, OneBook, OneBookApi} from "./types"

const BASE_URL = process.env.CMS_URL || 'https://cms-headless-core.ln1.eu'
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

  const resultBrut = await fetch(BASE_URL+'/livres')
  const result = await resultBrut.json()
  return {books: result.map(convertBook), totalPages: books.length }
  }

export async function getBookById(id: string): Promise<OneBook | undefined> {
  const resultBrut = await fetch(BASE_URL+'/livres/'+id)
  const result = await resultBrut.json()
  return convertOneBook(result)
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

export function convertBook (book: BookApi): Book {
  return {
    id: book.id,
    title: book.titre,
    author: book.auteur,
    coverImage: BASE_URL + book.couverture[0].formats.thumbnail.url,
  }
}
export function convertOneBook (book: OneBookApi): OneBook {
  return {
    id: book.id,
    title: book.titre,
    author: book.auteur,
    coverImage: BASE_URL + book.couverture[0].formats.thumbnail.url,
    summary: book.description,
    comments: [],
  }
}
