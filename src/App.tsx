import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes.tsx';

export const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
