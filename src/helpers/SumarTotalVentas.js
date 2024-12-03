export const sumarTotales = (ventas = []) => {
  try {
    if (!ventas) return;
    let TotalCosto = 0;
    let Total = 0;
    for (let i = 0; i < ventas.length; i++) {
      let { Cantidad, precioCosto, Precio } = ventas[i];
      let resultadoCosto = Cantidad * precioCosto;
      let resultadoVenta = Cantidad * Precio;
      TotalCosto += resultadoCosto
      Total += resultadoVenta;
    }

    return {
      TotalCosto,
      Total,
    };
  } catch (error) {
    console.log(error.message);
    console.log("Error en sumar ventas");
  }
};

