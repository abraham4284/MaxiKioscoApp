import React, { useState } from 'react'
import { Navbar } from '../../../components/Navbar'
import { CardUsuarios } from '../components/CardUsuarios';

export const MiConfiguracion = () => {
    const [dataToEdit, setDataToEdit] = useState(null);

    return (
    <>

      <div className="container">
        <CardUsuarios
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
      </div>
    </>
  )
}
