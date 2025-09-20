import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'; // <--- MUDANÇA AQUI
import { apiClient } from '../apiClient';
import { searchBooks } from '../book.service';
import type { Book } from '@/types';

vi.mock('../apiClient');

describe('Book Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('searchBooks', () => {
    it('should call the search endpoint with the correct query parameter', async () => {
      const mockApiResponse = {
        data: {
          status: 'success',
          data: [{ title: 'Test Book' }] as Book[],
        },
      };
      (apiClient.get as Mock).mockResolvedValue(mockApiResponse);

      const query = 'Tolkien';
      await searchBooks(query);

      expect(apiClient.get).toHaveBeenCalledWith('/books/search', {
        params: {
          q: query,
        },
      });
    });

    it('should return the books array from the response data', async () => {
      const mockBooks: Book[] = [
        { googleBooksId: '1', title: 'The Hobbit', authors: ['J.R.R. Tolkien'], categories: [] },
        { googleBooksId: '2', title: 'The Lord of the Rings', authors: ['J.R.R. Tolkien'], categories: [] },
      ];
      const mockApiResponse = { data: { status: 'success', data: mockBooks } };
      (apiClient.get as Mock).mockResolvedValue(mockApiResponse); // <--- MUDANÇA AQUI

      const result = await searchBooks('Tolkien');
      expect(result).toEqual(mockBooks);
    });
  });
});
