import { Route, Routes } from 'react-router-dom';
import { SignUpPage } from '@/pages/SignUpPage/SignUpPage';


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpPage />} />
    </Routes>
  );
};
