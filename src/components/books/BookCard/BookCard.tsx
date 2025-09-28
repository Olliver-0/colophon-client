import { Link } from 'react-router-dom';
import type { Book } from '@/types';
import coverPlaceholder from '@/assets/images/illuminated-bookshelves.png';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <article className="flex flex-col h-full rounded-lg border border-highlight bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={book.coverImageUrl || coverPlaceholder}
          alt={`${book.title} cover`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-semibold text-detail mb-2 text-sm line-clamp-2">
            {book.title}
          </h3>
          {book.authors && book.authors.length > 0 && (
            <p className="text-xs text-detail/70 mb-2">{book.authors.join(', ')}</p>
          )}
        </div>

        <Link
          to={`/books/${book.googleBooksId}`}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-primary text-white hover:bg-primary/80 text-xs"
        >
          Ver Detalhes
        </Link>
      </div>
    </article>
  );
};
