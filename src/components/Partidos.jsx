import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPartidos } from "../api/partidos";
import { equiposData } from "../api/equipos";
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

Partidos.propTypes = {
  modoAuto: PropTypes.bool,
};
export default function Partidos({ modoAuto }) {
  const [loading, setLoading] = useState(false);
  const [partidos, setPartidos] = useState([]);
  const [partidosSeleccionables, setPartidosSeleccionables] = useState([]);
  const [dia, setDia] = useState("Todos");
  const [categoria, setCategoria] = useState("Todas");
  const [equipos, setEquipos] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState("Todos");

  useEffect(() => {
    setLoading(true);
    getPartidos().then((res) => {
      setPartidos(res);
      setPartidosSeleccionables(res);
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

  useEffect(() => {
    if (equipoSeleccionado === "Todos") {
      if (dia !== "Todos" && categoria !== "Todas") {
        const filtradoDia = partidos.filter((partido) => partido.fecha === dia);
        const filtradoFinal = filtradoDia.filter(
          (partido) => partido.category === categoria
        );
        setPartidosSeleccionables(filtradoFinal);
      } else if (dia === "Todos" && categoria !== "Todas") {
        const filtradoCategoria = partidos.filter(
          (partido) => partido.category === categoria
        );
        setPartidosSeleccionables(filtradoCategoria);
      } else if (dia !== "Todos" && categoria === "Todas") {
        const filtradoDia = partidos.filter((partido) => partido.fecha === dia);
        setPartidosSeleccionables(filtradoDia);
      } else {
        setPartidosSeleccionables(partidos);
      }
    } else {
      const filtroNombre = partidos.filter(
        (partido) =>
          partido.equipo_local === equipoSeleccionado ||
          partido.equipo_visitante === equipoSeleccionado
      );
      setCategoria("Todas");
      setDia("Todos");
      setPartidosSeleccionables(filtroNombre);
    }

    // if (equipo !== "") {
    //   setCategoria("Todas");
    //   setDia("Todos");
    //   partidosSeleccionables.map((partido) =>
    //     console.log(partido.equipo_local, equipo)
    //   );
    //   const filtroEquipo = partidosSeleccionables.filter(
    //     (partido) =>
    //       partido.equipo_local.includes(equipo) ||
    //       partido.equipo_visitante.includes(equipo)
    //   );
    //   setPartidosSeleccionables(filtroEquipo);
    // }
  }, [categoria, dia, equipoSeleccionado]);

  // const selectEquipo = (equipo) => {
  //   const filtroNombre = partidos.filter(
  //     (partido) =>
  //       partido.equipo_local === equipo || partido.equipo_visitante === equipo
  //   );
  //   setPartidosSeleccionables(filtroNombre);
  // };

  function compare(a, b) {
    if (a.formato_fecha > b.formato_fecha) {
      return 1;
    }
    if (a.formato_fecha < b.formato_fecha) {
      return -1;
    }
    return 0;
  }
  partidosSeleccionables.sort(compare);

  return (
    <Box>
      <Typography sx={{ textAlign: "center", fontWeight: "bold" }} variant="h4">
        Próximos Partidos
      </Typography>
      {modoAuto && (
        <Typography sx={{ textAlign: "center" }}>
          Mirá todos los partidos en la web
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 2,
        }}
      >
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
            <MenuItem value="U-15 M">U-15 M</MenuItem>
            <MenuItem value="U-15 F">U-15 F</MenuItem>
            <MenuItem value="U-17 F">U-17 F</MenuItem>
            <MenuItem value="U-17 M">U-17 M</MenuItem>
          </Select>
        </Box>

        <Box sx={{ marginRight: 3 }}>
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
            <MenuItem value={"2023-04-06"}>Jueves 6</MenuItem>
            <MenuItem value={"2023-04-07"}>Viernes 7</MenuItem>
            <MenuItem value={"2023-04-08"}>Sabado 8</MenuItem>
            <MenuItem value={"2023-04-09"}>Domingo 9</MenuItem>
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
        {/* <Box sx={{ marginRight: 3 }}>
          <InputLabel id="demo-simple-select-label">Equipo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value="Seleccionar"
            label="Buscar"
            onChange={(e) => setDia(e.target.value)}
          >
            <MenuItem value="Seleccionar">Seleccionar</MenuItem>

            {equipos.map((equipo) => (
              <MenuItem value={equipo.name}>{equipo.name}</MenuItem>
            ))}
          </Select>
        </Box> */}
      </Box>

      <Grid
        container
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          partidosSeleccionables.map((partido) => (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={partido.id}>
              <PartidoCard partido={partido} type="partido" />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
