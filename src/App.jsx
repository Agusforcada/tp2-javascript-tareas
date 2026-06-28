import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Detalle from "./pages/Detalle"; // <-- 1. Importamos la vista nueva
import { AuthProvider } from "./context/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Inicio (Catálogo)</Link>
          <Link to="/login">Ingresar al Sistema</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* 2. Agregamos la ruta dinámica con el parámetro :id */}
          <Route path="/mascota/:id" element={<Detalle />} /> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;