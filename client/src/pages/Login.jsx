import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Employee AI System">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
