import { MainLayout } from '@/layouts/MainLayout';
import { Input } from '@/components/forms/Input';
import { Button } from '@/components/forms/Button';
import { register } from '@/services/auth.service';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';

interface ApiErrorResponse {
  status: 'error';
  message: string;
  errors?: {
    path: string;
    message: string;
  }[];
}

export const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords does not match');
      return;
    }

    const formData = { name, email, password };
    try {
      const result = await register(formData);
      console.log(result.message);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorData = error.response.data as ApiErrorResponse;
        console.error('Erro da API:', errorData.message);
        alert(errorData.message);
      } else {
        console.error('Erro inesperado:', error);
      alert('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center p-8">
        <h2 className="font-bold text-center text-3xl text-detail">
          Sign Up and become a <span className="text-primary">Colophon</span> Reader!
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-96 bg-white mt-4 p-6 rounded-xl shadow-xl/10">
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Insert your name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Insert your email here"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Insert your password here"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Insert your password here"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-primary w-32 cursor-pointer self-center px-4 py-2 text-sm text-white font-semibold rounded-md hover:scale-105 transition"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};
