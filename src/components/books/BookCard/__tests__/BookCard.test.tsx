import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BookCard } from '../BookCard';
import { BrowserRouter } from 'react-router-dom';
import type { Book } from '@/types';
import coverPlaceholder from '@/assets/images/illuminated-bookshelves.png';

const mockBook: Book = {
  googleBooksId: '12345',
  title: 'O Guia do Mochileiro das Galáxias',
  authors: ['Douglas Adams'],
  categories: ['Science Fiction'],
  coverImageUrl: 'http://example.com/cover.jpg',
};

const renderBookCard = (book: Book) => {
  return render(
    <BrowserRouter>
      <BookCard book={book} />
    </BrowserRouter>
  );
};

describe('BookCard', () => {
  it('should render all book details correctly', () => {
    renderBookCard(mockBook);

    expect(screen.getByText('O Guia do Mochileiro das Galáxias')).toBeInTheDocument();

    expect(screen.getByText('Douglas Adams')).toBeInTheDocument();

    const coverImage = screen.getByRole('img');
    expect(coverImage).toHaveAttribute('src', mockBook.coverImageUrl);

    const detailsLink = screen.getByRole('link', { name: /ver detalhes/i });
    expect(detailsLink).toHaveAttribute('href', `/books/${mockBook.googleBooksId}`);
  });

  it('should use the placeholder image if coverImageUrl is not provided', () => {
    const bookWithoutCover: Book = { ...mockBook, coverImageUrl: undefined };

    renderBookCard(bookWithoutCover);

    const coverImage = screen.getByRole('img');
    expect(coverImage).toHaveAttribute('src', coverPlaceholder);
  });

  it('should render multiple authors separated by a comma', () => {
    const bookWithMultipleAuthors: Book = {
      ...mockBook,
      authors: ['Neil Gaiman', 'Terry Pratchett'],
    };

    renderBookCard(bookWithMultipleAuthors);

    expect(screen.getByText('Neil Gaiman, Terry Pratchett')).toBeInTheDocument();
  });
});
