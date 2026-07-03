import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "../data/db.json";

const Detalle = () => {
  
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    
    const mascotasLocales = JSON.parse(localStorage.getItem('mascotas')) || db.mascotas;
    
    
    const mascotaEncontrada = mascotasLocales.find(m => m.id === parseInt(id));
    setMascota(mascotaEncontrada);
  }, [id]);

  
  if (!mascota) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "white" }}>Ups... No encontramos a este animalito.</h2>
        <Link to="/" style={{ color: "#28a745", fontWeight: "bold" }}>Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "30px", backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.15)", fontFamily: "Arial, sans-serif" }}>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
        
        
        <div style={{ flex: "1 1 350px" }}>
          <img 
            src={mascota.imagen} 
            alt={mascota.nombre} 
            style={{ width: "100%", height: "100%", maxHeight: "400px", borderRadius: "8px", objectFit: "cover", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} 
          />
        </div>
        
        
        <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          
          <h2 style={{ fontSize: "3rem", color: "#28a745", margin: "0 0 15px 0", letterSpacing: "-1px" }}>
            {mascota.nombre}
          </h2>
          
          
          <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", borderLeft: "5px solid #007BFF", marginBottom: "25px" }}>
            <p style={{ margin: "8px 0", fontSize: "1.2rem", color: "#222" }}><strong>Especie:</strong> {mascota.especie}</p>
            <p style={{ margin: "8px 0", fontSize: "1.2rem", color: "#222" }}><strong>Edad:</strong> {mascota.edad}</p>
            <p style={{ margin: "8px 0", fontSize: "1.2rem", color: "#222" }}><strong>Tamaño:</strong> {mascota.tamano}</p>
            <p style={{ margin: "8px 0", fontSize: "1.2rem", color: "#222" }}><strong>Estado:</strong> <span style={{ color: "#007BFF", fontWeight: "bold", textTransform: "uppercase" }}>{mascota.estado}</span></p>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px", color: "#333", fontSize: "1.5rem", marginTop: "0" }}>
              Sobre {mascota.nombre}
            </h3>
            <p style={{ color: "#444", lineHeight: "1.8", fontSize: "1.1rem" }}>
              {mascota.descripcion}
            </p>
          </div>

          <Link to="/" style={{ alignSelf: "flex-start", padding: "12px 25px", backgroundColor: "#6c757d", color: "white", textDecoration: "none", borderRadius: "5px", fontWeight: "bold", fontSize: "1.1rem", transition: "0.2s" }}>
            ← Volver al Catálogo
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Detalle;