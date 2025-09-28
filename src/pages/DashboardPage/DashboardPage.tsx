import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { Link } from "react-router-dom";
import { FiBook } from "react-icons/fi";
import { LuBookOpen, LuCompass } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { PiBooksBold } from "react-icons/pi";
import { useState, useEffect } from "react";
import type { Book } from "@/types";
import { searchBooks } from "@/services/book.service";
import { BookCard } from "@/components/books/BookCard/BookCard";

export const DashboardPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const foundBooks = await searchBooks('The Republic of Plato');
        setBooks(foundBooks);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-detail mb-4">Welcome back!</h1>
          <p className="text-detail text-lg">
            Continue your literary journey. View your books and discover new
            titles.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center p-6 bg-white rounded-lg shadow-sm border-2 border-highlight/50">
            <div className="mx-4"><FiBook className="size-7 text-highlight/80 mr-4" /></div>
            <div>
              <p className="text-2xl font-bold text-detail">0</p>
              <p className="text-detail text-sm">Read</p>
            </div>
          </div>

          <div className="flex items-center p-6 bg-white rounded-lg shadow-sm border-2 border-highlight/50">
            <div className="mx-4"><LuBookOpen className="size-7 text-primary/80 mr-4" /></div>
            <div>
              <p className="text-2xl font-bold text-detail">0</p>
              <p className="text-detail text-sm">Reading</p>
            </div>
          </div>

          <div className="flex items-center p-6 bg-white rounded-lg shadow-sm border-2 border-highlight/50">
            <div className="mx-4"><FaRegBookmark className="size-7 text-highlight/80 mr-4" /></div>
            <div>
              <p className="text-2xl font-bold text-detail">0</p>
              <p className="text-detail text-sm">Want to Read</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-detail">Featured Suggestions</h2>
            <Link to="/books?q=discover" className="flex justify-center items-center h-10 py-2 text-sm font-semibold cursor-pointer w-auto whitespace-nowrap sm:w-max rounded-md border-2 hover:bg-highlight border-highlight text-highlight hover:text-white px-4 transition-all duration-200">
              Explore More
            </Link>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {books.map((book) => (
              <BookCard key={book.googleBooksId} book={book} />
            ))}
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="flex flex-col gap-4 p-8 bg-white rounded-xl shadow-sm border border-highlight/50">
            <div className="flex items-center gap-2">
            <LuCompass className="size-7 text-primary/80" />
              <h3 className="text-xl font-bold text-detail">Find New Books</h3>
            </div>
            <p className="text-detail">
              Discover new titles and authors to expand your library.
            </p>
            <Link to="/books" className="px-4 bg-primary text-white hover:bg-primary/80 w-max flex justify-center items-center h-10 py-2 rounded-md text-sm font-semibold cursor-pointer transition">
              Explore Books
            </Link>
          </article>

          <article className="flex flex-col gap-4 p-8 bg-white rounded-xl shadow-sm border border-highlight/50">
            <div className="flex items-center gap-2">
              <PiBooksBold className="size-7 text-highlight/80" />
              <h3 className="text-xl font-bold text-detail">
                Organize Bookshelves
              </h3>
            </div>
            <p className="text-detail">
              Manage your books in "Read", "Reading", and "Want to Read".
            </p>
            <Link to="/bookshelves" className="mt-2 px-4 bg-highlight text-white hover:bg-highlight/80 w-max flex justify-center items-center h-10 py-2 rounded-md text-sm font-semibold cursor-pointer transition">
              View Bookshelves
            </Link>
          </article>
        </section>
      </div>
    </MainLayout>
  );
};
