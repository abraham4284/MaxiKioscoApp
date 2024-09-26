import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { NegociosProvider } from "./context/NegociosContext";
import { ProductosProvider } from "./context/ProductosContext";
import { ClientesProvider } from "./context/ClientesContext";
import { RegistracionesProvider } from "./context/RegistracionesContext";
import { CarritoProvider } from "./context/CarritoContext";

export const MaxiKioscoApp = () => {
  return (
    <AuthProvider>
      <CarritoProvider>
        <RegistracionesProvider>
          <ClientesProvider>
            <ProductosProvider>
              <NegociosProvider>
                <BrowserRouter>
                  <AppRouter />
                </BrowserRouter>
              </NegociosProvider>
            </ProductosProvider>
          </ClientesProvider>
        </RegistracionesProvider>
      </CarritoProvider>
    </AuthProvider>
  );
};
