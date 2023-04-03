import React, { useState } from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { addEquipo } from "../api/equipos";

export default function AgregarEquipo() {
  const [dataEquipo, setDataEquipo] = useState({
    id: null,
    name: "",
    category: "",
    puntos: 0,
    partidos_ganados: 0,
    partidos_perdidos: 0,
    puntos_favor: 0,
    puntos_contra: 0,
    zona: null,
  });

  const handleChange = (e) => {
    setDataEquipo({
      ...dataEquipo,
      [e.target.name]: e.target.value,
      id: Math.random(),
    });
  };

  const handleSubmit = () => {
    addEquipo(dataEquipo);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 5 }}>
        Agregar partido
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: 5,
        }}
      >
        <Box>
          <InputLabel id="demo-simple-select-label">Nombre Equipo</InputLabel>

          <TextField
            id="outlined-basic"
            name="name"
            variant="outlined"
            onChange={(e) => handleChange(e)}
          />
        </Box>

        <Box>
          <InputLabel>Categoría</InputLabel>
          <Select
            id="demo-simple-select"
            name="category"
            label="Categoría"
            defaultValue="Seleccionar"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem disabled value="Seleccionar">
              Seleccionar
            </MenuItem>
            <MenuItem value="U-15 M">U-15 M</MenuItem>
            <MenuItem value="U-15 F">U-15 F</MenuItem>
            <MenuItem value="U-17 M">U-17 M</MenuItem>
            <MenuItem value="U-17 F">U-17 F</MenuItem>
          </Select>
        </Box>
        <Box>
          <InputLabel id="demo-simple-select-label">Zona</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="zona"
            label="Zona"
            defaultValue="Seleccionar"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem disabled value="Seleccionar">
              Seleccionar
            </MenuItem>
            <MenuItem value={1}>{1}</MenuItem>
            <MenuItem value={2}>{2}</MenuItem>
            <MenuItem value={3}>{3}</MenuItem>
            <MenuItem value={4}>{4}</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Guardar Equipo
        </Button>
      </Box>
    </Box>
  );
}
