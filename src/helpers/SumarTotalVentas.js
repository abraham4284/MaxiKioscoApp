export const sumarTotales = (ventas = []) => {
  try {
    if (!ventas) return;
    let Total = 0;
    for (let i = 0; i < ventas.length; i++) {
      let { Cantidad, Precio } = ventas[i];
      let resultado = Cantidad * Precio;
      Total += resultado;
    }

    return {
      Total,
    };
  } catch (error) {
    console.log(error.message);
    console.log("Error en sumar ventas");
  }
};

