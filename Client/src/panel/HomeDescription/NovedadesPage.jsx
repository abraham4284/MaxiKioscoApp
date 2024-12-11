import React from "react";
import { Novedades } from "./components/Novedades";
import { novedades } from "../../constants/NovedadesSistema";

export const NovedadesPage = () => {
  return (
    <section>
      <Novedades data={novedades} />
    </section>
  );
};
