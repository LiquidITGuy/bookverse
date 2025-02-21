"use client";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

import { getBookById } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import {OneBook} from "@/lib/types";
import {useEffect, useState} from "react";

export default function BookDetails({ params }: { params: { id: string } }) {
  // used if we didnt use use client for server side
  // we need to add async function into the default export
  // const book = await getBookById(params.id)
  const [book, setBook] = useState<OneBook | null | undefined>(null)
  useEffect(() => {
    getBookById(params.id).then((book) => {
      setBook(book)
    })
  }, [])

  if (!book) {
    return <div className="container mx-auto px-4 py-8 text-center">Book not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/books" className="text-purple-600 hover:underline mb-4 inline-block">
        &larr; Back to list
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              width={300}
              height={450}
              className="w-full h-96 object-cover md:w-48 md:h-auto"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-purple-600">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
            <h2 className="text-2xl font-semibold mb-2 text-purple-500">Summary</h2>
            <p className="text-gray-700 mb-6">{book.summary}</p>
            <h2 className="text-2xl font-semibold mb-2 text-purple-500">Comments</h2>
            <ul className="space-y-4">
              {book.comments.map((comment, index) => (
                <li key={index} className="bg-purple-100 p-4 rounded-lg">
                  <p className="text-gray-800">{comment.auteur}</p>
                  <p className="text-gray-800">{new Date(comment.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-800 text-right">{
                    <BlocksRenderer content={comment.contenu} />
                  }</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
