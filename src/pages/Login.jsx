import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import db from "../data/db.json";

const Login = () => {
  
  const [isRegistering, setIsRegistering] = useState(false); // Toggle entre Login y Registro
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  
  const obtenerUsuarios = () => {
    const usuariosLocales = localStorage.getItem('usuarios');
    if (usuariosLocales) {
      return JSON.parse(usuariosLocales);
    }
    
    localStorage.setItem('usuarios', JSON.stringify(db.usuarios));
    return db.usuarios;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMensajeExito("");

    const usuariosActuales = obtenerUsuarios();

    if (isRegistering) {
     
      const existeUsuario = usuariosActuales.find(u => u.username === username);
      if (existeUsuario) {
        setError("Ese nombre de usuario ya está en uso. Elegí otro.");
        return;
      }

      
      const nuevoUsuario = {
        id: Date.now(),
        nombre,
        username,
        password,
        rol: "comun"
      };

      
      const nuevaListaUsuarios = [...usuariosActuales, nuevoUsuario];
      localStorage.setItem('usuarios', JSON.stringify(nuevaListaUsuarios));
      
      setMensajeExito("¡Registro exitoso! Ya podés iniciar sesión con tus datos.");
      setIsRegistering(false); 
      setUsername("");
      setPassword("");
      
    } else {
      
      const userEncontrado = usuariosActuales.find(
        (u) => u.username === username && u.password === password
      );

      if (userEncontrado) {
        login(userEncontrado);
        navigate("/");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "30px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif" }}>
      
<h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
  {isRegistering ? "Crear una Cuenta en PetMatch" : "Iniciar Sesión en PetMatch"}
</h2>

      
      {error && <div style={{ backgroundColor: "#f8d7da", color: "#721c24", padding: "10px", borderRadius: "4px", marginBottom: "15px", textAlign: "center", fontSize: "0.9rem" }}>{error}</div>}
      {mensajeExito && <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "10px", borderRadius: "4px", marginBottom: "15px", textAlign: "center", fontSize: "0.9rem" }}>{mensajeExito}</div>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        
        {isRegistering && (
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>Nombre y Apellido</label>
            <input type="text" placeholder="Ej: Juan Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ width: "95%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
          </div>
        )}

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>Usuario</label>
          <input type="text" placeholder={isRegistering ? "Crea un usuario" : "Tu usuario"} value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: "95%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#555" }}>Contraseña</label>
          <input type="password" placeholder={isRegistering ? "Crea una contraseña" : "Tu contraseña"} value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "95%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }} />
        </div>

        <button type="submit" style={{ marginTop: "10px", padding: "12px", backgroundColor: isRegistering ? "#28a745" : "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>
          {isRegistering ? "Registrarme" : "Ingresar"}
        </button>
      </form>

      
      <div style={{ textAlign: "center", marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
        <p style={{ margin: "0 0 10px 0", color: "#666", fontSize: "0.9rem" }}>
          {isRegistering ? "¿Ya tenés cuenta?" : "¿No tenés cuenta?"}
        </p>
        <button 
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError("");
            setMensajeExito("");
          }} 
          style={{ background: "none", border: "none", color: "#007BFF", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}
        >
          {isRegistering ? "Iniciá sesión acá" : "Registrate acá"}
        </button>
      </div>

    </div>
  );
};

export default Login;