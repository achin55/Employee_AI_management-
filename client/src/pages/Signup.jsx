import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import SignupForm from '../components/auth/SignupForm';

export const Signup = () => {
  return (
    <AuthLayout title="Create Account">
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
