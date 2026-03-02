const apiUrl = "https://playground.4geeks.com/todo";
const user = "MiguelC";

export const createUser = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/${user}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error al crear usuario:", error);
  }
};

export const getTareas = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/${user}`);
    if (response.ok) {
      const data = await response.json();
      return data.todos; 
    } else if (response.status === 404) {
      // Si no existe, lo creamos en ese momento
      await createUser(); 
      return [];
    }
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return [];
  }
};

export const addTarea = async (texto) => {
  const response = await fetch(`${apiUrl}/todos/${user}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: texto, is_done: false }),
  });
  return response.ok;
};

export const deleteTareaApi = async (id) => {
  const response = await fetch(`${apiUrl}/todos/${id}`, { method: "DELETE" });
  return response.ok;
};