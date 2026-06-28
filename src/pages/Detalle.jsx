import { useParams, Link } from "react-router-dom";
import db from "../data/db.json";

const Detalle = () => {
  // useParams captura el ID que viaja en la URL (ej: /mascota/1)
  const { id } = useParams();
  
  // Buscamos la mascota en nuestro JSON que coincida con ese ID
  // Ojo: el id de la URL es un string, por eso lo pasamos a número con parseInt
  const mascota = db.mascotas.find((m) => m.id === parseInt(id));

  // Si alguien pone un ID que no existe en la URL, mostramos esto:
  if (!mascota) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Mascota no encontrada</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "20px", textDecoration: "none", color: "#007BFF", fontWeight: "bold" }}>
        ← Volver al catálogo
      </Link>
      
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <img 
          src={mascota.imagen} 
          alt={mascota.nombre} 
          style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }} 
        />
        <h2 style={{ fontSize: "28px", marginTop: "15px" }}>{mascota.nombre}</h2>
        
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px", color: "#555" }}>
          <span><strong>Especie:</strong> {mascota.especie}</span>
          <span><strong>Edad:</strong> {mascota.edad}</span>
          <span><strong>Tamaño:</strong> {mascota.tamano}</span>
        </div>
        
        <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#333" }}>
          {mascota.descripcion}
        </p>
        
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "6px", borderLeft: "4px solid #28a745" }}>
          <strong>Estado actual:</strong> {mascota.estado}
        </div>
      </div>
    </div>
  );
};

export default Detalle;