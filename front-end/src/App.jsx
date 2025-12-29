import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import { ThemeProvider } from './components/ThemeProvider';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme" defaultTheme="light">
      <div className="min-h-screen pt-20">
        <Navbar />
        <div className="container mx-auto px-6 py-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
