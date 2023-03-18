import React, { useEffect, useState } from "react";
import { equiposData } from "../api/equipos";
import { addPartido } from "../api/partidos";

import { Select, MenuItem, InputLabel, Button, Box } from "@mui/material";
export default function AgregarPartido() {
  const [equipos, setEquipos] = useState([]);
  const [equiposSeleccionables, setEquiposSeleccionables] = useState([]);
  const [partido, setPartido] = useState({
    category: "",
    id: null,
    equipo_local: "",
    equipo_visitante: "",
    fecha: "",
    hora: "",
  });

  useEffect(() => {
    equiposData().then((res) => {
      setEquipos(res);
      setEquiposSeleccionables(res);
    });
  }, []);

  const handleSelectCategory = (e) => {
    if (e.target.name === "category") {
      const newListEquipos = equipos.filter(
        (equipo) => equipo.category === e.target.value
      );
      setEquiposSeleccionables(newListEquipos);
      setPartido({
        ...partido,
        [e.target.name]: e.target.value,
        id: Math.random(),
      });
    } else {
      setPartido({ ...partido, [e.target.name]: e.target.value });
    }
  };

  const submitPartido = () => {
    if (
      partido.category !== "" &&
      partido.equipo_local !== "" &&
      partido.equipo_visitante !== "" &&
      partido.fecha !== "" &&
      partido.hora !== ""
    ) {
      addPartido(partido);
      setPartido({
        category: "",
        equipo_local: "",
        equipo_visitante: "",
        fecha: "",
        hora: "",
      });
    } else {
      alert("algún campo está incompleto");
    }
  };
  return (
    <div>
      <Box>
        <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="category"
          label="Categoría"
          defaultValue="Seleccionar"
          onChange={(e) => handleSelectCategory(e)}
        >
          <MenuItem disabled value="Seleccionar">
            Seleccionar
          </MenuItem>
          <MenuItem value="U-10">U-10</MenuItem>
          <MenuItem value="U-12">U-12</MenuItem>
          <MenuItem value="U-14 F">U-14 F</MenuItem>
          <MenuItem value="U-14 M">U-14 M</MenuItem>
          <MenuItem value="U-16 F">U-16 F</MenuItem>
          <MenuItem value="U-17 M">U-17 M</MenuItem>
          <MenuItem value="U-18 F">U-18 F</MenuItem>
        </Select>
      </Box>

      {partido.category !== "" && (
        <div>
          <Box>
            <InputLabel>Equipo Local</InputLabel>
            <Select
              id="demo-simple-select"
              name="equipo_local"
              label="Equipo Local"
              defaultValue="Seleccionar"
              onChange={(e) => handleSelectCategory(e)}
            >
              <MenuItem disabled value="Seleccionar">
                Seleccionar
              </MenuItem>
              {equiposSeleccionables.map((equipo) => (
                <MenuItem key={equipo.name} value={equipo.name}>
                  {equipo.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <InputLabel>Equipo Visitante</InputLabel>
            <Select
              id="demo-simple-select"
              name="equipo_visitante"
              label="Equipo Visitante"
              defaultValue="Seleccionar"
              onChange={(e) => handleSelectCategory(e)}
            >
              <MenuItem disabled value="Seleccionar">
                Seleccionar
              </MenuItem>
              {equiposSeleccionables.map((equipo) => (
                <MenuItem key={equipo.name} value={equipo.name}>
                  {equipo.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <InputLabel>Cancha</InputLabel>
            <Select
              id="demo-simple-select"
              name="cancha"
              label="Cancha"
              defaultValue="Seleccionar"
              onChange={(e) => handleSelectCategory(e)}
            >
              <MenuItem disabled value="Seleccionar">
                Seleccionar
              </MenuItem>
              <MenuItem value="Bahiense C1">Bahiense C1</MenuItem>
              <MenuItem value="Bahiense C2">Bahiense C2</MenuItem>
              <MenuItem value="Bahiense C3">Bahiense C3</MenuItem>
              <MenuItem value="Liniers C1">Liniers C1</MenuItem>
              <MenuItem value="Liniers C2">Liniers C2</MenuItem>
              <MenuItem value="Argentino C1">Argentino C1</MenuItem>
              <MenuItem value="Estrella C1">Estrella C1</MenuItem>
              <MenuItem value="Comercial C1">Comercial C1</MenuItem>
              <MenuItem value="El Nacional C1">El Nacional C1</MenuItem>
              <MenuItem value="Pacifico C1">Pacifico C1</MenuItem>
              <MenuItem value="El Nacional (Chiclana)">
                El Nacional Centro
              </MenuItem>
            </Select>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", width: "150px" }}
          >
            <label htmlFor="">Fecha</label>
            <input
              placeholder="Fecha"
              name="fecha"
              type="date"
              min="2022-11-19"
              max="2022-11-21"
              onChange={(e) => handleSelectCategory(e)}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", width: "150px" }}
          >
            <label htmlFor="">Hora</label>
            <input
              placeholder="hora"
              type="time"
              name="hora"
              onChange={(e) => handleSelectCategory(e)}
            />
          </Box>
        </div>
      )}
      <Box sx={{ display: "flex", marginTop: 3 }}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={() => submitPartido()}
        >
          Cargar Partido
        </Button>
      </Box>
    </div>
  );
}
