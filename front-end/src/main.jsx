import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  </StrictMode>
);
