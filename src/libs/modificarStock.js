import { pool } from "../db.js";
import Big from "big.js";

export const modificarStockVenta = async (idProductos, Stock) => {
  try {
    const product = await pool.query(
      "SELECT Stock FROM productos WHERE idProductos = ?",
      [idProductos]
    );
    const stockActual = product[0][0].Stock;
    const stockBaja = Stock;
    const resultadoFinal = stockActual - stockBaja;

    // Mandamos a modificar el stock
    await pool.query("UPDATE productos SET Stock = ? WHERE idProductos = ?", [
      resultadoFinal,
      idProductos,
    ]);
    console.log("stock modificado");
  } catch (error) {
    console.log({ error: error.message });
    console.log("error en libs");
  }
};

export const modificarStockVentaTransaction = async (
  idProductos,
  Stock,
  conn
) => {
  try {
    const product = await conn.query(
      "SELECT Stock FROM productos WHERE idProductos = ?",
      [idProductos]
    );
    const stockActual = product[0][0].Stock;
    const stockBaja = Stock;
    const resultadoFinal = stockActual - stockBaja;

    // Mandamos a modificar el stock
    await conn.query("UPDATE productos SET Stock = ? WHERE idProductos = ?", [
      resultadoFinal,
      idProductos,
    ]);
    console.log("stock modificado");
  } catch (error) {
    console.log({ error: error.message });
    console.log("error en libs");
  }
};

export const modificarStockTransaction = async (
  idProductos,
  newStock,
  afectedStock,
  conn
) => {
  try {
    const [result] = await conn.query(
      "SELECT Stock FROM productos WHERE idProductos = ?",
      [idProductos]
    );
    const stock = result[0].Stock;

    const newStockBig = new Big(newStock);
    const stockBig = new Big(stock);
    let resultadStock = 0;

    switch (afectedStock) {
      case "suma":
        resultadStock = newStockBig.plus(stockBig);
        break;
      case "resta":
        resultadStock = stockBig.minus(newStockBig);
        break;
      default:
        break;
    }

    // Edito el stock
    const [resultUpdate] = await conn.query(
      "UPDATE productos SET Stock = ? WHERE idProductos = ?",
      [resultadStock.toString(), idProductos]
    );

    if (resultUpdate.affectedRows === 0) {
      return {
        status: "ERROR",
        message: "Error al actualizar el producto",
      };
    }

    return {
      status: "OK",
      message: " Stock modificado correctamente",
    };
  } catch (error) {
    console.log({ error: error.message });
    console.log("error en modificarStockTransaction");
  }
};
