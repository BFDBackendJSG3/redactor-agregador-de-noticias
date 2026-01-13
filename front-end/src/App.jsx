import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import { ThemeProvider } from './components/ThemeProvider';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import MeuPerfil from './pages/MeuPerfil';
import AdminUsers from '@/pages/AdminUsers';

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme" defaultTheme="light">
      <div className="min-h-screen pt-20 md:pt-16">
        <Navbar />
        <div className="container mx-auto px-3 py-2 md:px-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/perfil" element={<MeuPerfil />} />
            <Route path="/admin/usuarios" element={<AdminUsers />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
