import PDF from "pdfkit-construct";
import { pool } from "../db.js";
import { formatearTotal } from "../helpers/FormatearTotal.js";

export const generadorTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const queryRegistracionesSelect = `
    SELECT * FROM registraciones WHERE idRegistraciones = ?
    `;
    const queryDetalleRegistraciones = `
    SELECT detalle_registraciones.idDetalleRegistraciones, detalle_registraciones.Fecha, productos.descripcion, detalle_registraciones.PrecioUni, detalle_registraciones.Cantidad,
    detalle_registraciones.Total, detalle_registraciones.idRegistraciones, detalle_registraciones.idProductos, detalle_registraciones.idClientes
    FROM detalle_registraciones
    LEFT JOIN productos ON productos.idproductos = detalle_registraciones.idproductos
    WHERE detalle_registraciones.idRegistraciones = ?;
    `;
    const querySelectClientes = `
    SELECT * FROM clientes WHERE idClientes = ?
    `;

    const queryNegocio = `
    SELECT * FROM negocios WHERE idUsuarios = ?
    `;

    const [registraciones] = await pool.query(queryRegistracionesSelect, [id]);
    const [detalles] = await pool.query(queryDetalleRegistraciones, [id]);

    const { NFactura, Fecha, Total, idUsuarios, idClientes } =
      registraciones.length > 0 ? registraciones[0] : {};

    const [clientes] = await pool.query(querySelectClientes, [idClientes]);
    const [negocios] = await pool.query(queryNegocio, [idUsuarios]);

    const clienteResult =
      clientes.length > 0
        ? `${clientes[0].Apellido} ${clientes[0].Nombre}`
        : "Consumidor Final";

    const nombreNegocio = negocios.length > 0 ? negocios[0].Nombre : "";

    const doc = new PDF({
      bufferPages: true,
      size: [226, 600], // Tamaño para papel de 80mm de ancho, altura ajustable
      margins: { top: 10, bottom: 10, left: 10, right: 10 }, // Márgenes pequeños
    });

    // Configurar la cabecera de respuesta para enviar el PDF
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${NFactura}.pdf`,
    });

    doc.pipe(res);

    const detallesData = detalles.map((el) => {
      return {
        Descripcion: el.descripcion,
        PrecioUni: formatearTotal(el.PrecioUni),
        Cantidad: el.Cantidad,
        SubTotal: formatearTotal((el.Cantidad * el.PrecioUni).toFixed(2)),
      };
    });

    // Añadir contenido al PDF
    doc.setDocumentHeader(
      {
        height: "10%",
      },
      () => {
        doc.fontSize(10).text(`${nombreNegocio}`, {
          width: 206,
          align: "center",
        });

        doc.moveDown(0.1);
        doc.fontSize(8);

        doc.text(`Nº: ${NFactura}`, {
          width: 206,
          align: "left",
        });

        doc.moveDown(0.3); // Añadir espacio después de NFactura

        doc.text(`Fecha: ${Fecha}`, {
          width: 206,
          align: "left",
        });

        doc.moveDown(0.3); // Añadir espacio después de Fecha

        doc.text(`Cliente: ${clienteResult}`, {
          width: 206,
          align: "left",
        });

        doc.moveDown(0.3); // Añadir espacio después de Cliente

        doc.text(`Total: ${formatearTotal(Total)}`, {
          width: 206,
          align: "left",
        });
      }
    );

    doc.addTable(
      [
        { key: "Descripcion", label: "Prod", align: "left" },
        { key: "PrecioUni", label: "P/U", align: "left" },
        { key: "Cantidad", label: "Cant", align: "left" },
        { key: "SubTotal", label: "SubTotal", align: "right" },
      ],
      detallesData,
      {
        border: null,
        width: "fill_body",
        striped: true,
        cellsPadding: 2,
        marginLeft: 5,
        marginRight: 5,
        headAlign: "center",
        headFont: "Helvetica-Bold",
        headFontSize: 7,
        bodyFontSize: 6,
        // Agrega un marginBottom para que el footer tenga espacio
      }
    );

    // Calcular el total de la venta

    doc.setDocumentFooter(
      {
        height: "10%",
      },
      () => {
        // Finalizar el documento añadiendo el total y el agradecimiento después de la tabla
        doc.text("Muchas gracias por su compra", 0, doc.page.height - 400, {
          align: "center",
          marginTop: 5,
        });

        doc.text(
          "</> AbrahamTech | Soluciones Tecnologicas",
          0,
          doc.page.height - 380,
          {
            align: "center",
            marginTop: 5,
          }
        );
      }
    );

    // Renderizar y finalizar el documento PDF
    doc.render();
    doc.end();
  } catch (error) {
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en generadorFacturas",
    });
  }
};
