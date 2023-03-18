import React, { useState } from "react";
import AgregarEquipo from "../components/AgregarEquipo";
import AgregarPartido from "../components/AgregarPartido";
import AgregarResultado from "../components/AgregarResultado";
import { Box, Button } from "@mui/material";

const Admin = () => {
  const [pageSelected, setPageSelected] = useState("agregarResultado");
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 3,
        }}
      >
        <Button
          variant={pageSelected == "agregarEquipo" ? "contained" : "outlined"}
          color={pageSelected == "agregarEquipo" ? "primary" : "error"}
          onClick={() => setPageSelected("agregarEquipo")}
        >
          Agregar Equipo
        </Button>
        <Button
          variant={pageSelected == "agregarPartido" ? "contained" : "outlined"}
          color={pageSelected == "agregarPartido" ? "primary" : "error"}
          onClick={() => setPageSelected("agregarPartido")}
        >
          Agregar Partido
        </Button>
        <Button
          variant={
            pageSelected == "agregarResultado" ? "contained" : "outlined"
          }
          color={pageSelected == "agregarResultado" ? "primary" : "error"}
          onClick={() => setPageSelected("agregarResultado")}
        >
          Agregar Resultado
        </Button>
      </Box>
      {pageSelected == "agregarEquipo" ? (
        <AgregarEquipo />
      ) : pageSelected == "agregarPartido" ? (
        <AgregarPartido />
      ) : (
        <AgregarResultado />
      )}
    </div>
  );
};

export default Admin;
