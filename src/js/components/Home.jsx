import React from "react";
import PossIt from "./PossIt";
import { createUser } from "../../api/api";
import { useEffect, useState } from "react";
//include images into your bundle

//create your first component
const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    createUser()
      .then((user) => setUser(user))

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de tareas</h1>
      <PossIt />
    </div>
  );
};

export default Home;