import React, { createRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getResultados } from "../api/resultados";
import PartidoCard from "./PartidoCard";
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

Resultados.propTypes = {
  modoAuto: PropTypes.bool,
};

export default function Resultados({ modoAuto }) {
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [resultadosSeleccionables, setResultadosSeleccionables] = useState([]);
  const [dia, setDia] = useState("Todos");
  const [categoria, setCategoria] = useState("Todas");
  const [equipos, setEquipos] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState("Todos");

  const ref = createRef();

  useEffect(() => {
    setLoading(true);
    getResultados().then((res) => {
      console.log(res);
      const newRes = res.filter((partido) => partido.category !== "U-10");
      setResultados(newRes);
      setResultadosSeleccionables(newRes);
      setLoading(false);
    });
    if (modoAuto) {
      setTimeout(() => {
        window.scrollTo(0, 180);
      }, 3000);
    }
    equiposData().then((res) => {
      setEquipos(res);
    });
  }, []);

  function compare(a, b) {
    if (a.formato_fecha < b.formato_fecha) {
      return 1;
    }
    if (a.formato_fecha > b.formato_fecha) {
      return -1;
    }
    return 0;
  }
  resultadosSeleccionables.sort(compare);

  useEffect(() => {
    if (equipoSeleccionado === "Todos") {
      if (dia !== "Todos" && categoria !== "Todas") {
        const filtradoDia = resultados.filter(
          (resultado) => resultado.fecha === dia
        );
        const filtradoFinal = filtradoDia.filter(
          (resultado) => resultado.category === categoria
        );
        setResultadosSeleccionables(filtradoFinal);
      } else if (dia === "Todos" && categoria !== "Todas") {
        const filtradoCategoria = resultados.filter(
          (resultado) => resultado.category === categoria
        );
        setResultadosSeleccionables(filtradoCategoria);
      } else if (dia !== "Todos" && categoria === "Todas") {
        const filtradoDia = resultados.filter(
          (resultado) => resultado.fecha === dia
        );
        setResultadosSeleccionables(filtradoDia);
      } else {
        setResultadosSeleccionables(resultados);
      }
    } else {
      const filtroNombre = resultados.filter(
        (partido) =>
          partido.equipo_local === equipoSeleccionado ||
          partido.equipo_visitante === equipoSeleccionado
      );
      setCategoria("Todas");
      setDia("Todos");
      setResultadosSeleccionables(filtroNombre);
    }
  }, [categoria, dia, equipoSeleccionado]);

  return (
    <Box>
      <Typography
        ref={ref}
        sx={{ textAlign: "center", fontWeight: "bold" }}
        variant="h4"
      >
        Resultados
      </Typography>
      {modoAuto && (
        <Typography sx={{ textAlign: "center" }}>
          Mirá todos los resultados en la web
        </Typography>
      )}

      <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}>
        <Box sx={{ marginRight: 3 }}>
          <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoria}
            label="Categoría"
            onChange={(e) => {
              setEquipoSeleccionado("Todos");
              setCategoria(e.target.value);
            }}
          >
            <MenuItem value="Todas">Todas</MenuItem>
            <MenuItem value="U-10">U-10</MenuItem>
            <MenuItem value="U-12">U-12</MenuItem>
            <MenuItem value="U-14 F">U-14 F</MenuItem>
            <MenuItem value="U-14 M">U-14 M</MenuItem>
            <MenuItem value="U-16 F">U-16 F</MenuItem>
            <MenuItem value="U-16 M">U-16 M</MenuItem>
            <MenuItem value="U-17 M">U-17 M</MenuItem>
            <MenuItem value="U-18 F">U-18 F</MenuItem>
          </Select>
        </Box>
        <Box sx={{ marginRight: 5 }}>
          <InputLabel id="demo-simple-select-label">Día</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dia}
            label="Día"
            onChange={(e) => {
              setEquipoSeleccionado("Todos");
              setDia(e.target.value);
            }}
          >
            <MenuItem value="Todos">Todos</MenuItem>
            <MenuItem value={"2022-11-19"}>Sábado 19</MenuItem>
            <MenuItem value={"2022-11-20"}>Domingo 20</MenuItem>
            <MenuItem value={"2022-11-21"}>Lunes 21</MenuItem>
          </Select>
        </Box>
        <Box sx={{ marginRight: 3 }}>
          <InputLabel id="demo-simple-select-label">Equipos</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={equipoSeleccionado}
            label="Día"
            onChange={(e) => setEquipoSeleccionado(e.target.value)}
          >
            <MenuItem value="Todos">Todos</MenuItem>
            {equipos.map((equipo) => (
              <MenuItem key={equipo.name} value={equipo.name}>
                {equipo.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <div>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            resultadosSeleccionables.map((partido) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={partido.id}>
                <PartidoCard partido={partido} type="resultado" />
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </Box>
  );
}
