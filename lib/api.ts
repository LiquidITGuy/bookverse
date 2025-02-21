import type {Book, BookApi, OneBook, OneBookApi} from "./types"

const BASE_URL = process.env.CMS_URL || 'https://pwa-cms.ln1.eu/api'

const BOOKS_PER_PAGE = 6

export async function getBooks(page: number): Promise<{ books: Book[]; totalPages: number }> {

  const resultBrut = await fetch(BASE_URL+'/livres')
  const result = await resultBrut.json()
  return {books: result.data.map(convertBook), totalPages: result.meta.pageCount }
  }

export async function getBookById(id: string): Promise<OneBook | undefined> {
  const resultBrut = await fetch(BASE_URL+'/livres/'+id+'?populate=commentaires')
  const result = await resultBrut.json()
  return convertOneBook(result.data)
}

export async function searchBooks(query: string): Promise<Book[]> {
  const lowercaseQuery = query.toLowerCase()
  const resultBrut = await fetch(BASE_URL+'/livres?filters[titre][$containsi]='+lowercaseQuery)
  const result = await resultBrut.json()
  return result.data.map(convertBook)
}

export function convertBook (book: BookApi): Book {
  return {
    id: book.documentId,
    title: book.titre,
    author: book.auteur,
    coverImage: '',
  }
}
export function convertOneBook (book: OneBookApi): OneBook {
  return {
    id: book.documentId,
    title: book.titre,
    author: book.auteur,
    coverImage: '',
    summary: book.description,
    comments: [...book.commentaires],
  }
}
