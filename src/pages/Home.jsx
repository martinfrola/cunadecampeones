import { Box, Button, Switch } from "@mui/material";
import React, { useState, useEffect } from "react";
import Partidos from "../components/Partidos";
import Resultados from "../components/Resultados";
import Posiciones from "../components/Posiciones";
import logo from "../assests/images/logo_cuna.jpeg";
import Footer from "../components/Footer";
const Home = () => {
  const [pageSelected, setPageSelected] = useState("partidos");
  const [activo, setActivo] = useState(false);

  function cambiarVista() {
    setPageSelected((pageSelected) =>
      pageSelected === "partidos" ? "resultados" : "partidos"
    );
  }
  useEffect(() => {
    let intervalo;
    if (activo) {
      intervalo = setInterval(() => {
        cambiarVista(), console.log("entro al interval");
      }, 60000);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  function handleSwitch() {
    setActivo(!activo);
  }
  return (
    <Box sx={{ marginX: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo cuna de campeones" width="120px" />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Switch checked={activo} onChange={handleSwitch} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 3,
        }}
      >
        <Button
          variant={pageSelected == "partidos" ? "contained" : "outlined"}
          color={pageSelected == "partidos" ? "primary" : "error"}
          onClick={() => setPageSelected("partidos")}
        >
          Partidos
        </Button>
        <Button
          variant={pageSelected == "resultados" ? "contained" : "outlined"}
          color={pageSelected == "resultados" ? "primary" : "error"}
          onClick={() => setPageSelected("resultados")}
        >
          Resultados
        </Button>
        <Button
          variant={pageSelected == "posiciones" ? "contained" : "outlined"}
          color={pageSelected == "posiciones" ? "primary" : "error"}
          onClick={() => setPageSelected("posiciones")}
        >
          Posiciones
        </Button>
      </Box>
      {pageSelected == "partidos" ? (
        <Partidos modoAuto={activo} />
      ) : pageSelected == "resultados" ? (
        <Resultados modoAuto={activo} />
      ) : (
        <Posiciones modoAuto={activo} />
      )}
      <Footer />
    </Box>
  );
};

export default Home;
