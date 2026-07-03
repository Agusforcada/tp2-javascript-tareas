import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import db from "../data/db.json";

const Solicitudes = () => {
  const { user } = useContext(AuthContext);
  
  
  const [solicitudes, setSolicitudes] = useState(() => {
    const localData = localStorage.getItem('solicitudes');
    return localData ? JSON.parse(localData) : (db.solicitudes || []);
  });

  
  useEffect(() => {
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
  }, [solicitudes]);

  
  if (!user) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Acceso denegado. Iniciá sesión.</h2>;
  }

  
  const solicitudesVisibles = user.rol === "admin" 
    ? solicitudes 
    : solicitudes.filter(s => s.idUsuario === user.id);

  
  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes(solicitudes.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s));
  };

  
  const eliminarSolicitud = (id) => {
    const mensaje = user.rol === "admin" 
      ? "¿Estás seguro de que querés eliminar definitivamente este registro del sistema?"
      : "¿Estás seguro de que querés cancelar tu solicitud de adopción?";
      
    if (window.confirm(mensaje)) {
      
      setSolicitudes(solicitudes.filter(s => s.id !== id));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ borderBottom: "2px solid #28a745", paddingBottom: "10px", color: "#333" }}>
        {user.rol === "admin" ? "Panel de Gestión de Solicitudes" : "Mis Solicitudes de Adopción"}
      </h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
        {solicitudesVisibles.map((solicitud) => (
          <div key={solicitud.id} style={{ border: "1px solid #e0e0e0", padding: "20px", borderRadius: "8px", backgroundColor: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#007BFF" }}>Mascota: {solicitud.mascotaNombre}</h3>
            <p style={{ margin: "5px 0", color: "#555" }}><strong>Interesado:</strong> {solicitud.nombreInteresado}</p>
            
            <div style={{ marginTop: "15px", marginBottom: "20px" }}>
              <span style={{ 
                padding: "6px 12px", 
                backgroundColor: solicitud.estado === "Aprobada" ? "#d4edda" : solicitud.estado === "Rechazada" ? "#f8d7da" : "#fff3cd", 
                color: solicitud.estado === "Aprobada" ? "#155724" : solicitud.estado === "Rechazada" ? "#721c24" : "#856404", 
                borderRadius: "4px", 
                fontWeight: "bold",
                border: "1px solid rgba(0,0,0,0.1)"
              }}>
                Estado: {solicitud.estado}
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px", borderTop: "1px solid #eee", paddingTop: "15px", flexWrap: "wrap" }}>
              
             
              {user.rol === "admin" && (
                <>
                  <button onClick={() => cambiarEstado(solicitud.id, "Aprobada")} style={{ padding: "8px 15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Aprobar</button>
                  <button onClick={() => cambiarEstado(solicitud.id, "Rechazada")} style={{ padding: "8px 15px", backgroundColor: "#ffc107", color: "#333", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Rechazar</button>
                  <button onClick={() => alert(`Abriendo chat con ${solicitud.nombreInteresado}...`)} style={{ padding: "8px 15px", backgroundColor: "#17a2b8", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Consultar al usuario</button>
                </>
              )}

              
              <button 
                onClick={() => eliminarSolicitud(solicitud.id)} 
                style={{ 
                  padding: "8px 15px", 
                  backgroundColor: "#dc3545", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "4px", 
                  cursor: "pointer", 
                  fontWeight: "bold",
                  
                  marginLeft: user.rol === "admin" ? "auto" : "0" 
                }}
              >
                {user.rol === "admin" ? "Eliminar Registro" : "Cancelar Solicitud"}
              </button>

            </div>
          </div>
        ))}

        {solicitudesVisibles.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "2px dashed #ccc" }}>
            <p style={{ color: "#666", fontSize: "1.1rem", margin: 0 }}>
              {user.rol === "admin" ? "No hay solicitudes pendientes en el sistema." : "Todavía no enviaste ninguna solicitud. ¡Animate a cambiar una vida!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solicitudes;