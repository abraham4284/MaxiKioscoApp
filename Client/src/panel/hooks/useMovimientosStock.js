import { getMovimientosRequest } from "@/api";
import { useState } from "react";

export const useMovimientosStock = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMovimientos = async () => {
    try {
      const { data } = await getMovimientosRequest();
      if (data.status === "OK") {
        setMovimientos(data.data);
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.log({
        error: error,
        errorCompleto: error,
        message: "Error en getMovimientos InformesStockCritico.jsx",
      });
    }
  };

  const resetMovimientos = () =>{
    setMovimientos([]);
  }

  return { movimientos, loading, error, getMovimientos,resetMovimientos };
};
