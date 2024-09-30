import { descargarTicketRequest } from "../api/comprobantes/ticket.api";

export const descargarTiket = async (idRegistraciones, NFactura) => {
  try {
    const { data } = await descargarTicketRequest(idRegistraciones);
    if (!data) {
      console.log(data);
    } else {
      const blob = new Blob([data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${NFactura}.pdf`);
      document.body.appendChild(link);

      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en descargarTiket",
    });
  }
};
