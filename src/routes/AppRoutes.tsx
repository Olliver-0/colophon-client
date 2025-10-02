import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from '@/pages/SignUpPage/SignUpPage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { HomeDispatcher } from '@/routes/HomeDispatcher';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { SearchPage } from '@/pages/SearchPage/SearchPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeDispatcher />} />
      <Route path="/books" element={<SearchPage />} />

      <Route element={<PublicRoute />}>
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}></Route>
    </Routes>
  );
};
