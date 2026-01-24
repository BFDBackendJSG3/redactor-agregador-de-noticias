import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import DashboardUsers from '@/pages/DashboardUsers';
import DashboardNews from './pages/DashboardNews';
import FavoriteNews from './pages/FavoriteNews';
import NewsByTheme from './pages/NewsByTheme';
import MyProfile from './pages/MyProfile';
import NewsByCity from './pages/NewsByCity';

function App() {
  return (
    <div className="min-h-screen pt-20 md:pt-16">
      <Navbar />
      <div className="container mx-auto px-3 py-2 md:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/perfil" element={<MyProfile />} />
          <Route path="/adicionar-noticia" element={<DashboardNews />} />
          <Route path="/admin/usuarios" element={<DashboardUsers />} />
          <Route path="/noticias-salvas" element={<FavoriteNews />} />
          <Route path="/noticias/:tema" element={<NewsByTheme />} />
          <Route path="/noticias/cidade/:cidade" element={<NewsByCity />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
