import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { SearchPage } from '../SearchPage';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import * as bookService from '@/services/book.service';
import type { Book } from '@/types';

vi.mock('@/services/book.service');

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ user: null }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockedBookService = bookService as {
  searchBooks: Mock;
};

const mockBooks: Book[] = [
  { googleBooksId: '1', title: 'Duna', authors: ['Frank Herbert'], categories: ['Science Fiction'] },
  { googleBooksId: '2', title: 'Neuromancer', authors: ['William Gibson'], categories: ['Science Fiction'] },
  { googleBooksId: '3', title: 'Orgulho e Preconceito', authors: ['Jane Austen'], categories: ['Romance'] },
];

const renderSearchPage = (initialRoute = '/books') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <SearchPage />
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('SearchPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render the initial state correctly', () => {
    renderSearchPage();
    expect(screen.getByRole('heading', { name: /search books/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by title, author, isbn/i)).toBeInTheDocument();
    expect(screen.getByText('Find your next book to read.')).toBeInTheDocument();
  });

  it('should allow user to type in the search input', () => {
    renderSearchPage();
    const searchInput = screen.getByPlaceholderText(/search by title, author, isbn/i);
    fireEvent.change(searchInput, { target: { value: 'Duna' } });
    expect(searchInput).toHaveValue('Duna');
  });

  it('should perform a search, show loading, and display results', async () => {
    mockedBookService.searchBooks.mockResolvedValue(mockBooks);
    renderSearchPage();

    const searchInput = screen.getByPlaceholderText(/search by title, author, isbn/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'sci-fi' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(searchButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      expect(screen.getByText('Duna')).toBeInTheDocument();
      expect(screen.getByText('Neuromancer')).toBeInTheDocument();
    });

    expect(mockedBookService.searchBooks).toHaveBeenCalledWith('sci-fi');
  });

  it('should display an error message if the API call fails', async () => {
    const errorMessage = 'Failed to fetch books';
    const axiosError = {
      isAxiosError: true,
      response: { data: { message: errorMessage } },
    };
    mockedBookService.searchBooks.mockRejectedValue(axiosError);
  
    renderSearchPage();
  
    fireEvent.change(screen.getByPlaceholderText(/search by title, author, isbn/i), { target: { value: 'error' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
  
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should display "No books found" message for empty results', async () => {
    mockedBookService.searchBooks.mockResolvedValue([]);
    renderSearchPage();

    fireEvent.change(screen.getByPlaceholderText(/search by title, author, isbn/i), { target: { value: 'empty' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('No books found.')).toBeInTheDocument();
    });
  });

  it('should perform an automatic search when loaded via explore link', async () => {
    mockedBookService.searchBooks.mockResolvedValue([mockBooks[0]]);

    renderSearchPage('/books?q=discover');

    await waitFor(() => {
      expect(screen.getByText('Duna')).toBeInTheDocument();
    });

    expect(mockedBookService.searchBooks).toHaveBeenCalledWith('Rick Riordan');
  });
});
