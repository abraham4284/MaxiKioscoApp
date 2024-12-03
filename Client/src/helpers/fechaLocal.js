export const fechaLocal = () => {
  try {
    let hoy = new Date();
    hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
    let HoyfechaLocal = hoy.toISOString().slice(0, 10);

    return {
      HoyfechaLocal,
    };
  } catch (error) {
    console.log({
      error: error.message,
      message: "Error en fechaLocal /helpers",
    });
  }
};

export const formatearFechas = (fecha) => {
  if (!fecha) return;
  const fechaFormateada = new Date(fecha);
  const dia = String(fechaFormateada.getDate() + 1).padStart(2, "0");
  const mes = String(fechaFormateada.getMonth() + 1).padStart(2, "0");
  const anio = fechaFormateada.getFullYear();

  return `${dia}/${mes}/${anio}`;
};
