import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { NegociosProvider } from "./context/NegociosContext";
import { ProductosProvider } from "./context/ProductosContext";

export const MaxiKioscoApp = () => {
  return (
    <AuthProvider>
      <ProductosProvider>
        <NegociosProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </NegociosProvider>
      </ProductosProvider>
    </AuthProvider>
  );
};
