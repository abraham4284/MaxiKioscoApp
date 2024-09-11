export const formatearTotal = (value) => {
    if (value === undefined || value === null) return '';
    value = Number(value);
    return `${value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2, // Mantener dos decimales si los hay
      maximumFractionDigits: 2,
      currencyDisplay: "symbol" // Asegura que se muestre el símbolo de la moneda
    }).replace("ARS", "").trim()}`; // Elimina el código de moneda "ARS"
  };
  