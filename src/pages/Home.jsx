import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import db from "../data/db.json";
import FormularioMascota from "../components/FormularioMascota";

const Home = () => {
  const { user } = useContext(AuthContext);
  
  const [mascotas, setMascotas] = useState(() => {
    const localData = localStorage.getItem('mascotas');
    return localData ? JSON.parse(localData) : db.mascotas;
  });

  useEffect(() => {
    localStorage.setItem('mascotas', JSON.stringify(mascotas));
  }, [mascotas]);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [mascotaAEditar, setMascotaAEditar] = useState(null);

  const handleGuardar = (datos) => {
    if (mascotaAEditar) {
      setMascotas(mascotas.map(m => m.id === datos.id ? datos : m));
    } else {
      setMascotas([...mascotas, { ...datos, id: Date.now() }]);
    }
    setMostrarForm(false);
    setMascotaAEditar(null);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta mascota?")) {
      setMascotas(mascotas.filter(m => m.id !== id));
    }
  };

  const handleAdoptar = (mascota) => {
    if (!user) {
      alert("Debes iniciar sesión o registrarte para poder adoptar una mascota.");
      return;
    }

    const solicitudesGuardadas = JSON.parse(localStorage.getItem('solicitudes')) || db.solicitudes || [];
    
    const yaExiste = solicitudesGuardadas.find(s => s.mascotaId === mascota.id && s.idUsuario === user.id);
    if (yaExiste) {
      alert("Ya enviaste una solicitud para esta mascota. Podés hacer el seguimiento en 'Mis Solicitudes'.");
      return;
    }

    const nuevaSolicitud = {
      id: Date.now(),
      mascotaId: mascota.id,
      mascotaNombre: mascota.nombre,
      idUsuario: user.id,
      nombreInteresado: user.nombre,
      estado: "Pendiente de revisión"
    };

    localStorage.setItem('solicitudes', JSON.stringify([...solicitudesGuardadas, nuevaSolicitud]));
    alert(`¡Solicitud enviada con éxito para adoptar a ${mascota.nombre}!`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      
      
      <div style={{ textAlign: "center", marginBottom: "40px", padding: "30px", backgroundColor: "#e9ecef", borderRadius: "8px" }}>
        <h1 style={{ color: "#28a745", margin: "0 0 15px 0", fontSize: "2.5rem" }}>¡Bienvenido a PetMatch!</h1>        <p style={{ fontSize: "1.2rem", color: "#555", lineHeight: "1.6", margin: "0 auto", maxWidth: "800px" }}>
          Somos un refugio dedicado a conectar corazones. Nuestra misión es encontrar 
          familias llenas de amor para cada uno de los animalitos que rescatamos. 
          Explorá nuestro catálogo y animate a cambiarles la vida.
        </p>
      </div>

      <h2 style={{ borderBottom: "2px solid #28a745", paddingBottom: "10px", marginBottom: "20px" }}>Nuestro Catálogo</h2>

      {user?.rol === 'admin' && (
        <button 
          onClick={() => { setMostrarForm(true); setMascotaAEditar(null); }} 
          style={{ marginBottom: "20px", padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
        >
          + Agregar Nueva Mascota
        </button>
      )}

      {mostrarForm && (
        <FormularioMascota 
          onGuardar={handleGuardar} 
          mascotaAEditar={mascotaAEditar}
          onCancelar={() => setMostrarForm(false)}
        />
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
        {mascotas.map((m) => (
          <div key={m.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <img src={m.imagen} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }} alt={m.nombre} />
            <h3 style={{ margin: "15px 0 10px 0", fontSize: "1.5rem" }}>
              <Link to={`/mascota/${m.id}`} style={{ textDecoration: "none", color: "#007BFF" }}>{m.nombre}</Link>
            </h3>
            <p style={{ margin: "5px 0", color: "#555" }}><strong>Especie:</strong> {m.especie}</p>
            <p style={{ margin: "5px 0", color: "#555" }}><strong>Edad:</strong> {m.edad}</p>

            <div style={{ marginTop: "20px" }}>
              {user?.rol === 'admin' ? (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => { setMascotaAEditar(m); setMostrarForm(true); }} style={{ padding: "10px", backgroundColor: "#ffc107", border: "none", borderRadius: "4px", cursor: "pointer", flex: 1, fontWeight: "bold" }}>Editar</button>
                  <button onClick={() => handleEliminar(m.id)} style={{ padding: "10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", flex: 1, fontWeight: "bold" }}>Eliminar</button>
                </div>
              ) : (
                <button 
                  onClick={() => handleAdoptar(m)}
                  style={{ width: "100%", padding: "12px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}
                >
                  ¡Quiero Adoptarlo!
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;