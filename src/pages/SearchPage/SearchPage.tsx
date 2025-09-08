import { BookCard } from '@/components/books/BookCard/BookCard';
import { Button } from '@/components/forms/Button/Button';
import { Input } from '@/components/forms/Input/Input';
import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { searchBooks } from '@/services/book.service';
import type { Book } from '@/types';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import Select, { type MultiValue, type StylesConfig } from 'react-select';

interface ApiErrorResponse {
  status: 'error';
  message: string;
  errors?: {
    path: string;
    message: string;
  }[];
}

type GenreOption = {
  value: string;
  label: string;
};

const customSelectStyles: StylesConfig<GenreOption, true> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: 'var(--color-background)',
    minHeight: '40px',
    borderRadius: '6px',
    border: state.isFocused
      ? '2px solid var(--color-primary)'
      : '1px solid var(--color-highlight)',
    boxShadow: state.isFocused ? 'none' : 'none',
    '&:hover': {
      borderColor: 'var(--color-primary)',
    },
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: 'white',
    borderRadius: '6px',
    marginTop: '4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    cursor: 'pointer',
    backgroundColor: state.isFocused ? 'var(--color-highlight)' : 'white',
    color: 'var(--color-detail)',
    fontWeight: '350',
    '&:active': {
      backgroundColor: 'var(--color-highlight)',
    },
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--color-detail)',
    fontWeight: '350',
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: 'var(--color-highlight)',
    borderRadius: '4px',
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--color-detail)',
    fontWeight: '400',
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--color-detail)',
    '&:hover': {
      backgroundColor: 'var(--color-primary)',
      color: 'white',
    },
  }),
};

export const SearchPage = () => {
  const genreList = [
    'Fiction',
    'Non-Fiction',
    'Romance',
    'Mystery',
    'Science Fiction',
    'History',
    'Personal Development',
  ];

  const genreOptions: GenreOption[] = genreList.map((genre) => ({
    value: genre,
    label: genre,
  }));

  const [search, setSearch] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<MultiValue<GenreOption>>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!search) {
      setBooks([]);
      setError('Please type something to search.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBooks([]);
    setHasSearched(true);
    setSelectedGenres([]);

    try {
      const foundBooks = await searchBooks(search);
      setBooks(foundBooks);
    } catch (err) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (isAxiosError(err) && err.response) {
        const errorData = err.response.data as ApiErrorResponse;
        errorMessage = errorData.message || errorMessage;
      }
      setError(errorMessage);
      console.error('API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBooks = books.filter((bookObject) => {
    if (selectedGenres.length === 0) {
      return true;
    }

    const selectedValues = selectedGenres.map((genre) => genre.value);

    return (
      bookObject.categories &&
      bookObject.categories.some((category) =>
        selectedValues.includes(category)
      )
    );
  });

  const handleClearFilters = () => {
    setSelectedGenres([]);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-detail">Loading...</p>;
    }

    if (error) {
      return <p className="text-red-600">{error}</p>;
    }

    if (filteredBooks.length > 0) {
      return filteredBooks.map((bookObject) => (
        <BookCard key={bookObject.googleBooksId} book={bookObject} />
      ));
    }

    if (hasSearched && books.length > 0 && filteredBooks.length === 0) {
      return (
        <div className="text-detail col-span-full text-center">
          <p>No book matches the selected filter(s).</p>
          <p className="text-sm mt-1">
            Try changing or clearing the filters to see more results.
          </p>
        </div>
      );
    }

    if (hasSearched && books.length === 0)
      return <p className="text-detail col-span-full">No books found.</p>;

    return (
      <p className="text-detail col-span-full">Find your next book to read.</p>
    );
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-detail mb-4">Search Books</h1>
          <form onSubmit={handleSubmit} className="relative max-w-2xl">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                label={
                  <HiOutlineMagnifyingGlass className="absolute left-4 top-3.5 text-detail stroke-2" />
                }
                name="searchBar"
                type="text"
                className="flex-1 md:w-xl px-10 border-highlight focus:border-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, author, ISBN..."
              />
              <Button
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary/80"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h3 className="font-semibold text-detail mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="genreFilter"
                  className="block text-sm text-detail font-medium mb-2"
                >
                  Genre
                </label>
                <Select
                  id="genreFilter"
                  instanceId="genreFilter"
                  isMulti
                  options={genreOptions}
                  value={selectedGenres}
                  onChange={(selectedOptions) =>
                    setSelectedGenres(selectedOptions)
                  }
                  styles={customSelectStyles}
                  placeholder="Select genres..."
                  className="text-detail"
                />
              </div>
              <Button
                onClick={handleClearFilters}
                className="w-full h-10 px-4 py-2 flex items-center justify-center gap-2 rounded-md font-medium text-sm transition-colors border border-highlight text-highlight hover:text-white bg-background hover:bg-highlight focus-visible:outline-none"
              >
                Clear Filters
              </Button>
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="mb-4">
              {books.length > 0 && (
                <p className="text-detail">
                  Showing {filteredBooks.length} of {books.length} results
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
