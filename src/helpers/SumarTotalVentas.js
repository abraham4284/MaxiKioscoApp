export const sumarTotales = (ventas = []) => {
  try {
    if (!ventas) return;
    let Total = 0;
    for (let i = 0; i < ventas.length; i++) {
      let { Cantidad, PrecioU } = ventas[i];
      let resultado = Cantidad * PrecioU;
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
