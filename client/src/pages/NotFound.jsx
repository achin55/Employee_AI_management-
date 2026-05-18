import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { AlertCircle } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-96">
        <AlertCircle size={48} className="text-red-600 mb-4" />
        <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-primary"
        >
          Go Back to Dashboard
        </button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
