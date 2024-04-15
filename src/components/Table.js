import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination } from "react-bootstrap";
import "../css/Table.css";

const TableComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  // Pagination properties
  const itemsPerPage = 1; // Number of items per page
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  useEffect(() => {
    // Hacer la solicitud a la API cuando el componente se monta
    fetch("http://127.0.0.1:4567/api/features")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data["data"]);
      })
      .catch((error) =>
        console.error("Error al obtener datos de la API:", error)
      );
  }, []); // El segundo argumento [] asegura que este efecto solo se ejecute una vez cuando el componente se monta

  useEffect(() => {
    // Realizar una solicitud a la API cuando el filtro cambie
    // Asegúrate de ajustar la URL y los parámetros de la API según tu caso específico
    fetch(
      `http://127.0.0.1:4567/api/features?filter=${filter}&pagina=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Actualizar los datos de la tabla con la respuesta de la API
        setTableData(data["data"]);
      })
      .catch((error) =>
        console.error("Error al obtener datos de la API:", error)
      );
  }, [filter, currentPage]); // Ejecutar el efecto cuando el filtro cambie

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Calculate start and end index of items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, tableData.length);

  // Filter data for current page
  const currentItems = tableData.slice(startIndex, endIndex);

  const handleClickEdit = (data) => {
    navigate("/edit", { state: data });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Favor colocar el mag type"
        value={filter}
        onChange={handleFilterChange}
      />
      <br />
      <br />
      <Table striped bordered hover className="mi-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Place</th>
            <th>Mag type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.attributes.title}</td>
              <td>{item.attributes.place}</td>
              <td>{item.attributes.mag_type}</td>
              <td>
                <button
                  className="mi-boton"
                  onClick={() => handleClickEdit(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="mi-pagination">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
};

export default TableComponent;
