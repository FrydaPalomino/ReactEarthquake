import React from "react";
import { Link } from "react-router-dom";

const TableRow = ({ rowData, isSelected, onClick }) => {
  return (
    <div className={`row ${isSelected ? "bg-light" : ""}`} onClick={onClick}>
      <div className="col">{rowData.id}</div>
      <div className="col">{rowData.name}</div>
      <div className="col">{rowData.age}</div>
      {/* Renderizar otros datos de la fila según tu estructura de datos */}
      <div className="col">
        <Link to={`/edit/${rowData.id}`} className="btn btn-primary">
          Edit
        </Link>
      </div>
    </div>
  );
};

export default TableRow;
