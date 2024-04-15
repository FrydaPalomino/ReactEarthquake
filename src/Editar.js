import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./css/Editar.css";

const EditData = () => {
  const location = useLocation();
  const data = location.state;
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClick = () => {
    fetch("http://127.0.0.1:4567/api/features", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        comment: filter,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hubo un problema al modificar la información.");
        }
        window.location.href = "/";

        // Si la solicitud es exitosa, puedes redirigir a la página de destino o realizar cualquier otra acción
        // Por ejemplo, navegar a la página de destino después de la modificación
      })
      .catch((error) => {
        console.error("Error al modificar la información:", error);
      });
  };

  return (
    <div class="containerPrincipal">
      <h2>Editar datos</h2>
      <br />
      <br />
      <form>
        <div>
          <label>ID:</label>
          <input type="text" defaultValue={data.id} readOnly />
        </div>
        <div>
          <label>URL:</label>
          <input type="text" defaultValue={data.links.external_url} readOnly />
        </div>
        <div>
          <label>Comentario:</label>
          <input
            type="text"
            placeholder="Favor colocar comentario"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        <button type="submit" onClick={() => handleClick()}>
          {isLoading ? "Cargando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default EditData;
