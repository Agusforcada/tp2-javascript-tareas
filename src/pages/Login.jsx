import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import db from "../data/db.json"; 
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Por favor, completá todos los campos antes de ingresar.");
      return;
    }

    const usuarioEncontrado = db.usuarios.find(
      (u) => u.username === username && u.password === password
    );

    if (usuarioEncontrado) {
      setError(""); 
      login(usuarioEncontrado); 
      alert(`¡Bienvenido ${usuarioEncontrado.nombre}! (Rol: ${usuarioEncontrado.rol})`);
      navigate("/"); 
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Iniciar Sesión</h2>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Usuario:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "95%", padding: "8px" }}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "95%", padding: "8px" }}
          />
        </div>

        {error && <p style={{ color: "red", margin: "0", fontSize: "14px" }}>{error}</p>}

        <button type="submit" style={{ padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;