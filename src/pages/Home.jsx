import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import db from "../data/db.json";
import FormularioMascota from "../components/FormularioMascota"; // <-- 1. Importación

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [mascotas, setMascotas] = useState(() => {
    const localData = localStorage.getItem('mascotas');
    return localData ? JSON.parse(localData) : db.mascotas;
  });

  // 2. Nuevos estados para controlar el formulario
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mascotaAEditar, setMascotaAEditar] = useState(null);

  // ... (tu código de filtros, useEffect y estilos se mantienen igual) ...

  // Lógica para guardar (agregar o editar)
  const handleGuardar = (datos) => {
    if (mascotaAEditar) {
      // Edición
      setMascotas(mascotas.map(m => m.id === datos.id ? datos : m));
    } else {
      // Agregar
      setMascotas([...mascotas, { ...datos, id: Date.now() }]);
    }
    setMostrarForm(false);
    setMascotaAEditar(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* ... (tu barra de usuario y filtros) ... */}

      {/* 3. Botón para abrir el form */}
      {user?.rol === 'admin' && (
        <button onClick={() => { setMostrarForm(true); setMascotaAEditar(null); }} style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>
          + Agregar Nueva Mascota
        </button>
      )}

      {/* 4. Renderizado condicional del formulario */}
      {mostrarForm && (
        <FormularioMascota 
          onGuardar={handleGuardar} 
          mascotaAEditar={mascotaAEditar}
          onCancelar={() => setMostrarForm(false)}
        />
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {mascotas.map((m) => (
          <div key={m.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={m.imagen} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3><Link to={`/mascota/${m.id}`}>{m.nombre}</Link></h3>
            {user?.rol === 'admin' ? (
              <div style={{ display: "flex", gap: "5px" }}>
                {/* 5. Al clickear Editar, abrimos el form con los datos de la mascota */}
                <button onClick={() => { setMascotaAEditar(m); setMostrarForm(true); }}>Editar</button>
                <button onClick={() => handleEliminar(m.id)}>Eliminar</button>
              </div>
            ) : (
              <button>Adoptar</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};