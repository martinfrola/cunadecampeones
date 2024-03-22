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
import { getAllEquipos } from "../api/equipos";
import TablaPosiciones from "./TablaPosiciones";

export default function Posiciones() {
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState("Todas");
  const [equiposFiltrados, setEquiposFiltrados] = useState([]);
  const [changeAuto, setChangeAuto] = useState(0);

  useEffect(() => {
    setLoading(true);
    getAllEquipos().then((res) => {
      const equiposAgrupados = agruparPorDosPropiedades(res, 'category', 'zona');
    const equiposOrdenados = Object.entries(equiposAgrupados).map(([key, equipos]) => ({ category: key, equipos }));
    equiposOrdenados.sort((a, b) => a.category.localeCompare(b.category)); // Ordenar alfabéticamente por category
    setEquiposFiltrados(equiposOrdenados);
    setLoading(false);
    });
  }, []);

  const agruparPorDosPropiedades = (array, prop1, prop2) => {
    return array.reduce((acc, equipo) => {
      const key = equipo[prop1] + " Zona " + equipo[prop2];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(equipo);
      return acc;
    }, {});
  };

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
