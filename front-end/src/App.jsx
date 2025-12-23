import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router"
import Home from "./pages/home"
import { ThemeProvider } from "./components/ThemeProvider"
import Login from "./pages/Login"
import About from "./pages/About"

function App() {
  
  return (
    <ThemeProvider storageKey="vite-ui-theme" defaultTheme="light">
      <div className="min-h-screen pt-20">
        <Navbar/>
        <div className="px-5 py-2 container mx-auto">
          <Routes>
            <Route path="/" element={<Home/> }/>
            <Route path="/login" element={<Login/> }/>
            <Route path="/sobre" element={<About/> }/>
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
