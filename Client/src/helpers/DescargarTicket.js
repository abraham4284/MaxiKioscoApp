import { helpHttp } from "./helpHttp";

const URL = import.meta.env.VITE_BACKEND_URL;
const { get } = helpHttp();

export const descargarTiket = (idRegistraciones, NFactura) => {
    get(`${URL}/ticket/${idRegistraciones}`, { responseType: 'blob' })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          // Crear una URL para el blob
          const blob = new Blob([res], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
  
          // Crear un enlace para descargar el archivo
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${NFactura}.pdf`); // Nombre del archivo
          document.body.appendChild(link);
  
          // Hacer clic en el enlace para descargar el archivo
          link.click();
  
          // Limpiar el URL del objeto y el enlace
          link.remove();
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((err) => console.log(err));
  };