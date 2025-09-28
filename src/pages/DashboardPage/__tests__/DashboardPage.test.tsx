import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { DashboardPage } from '../DashboardPage';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import * as bookService from '@/services/book.service';
import type { Book } from '@/types';

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/services/book.service');

vi.mock('@/components/books/BookCard/BookCard', () => ({
  BookCard: ({ book }: { book: Book }) => (
    <div data-testid={`book-card-${book.googleBooksId}`}>{book.title}</div>
  ),
}));

const mockedBookService = bookService as { searchBooks: Mock };
const useAuthMock = useAuth as Mock;

const mockBooks: Book[] = [
  {
    googleBooksId: '1',
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald'],
    categories: ['Classic'],
  },
  {
    googleBooksId: '2',
    title: 'To Kill a Mockingbird',
    authors: ['Harper Lee'],
    categories: ['Classic'],
  },
];

const renderDashboardPage = () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useAuthMock.mockReturnValue({
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
    });
  });

  it('should render all static sections and texts correctly', () => {
    mockedBookService.searchBooks.mockResolvedValue([]);
    renderDashboardPage();

    expect(
      screen.getByRole('heading', { name: /welcome back/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Read')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Want to Read')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /featured suggestions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /find new books/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /organize bookshelves/i })
    ).toBeInTheDocument();
  });

  it('should fetch books on mount and display them', async () => {
    mockedBookService.searchBooks.mockResolvedValue(mockBooks);
    renderDashboardPage();

    expect(mockedBookService.searchBooks).toHaveBeenCalledWith(
      'The Republic of Plato'
    );

    await waitFor(() => {
      expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
      expect(screen.getByText('To Kill a Mockingbird')).toBeInTheDocument();
    });

    expect(screen.getByTestId('book-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('book-card-2')).toBeInTheDocument();
  });

  it('should handle API errors gracefully', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const errorMessage = 'Failed to fetch';
    mockedBookService.searchBooks.mockRejectedValue(new Error(errorMessage));

    renderDashboardPage();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to fetch books:',
        expect.any(Error)
      );
    });

    expect(screen.queryByTestId(/book-card-/)).not.toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  it('should have correct links for navigation', () => {
    mockedBookService.searchBooks.mockResolvedValue([]);
    renderDashboardPage();

    const exploreMoreLink = screen.getByRole('link', { name: /explore more/i });
    expect(exploreMoreLink).toHaveAttribute('href', '/books?q=discover');

    const exploreBooksLink = screen.getByRole('link', {
      name: /explore books/i,
    });
    expect(exploreBooksLink).toHaveAttribute('href', '/books');

    const viewBookshelvesLink = screen.getByRole('link', {
      name: /view bookshelves/i,
    });
    expect(viewBookshelvesLink).toHaveAttribute('href', '/bookshelves');
  });
});
