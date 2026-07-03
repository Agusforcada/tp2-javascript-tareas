import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <nav style={{ padding: '15px 20px', backgroundColor: '#222', color: 'white', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px' }}>
      
      
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        
        
        <Link to="/" style={{ color: '#28a745', textDecoration: 'none', fontWeight: '900', fontSize: '1.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          PetMatch 🐾
        </Link>
        
        
        
        {user && (
          <Link to="/solicitudes" style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
            {user.rol === 'admin' ? 'Gestión de Solicitudes (Admin)' : 'Mis Solicitudes'}
          </Link>
        )}
      </div>

      
      <div>
        {user ? (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#ccc' }}>
              Hola, <strong>{user.nombre}</strong>
            </span>
            <button 
              onClick={handleLogout} 
              style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
            Ingresar al Sistema
          </Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;