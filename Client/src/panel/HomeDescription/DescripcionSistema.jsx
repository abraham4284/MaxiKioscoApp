import React from "react";

export const DescripcionSistema = () => {

    const color = {
        color: "rgba(223, 84, 82, 1)",
        fill: "rgba(223, 84, 82, 1)"
    }


  return (
    <div className="row">
      <div className="col mt-5 ">
        <div className="cont-text ">
          <h1>Descripcion del sistema</h1>
          <p>
            El sistema MaxiKiosco es una herramienta esencial para la gestión
            eficiente de este tipo de negocio. Proporciona una plataforma
            centralizada para almacenar y gestionar datos relacionados con
            productos, clientes, proveedores y transacciones.
          </p>
          <h3>Funcionalidades</h3>
          <ol>
            <li className="mb-3">
              <b style={color}>Gestión de Productos</b>: El sistema almacena información
              detallada sobre los productos disponibles en el MaxiKiosco,
              incluyendo su descripción, precio, stock, familia, código de
              barras y proveedor. Esto facilita la gestión del inventario y la
              reposición de productos cuando sea necesario.
            </li>
            <li className="mb-3">
              <b style={color}>Registro de Clientes</b>: Permite mantener un registro de los
              clientes, incluyendo datos como nombre, CUIT, dirección y correo
              electrónico. Esto facilita el seguimiento de las preferencias de
              los clientes y el envío de promociones y ofertas.
            </li>
            <li className="mb-3">
              <b style={color}>Registro de Proveedores</b>: El sistema registra información
              sobre los proveedores, como número de CUIT, nombre, dirección y
              correo electrónico. Esto facilita la gestión de relaciones con
              proveedores y el seguimiento de las fuentes de productos.
            </li>
            <li className="mb-3">
              <b style={color}>Gestión de Transacciones</b>: Registra todas las transacciones
              y ventas realizadas en el MaxiKiosco. Esto incluye detalles como
              la fecha de la transacción, los productos vendidos, la cantidad
              vendida, el precio unitario y el cliente involucrado. Facilita el
              seguimiento de ventas y la generación de informes.
            </li>
            <li className="mb-3">
              <b style={color}>Control de Stock</b>: El sistema realiza un seguimiento en
              tiempo real del stock de productos. Se actualiza automáticamente
              cuando se realizan ventas o compras a proveedores. Esto ayuda a
              evitar la falta de productos o el exceso de inventario.
            </li>
            <li className="mb-3">
              <b style={color}>Interfaz de Usuario Amigable</b>: Ofrece una interfaz fácil de
              usar para que el personal del MaxiKiosco pueda registrar
              transacciones y administrar productos y clientes de manera
              eficiente.
            </li>
            <li className="mb-3">
              <b style={color}>Generación de Informes</b> : Permite generar informes
              detallados sobre las ventas, inventario, compras y otros aspectos
              clave del negocio. Esto facilita la toma de decisiones.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
