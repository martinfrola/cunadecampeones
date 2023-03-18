import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { equiposData } from "../api/equipos";
import TablaPosiciones from "./TablaPosiciones";

export default function Posiciones() {
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState("Todas");
  const [equiposFiltrados, setEquiposFiltrados] = useState([]);
  const [changeAuto, setChangeAuto] = useState(0);
  useEffect(() => {
    setLoading(true);
    equiposData().then((res) => {
      const u14f1 = res.filter(
        (equipo) => equipo.category === "U-14 F" && equipo.zona === 1
      );
      const u14f2 = res.filter(
        (equipo) => equipo.category === "U-14 F" && equipo.zona === 2
      );
      const u14m1 = res.filter(
        (equipo) => equipo.category === "U-14 M" && equipo.zona === 1
      );
      const u14m2 = res.filter(
        (equipo) => equipo.category === "U-14 M" && equipo.zona === 2
      );
      const u14m3 = res.filter(
        (equipo) => equipo.category === "U-14 M" && equipo.zona === 3
      );
      const u14m4 = res.filter(
        (equipo) => equipo.category === "U-14 M" && equipo.zona === 4
      );
      const u16f = res.filter((equipo) => equipo.category === "U-16 F");
      const u17m = res.filter((equipo) => equipo.category === "U-17 M");
      const u18f = res.filter((equipo) => equipo.category === "U-18 F");

      setEquiposFiltrados([
        { category: "U-14 F Zona 1", equipos: u14f1 },
        { category: "U-14 F Zona 2", equipos: u14f2 },
        { category: "U-14 M Zona 1", equipos: u14m1 },
        { category: "U-14 M Zona 2", equipos: u14m2 },
        { category: "U-14 M Zona 3", equipos: u14m3 },
        { category: "U-14 M Zona 4", equipos: u14m4 },
        { category: "U-16 F", equipos: u16f },
        { category: "U-17 M", equipos: u17m },
        { category: "U-18 F", equipos: u18f },
      ]);

      setLoading(false);
    });
  }, []);

  const changeCategoria = (val) => {
    if (val === "Auto") {
      setCategoria(val);
      const tablasInterval = setInterval(() => {
        setChangeAuto((t) => {
          if (t < equiposFiltrados.length - 1) {
            return t + 1;
          } else {
            return 0;
          }
        });
      }, 15000);
      return () => {
        clearInterval(tablasInterval);
      };
    } else {
      setCategoria(val);
    }
  };

  const compareEquipos = (a, b) => {
    const difA = a.puntos_favor - a.puntos_contra;
    const difB = b.puntos_favor - b.puntos_contra;

    if (a.puntos < b.puntos) {
      return 1;
    } else if (a.puntos > b.puntos) {
      return -1;
    }

    if (difA < difB) {
      return 1;
    } else if (difA > difB) {
      return -1;
    } else {
      return 0;
    }
  };

  equiposFiltrados.forEach((lista) => {
    lista.equipos.sort(compareEquipos);
  });

  return (
    <div>
      <Box sx={{ marginRight: 5 }}>
        <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoria}
          label="Categoría"
          onChange={(e) => changeCategoria(e.target.value)}
        >
          <MenuItem value="Todas">Todas</MenuItem>
          <MenuItem value="Auto">Cambio Automático</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={5} sx={{ justifyContent: "center" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {equiposFiltrados.length > 0 && categoria === "Auto" && (
              <Grid item lg={6} md={12} sx={{ justifyContent: "center" }}>
                <Typography variant="h5">
                  {equiposFiltrados[changeAuto].category}
                </Typography>{" "}
                <TablaPosiciones
                  equipos={equiposFiltrados[changeAuto].equipos}
                />
              </Grid>
            )}
            {equiposFiltrados.length > 0 &&
              categoria !== "Auto" &&
              equiposFiltrados.map((tabla) => (
                <Grid
                  item
                  lg={6}
                  md={12}
                  sx={{ justifyContent: "center", maxWidth: "100%" }}
                  key={tabla.category}
                >
                  <Typography variant="h5">{tabla.category}</Typography>{" "}
                  <TablaPosiciones equipos={tabla.equipos} />
                </Grid>
              ))}
          </>
        )}
      </Grid>
    </div>
  );
}
