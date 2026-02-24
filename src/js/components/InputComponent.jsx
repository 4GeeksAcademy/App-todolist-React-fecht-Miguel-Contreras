import { useState, useEffect } from "react";
import { getTareas, addTarea, deleteTareaApi } from "../../api/api";
import "./InputComponent.css"; // Asegúrate de que la ruta sea correcta

function InputComponent() {
  const [texto, setTexto] = useState("");
  const [listaTareas, setListaTareas] = useState([]);

  // Carga inicial al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getTareas();
    if (data) setListaTareas(data);
  };

  async function enviar(e) {
    e.preventDefault();
    if (texto.trim() === "") {
      alert("Por favor, escribe una tarea.");
      return;
    }

    const exito = await addTarea(texto);
    if (exito) {
      setTexto("");
      fetchData(); // Refrescamos desde el servidor
    }
  }
  // Refrescamos desde el servidor
  async function eliminarTarea(id) {
    const exito = await deleteTareaApi(id);
    if (exito) {
      fetchData(); 
    }
  }

  const limpiarTodo = async () => {
  try {
    // 1. Borramos el usuario (con la URL completa escrita)
    const response = await fetch("https://playground.4geeks.com/todo/users/MiguelC", {
      method: "DELETE",
    });

    // En esta API el borrado exitoso devuelve status 204
    if (response.ok || response.status === 204) {
      // 2. Recreamos el usuario inmediatamente
      await fetch("https://playground.4geeks.com/todo/users/MiguelC", {
        method: "POST",
      });

      // 3. Limpiamos el estado en el frontend
      setListaTareas([]);
      alert("¡Lista limpiada por completo!");
    }
  } catch (error) {
    console.error("Error al limpiar:", error);
  }
};

  return (
    <div className="text-center">
      <form onSubmit={enviar}>
        <input
          type="text"
          placeholder="insertar tarea"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </form>
      
      <div className="lista">
        <div className="contador-tareas">
          <p>Total de tareas: {listaTareas.length}</p>
        </div>
        <div>
        <button className="btn-limpiar" onClick={limpiarTodo}>
  Limpiar todas las tareas
</button>
      </div>

        {listaTareas.length === 0 ? (
          <p>No hay tareas por hacer</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {listaTareas.map((tarea) => (
              <li key={tarea.id} className="tarea-container">
                {/* IMPORTANTE: Usamos .label porque así lo guarda la API */}
                <span>{tarea.label}</span>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarTarea(tarea.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default InputComponent;