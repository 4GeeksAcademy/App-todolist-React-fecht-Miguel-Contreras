const apiUrl = "https://playground.4geeks.com/todo";
const user = "MiguelC";

export const getUser = async (user) => {
  try {
    const response = await fetch(`${apiUrl}/users/${user}`);
    
    if (response.ok) {
      // El usuario existe, devolvemos sus datos
      return await response.json();
    } else if (response.status === 404) {
      // El usuario NO existe, lo creamos
      console.log("Usuario no encontrado, creando usuario");
      return await createUser(username);
    } else {
      throw new Error(`Error inesperado: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al obtener/validar usuario:", error);
  }
};

export const createUser = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/MiguelC`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("El usuario ya existe o hubo un problema:", response.status);

      throw new Error("Error al crear el usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error de red:", error);
  }
};

export const getTareas = async () => {
  const response = await fetch(`${apiUrl}/users/${user}`);
  if (response.ok) {
    const data = await response.json();
    return data.todos; // Importante: devolvemos la propiedad .todos
  } else if (response.status === 404) {
    await createUser(); // Si no existe, lo crea
    return [];
  }
};

export const addTarea = async (texto) => {
  const response = await fetch(`${apiUrl}/todos/${user}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: texto, is_done: false }), // Formato obligatorio
  });
  return response.ok;
};

export const deleteTareaApi = async (id) => {
  const response = await fetch(`${apiUrl}/todos/${id}`, { method: "DELETE" });
  return response.ok;
};
