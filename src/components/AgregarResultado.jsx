import React, { useEffect, useState } from "react";
import { getPartidos, deletePartido } from "../api/partidos";
import { addResultado } from "../api/resultados";
//import { updateEquipos } from "../api/equipos";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
export default function AgregarResultado() {
  const [partidos, setPartidos] = useState([]);
  const [partidosSeleccionables, setPartidosSeleccionables] = useState([]);
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    getPartidos().then((res) => {
      setPartidos(res);
      setPartidosSeleccionables(res);
    });
  }, []);

  const selectCategory = (e) => {
    const newListPartidos = partidos.filter(
      (partido) => partido.category === e.target.value
    );
    setPartidosSeleccionables(newListPartidos);
  };

  const selectPartido = (id) => {
    console.log(id);
    const partidoSelected = partidos.filter((partido) => partido.id == id);
    setResultado({
      ...partidoSelected[0],
      puntos_local: null,
      puntos_visitante: null,
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setResultado({ ...resultado, [e.target.name]: e.target.value });
  };

  const submitResultado = async () => {
    await addResultado(resultado);
    await deletePartido(resultado.id);
    //await updateEquipos(resultado);
  };
  return (
    <Box>
      <Box sx={{ marginBottom: 3 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          id="demo-simple-select"
          name="category"
          label="Categoría"
          defaultValue="Seleccionar"
          onChange={(e) => selectCategory(e)}
        >
          <MenuItem disabled value="Seleccionar">
            Seleccionar
          </MenuItem>
            <MenuItem value="U-10">U-10</MenuItem>
            <MenuItem value="U-12">U-12</MenuItem>
            <MenuItem value="U-14 M">U-14 M</MenuItem>
            <MenuItem value="U-14 F">U-14 F</MenuItem>
        </Select>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <InputLabel>Seleccionar Partido</InputLabel>
        <Select
          id="demo-simple-select"
          name="partidos"
          label="Partidos"
          defaultValue="Seleccionar"
          onChange={(e) => selectPartido(e.target.value)}
        >
          <MenuItem disabled value="Seleccionar">
            Seleccionar
          </MenuItem>
          {partidosSeleccionables.map((partido) => (
            <MenuItem value={partido.id} key={partido.id}>
              {partido.equipo_local} vs {partido.equipo_visitante}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <InputLabel>Puntos: {resultado.equipo_local}</InputLabel>
        <TextField
          label="Puntos Local"
          name="puntos_local"
          onChange={(e) => handleChange(e)}
        />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <InputLabel>Puntos: {resultado.equipo_visitante}</InputLabel>
        <TextField
          label="Puntos Visitante"
          name="puntos_visitante"
          onChange={(e) => handleChange(e)}
        />
      </Box>
      <Box sx={{ display: "flex", marginTop: 3 }}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={() => submitResultado()}
        >
          Cargar Resultado
        </Button>
      </Box>
    </Box>
  );
}
