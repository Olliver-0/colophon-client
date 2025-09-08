import type { Book } from '@/types';
import { apiClient } from './apiClient';

interface ApiResponse {
  status: string;
  data: Book[];
}

export const searchBooks = async (query: string): Promise<Book[]> => {
  const response = await apiClient.get<ApiResponse>('/books/search', {
    params: {
      q: query,
    },
  });

  return response.data.data;
};
