import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Detalle from "./pages/Detalle";
import Solicitudes from "./pages/Solicitudes";
import Navbar from "./components/Navbar"; 
import { AuthProvider } from "./context/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mascota/:id" element={<Detalle />} /> 
          <Route path="/solicitudes" element={<Solicitudes />} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;