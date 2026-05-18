import React from 'react';

export const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {title}
          </h1>
          {children}
        </div>

        <div className="text-center text-white mt-8 text-sm">
          <p>© 2024 Employee AI System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
