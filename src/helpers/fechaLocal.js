export const fechaLocal = () => {
  try {
    const ahoraUTC = new Date();
    const zonaHorariaOffset = -3;
    ahoraUTC.setHours(ahoraUTC.getHours() + zonaHorariaOffset);

    const HoyfechaLocal = ahoraUTC.toISOString().slice(0, 10);
    return { HoyfechaLocal };
  } catch (error) {
    console.log({
      error: error.message,
      message: "Error en fechaLocal /helpers",
    });
  }
};
