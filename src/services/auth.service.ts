import { apiClient } from "./apiClient";

interface UserData {
  name?: string | null;
  email: string;
  password: string;
}

export const register = async (userData: UserData) => {
  const response = await apiClient.post('/auth/register', userData);

  return response.data;
};