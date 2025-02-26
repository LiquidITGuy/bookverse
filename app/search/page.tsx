'use client';
import { searchBooks } from "@/lib/api"
import BookList from "@/components/BookList"
import Link from "next/link"
import {FormEvent, useEffect, useState} from "react";
import {Book} from "@/lib/types";

export default function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
    const [books, setBooks] = useState<Book[]>([])
    const [value, setValue] = useState<String>(searchParams.query || '')
    useEffect(() => {
        const url = new URL(window.location.href);
        const newUrl = new URL(window.location.href);
        url.searchParams.set('query', value)
        history.replaceState(history.state, '', url.href);
        if (!value){
            setBooks([])
         return
        }
        searchBooks(value).then((value) => {
            setBooks(value)
        })
    }, [value]);

    const doNothing = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/books" className="text-purple-600 hover:underline mb-4 inline-block">
                &larr; Back to list
            </Link>
            <h1 className="text-4xl font-bold mb-8 text-purple-600">Search Books</h1>
            <form onSubmit={doNothing} className="mb-8">
                <input
                    type="text"
                    name="query"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
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
            {value && <BookList books={books} />}
        </div>
    )
}
