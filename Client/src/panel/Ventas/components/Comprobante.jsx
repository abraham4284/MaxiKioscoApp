import React from 'react'

export const Comprobante = ({ carrito }) => {

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 d-flex justify-content-center">
              Fecha: <span>{}</span>           
              Cliente: <span>{}</span>          
        </div>
        <div className="col mt-3">
           <table className="table">
            <thead>
              <tr>
                <th scope='col'>Producto</th>
                <th scope='col'>PrecioU</th>
                <th scope='col'>Cantidad</th>
                <th scope='col'>Total</th>
              </tr>
            </thead>
            <tbody>
               {
                 (carrito) ? (
                  carrito.map(datos=>(
                    <tr key={datos.idRegistraciones}>
                       <th>{datos.Productos}</th>
                       <th>{datos.PrecioU}</th>
                       <th>{datos.Cantidad}</th>
                       <th>{datos.SubTotal}</th>
                    </tr>
                  ))
                 ):(
                  <td>No hay datos</td>
                 )
               }
            </tbody>
           </table>
        </div>
      </div>
    </div>
  )
}
