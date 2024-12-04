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

const fecha = fechaLocal();

console.log(fecha)