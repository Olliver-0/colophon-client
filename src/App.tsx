import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes.tsx';
import { AuthProvider } from './contexts/AuthContext';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};
