import { useState, useEffect } from "react";

const FormularioMascota = ({ onGuardar, mascotaAEditar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    especie: "Perro",
    edad: "", 
    tamano: "Pequeño",
    descripcion: "",
    imagen: ""
  });

  useEffect(() => {
    if (mascotaAEditar) {
      setFormData(mascotaAEditar);
    } else {
      setFormData({ nombre: "", especie: "Perro", edad: "", tamano: "Pequeño", descripcion: "", imagen: "" });
    }
  }, [mascotaAEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div style={{ padding: "20px", border: "2px solid #28a745", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h3>{mascotaAEditar ? "Editar Mascota" : "Agregar Nueva Mascota"}</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input placeholder="Nombre" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
        <input placeholder="Edad (ej: 6 meses, 3 años)" value={formData.edad} onChange={(e) => setFormData({...formData, edad: e.target.value})} required />
        <input placeholder="URL de la imagen" value={formData.imagen} onChange={(e) => setFormData({...formData, imagen: e.target.value})} required />
        <textarea placeholder="Descripción" value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} required />
        
        <div style={{ display: "flex", gap: "10px" }}>
          <select value={formData.especie} onChange={(e) => setFormData({...formData, especie: e.target.value})}>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
          </select>
          <select value={formData.tamano} onChange={(e) => setFormData({...formData, tamano: e.target.value})}>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit" style={{ padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>Guardar</button>
          <button type="button" onClick={onCancelar} style={{ padding: "10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px" }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default FormularioMascota;


