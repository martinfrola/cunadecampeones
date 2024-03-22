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
import { getAllEquipos } from "../api/equipos";
import { categories } from "../data/categories";
import { getStreamingData } from "../api/streaming";

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
  const [links, setLinks] = useState([]) 

  const ref = createRef();

  useEffect(() => {
    setLoading(true);

    async function fetchStreamingData() {
      const resultadosFetch = await getResultados()
      setResultados(resultadosFetch);
      setResultadosSeleccionables(resultadosFetch);

      const equiposFetch = await getAllEquipos()
      setEquipos(equiposFetch)

      const streamingFetch = await getStreamingData()
      setLinks(streamingFetch)

      setLoading(false)
    }

    fetchStreamingData()
    if (modoAuto) {
      setTimeout(() => {
        window.scrollTo(0, 180);
      }, 3000);
    }
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
            {categories.map(category => (
              <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
            ))}
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
            <MenuItem value={"2024-03-28"}>Viernes 28</MenuItem>
            <MenuItem value={"2024-03-29"}>Sabado 29</MenuItem>
            <MenuItem value={"2024-03-30"}>Domingo 30</MenuItem>
            <MenuItem value={"2024-03-31"}>Lunes 31</MenuItem>
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
                <PartidoCard partido={partido} type="resultado" links={links}/>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    </Box>
  );
}
