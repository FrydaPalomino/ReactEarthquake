import React from "react";
import "./App.css";
import "./components/Table";
import TableComponent from "./components/Table";
import "./css/Home.css";

function Home() {
  return (
    <div class="containerPrincipal">
      <h1>Hola Frogmi family!</h1>
      <p>Empezaremos a visualizar los datos</p>
      <TableComponent />
    </div>
  );
}

export default Home;
