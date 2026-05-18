import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';
import './styles/tailwind.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <ThemeProvider>
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#10b981',
                  },
                  icon: '✓',
                },
                error: {
                  style: {
                    background: '#ef4444',
                  },
                  icon: '✕',
                },
              }}
            />
          </ThemeProvider>
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
