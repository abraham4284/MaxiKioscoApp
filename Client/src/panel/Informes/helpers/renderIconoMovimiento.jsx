export const renderIconoMovimiento = (motivo) => {
  if (!motivo || typeof motivo !== "string") {
    return null; // o podés mostrar un icono por defecto
  }

  if (motivo.startsWith("+/-")) {
    return (
      <span className="badge bg-warning text-dark">
        <i className="fa-solid fa-arrows-rotate"></i> {motivo}
      </span>
    );
  } else if (motivo.startsWith("+")) {
    return (
      <span className="badge bg-success">
        <i className="fa-solid fa-arrow-trend-up"></i> {motivo}
      </span>
    );
  } else if (motivo.startsWith("-")) {
    return (
      <span className="badge bg-danger">
        <i className="fa-solid fa-arrow-trend-down"></i> {motivo}
      </span>
    );
  } else {
    return null;
  }
};
