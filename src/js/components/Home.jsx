import React, { useEffect, useState } from "react";
import PossIt from "./PossIt";
import { getTareas } from "../../api/api"; // Importamos getTareas

const Home = () => {
  const [tareas, setTareas] = useState([]);

    useEffect(() => {
    const cargarTodo = async () => {
      const lista = await getTareas();
      setTareas(lista);
    };
    cargarTodo();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5">Lista de tareas</h1>
      {/* Pasamos las tareas a PossIt para que las pinte */}
      <PossIt tareas={tareas} setTareas={setTareas} />
    </div>
  );
};

export default Home;