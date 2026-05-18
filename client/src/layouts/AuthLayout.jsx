import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';

export const AuthLayoutWrapper = ({ children, title }) => {
  return <AuthLayout title={title}>{children}</AuthLayout>;
};

export default AuthLayoutWrapper;
