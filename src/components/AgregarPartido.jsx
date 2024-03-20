import React, { useEffect, useState } from "react";
import { getAllEquipos } from "../api/equipos";
import { addPartido, deletePartido, getPartidos } from "../api/partidos";
import {  Typography,
  Input,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Box,
  Grid} from "@mui/material";
import DataTable from "./DataTable";
import { columns } from "../dataTableConfig/partidos";
import { categories } from "../data/categories";
import {canchas} from "../data/canchas"
export default function AgregarPartido() {
  const [equipos, setEquipos] = useState([]);
  const [equiposSeleccionables, setEquiposSeleccionables] = useState([]);
  const [rows, setRows] = useState([])
  const [partido, setPartido] = useState({
    category: "",
    id: null,
    equipo_local: "",
    equipo_local_id: "", // Nuevo campo para el ID del equipo local
    equipo_visitante: "",
    equipo_visitante_id: "", // Nuevo campo para el ID del equipo visitante
    fecha: "",
    hora: "",
    cancha: ""
  });

  useEffect(() => {
    getAllEquipos().then((res) => {
      setEquipos(res);
      setEquiposSeleccionables(res);
    });

    getPartidos().then((res) => {
      setRows(res);
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
      });
    } else {
      // Obtener el objeto completo del equipo seleccionado
      const selectedEquipo = equiposSeleccionables.find(equipo => equipo.name === e.target.value);
      setPartido({ 
        ...partido, 
        [e.target.name]: e.target.value, 
        [`${e.target.name}_id`]: selectedEquipo ? selectedEquipo.id : "", // Asignar el ID del equipo seleccionado
        id: partido.id !== null ? partido.id : Math.random()
      });
    }
  };

  const submitPartido = async () => {
      await addPartido(partido);

      const existingIndex = rows.findIndex(row => row.id === partido.id);

      if(existingIndex !== -1) {
        // Si el objeto ya existe, reemplazarlo en su posición actual
      const updatedRows = [...rows];
      updatedRows[existingIndex] = partido;
      setRows(updatedRows);
      } else {
        // Si el objeto no existe, agregarlo al inicio del array
        setRows(oldRows => [partido, ...oldRows]);
      }
      setPartido({
        id: null,
        category: "",
        equipo_local: "",
        equipo_local_id: "", // Restablecer el ID
        equipo_visitante: "",
        equipo_visitante_id: "", // Restablecer el ID
        fecha: "",
        hora: "",
        cancha: ""
      });

  };

  const handleEdit = (data) => {
    setPartido(data)
  }

  const handleDelete = async(data) => {
    await deletePartido(data.id)
    const nuevosPartidos = rows.filter(row => row.id != data.id)
    setRows(nuevosPartidos)
  }

  return (
    <div>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}>
        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 5 }}>
          Agregar partido
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              value={partido.category}
              onChange={(e) => handleSelectCategory(e)}
              fullWidth
            >
              <MenuItem disabled value="">
              Seleccionar
            </MenuItem>
            {categories.map(category => (
              <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
            ))}
            </Select>
          </Grid>


          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">Equipo Local</InputLabel>
            <Select
              name="equipo_local"
              value={partido.equipo_local || ""}
              defaultValue=""
              onChange={(e) => handleSelectCategory(e)}
              fullWidth
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {equiposSeleccionables.map((equipo) => (
                <MenuItem key={equipo.name} value={equipo.name}>
                  {equipo.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Equipo Visitante</InputLabel>
            <Select
              name="equipo_visitante"
              value={partido.equipo_visitante || ""}
              defaultValue=""
              onChange={(e) => handleSelectCategory(e)}
              fullWidth
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {equiposSeleccionables.map((equipo) => (
                <MenuItem key={equipo.name} value={equipo.name}>
                  {equipo.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel>Cancha</InputLabel>
            <Select
              name="cancha"
              value={partido.cancha || ""}
              defaultValue=""
              onChange={(e) => handleSelectCategory(e)}
              fullWidth
            >
              <MenuItem disabled value="">
              Seleccionar
            </MenuItem>
          {canchas.map(cancha => (
            <MenuItem key={cancha.name} value={cancha.name}>{cancha.name}</MenuItem>
          ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="fecha">Fecha</InputLabel>
            <Input
              id="fecha"
              type="date"
              value={partido.fecha || ""}
              onChange={(e) => setPartido({ ...partido, fecha: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel htmlFor="hora">Hora</InputLabel>
            <Input
              id="hora"
              type="time"
              value={partido.hora || ""}
              onChange={(e) => setPartido({ ...partido, hora: e.target.value })}
            />
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center" width="100%" display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            onClick={() => submitPartido()}
          >
            Cargar Partido
          </Button>
          <Button
          sx={{ width: "200px" }}
          variant="outlined"
          onClick={() => setPartido({
            category: "",
            equipo_local: "",
            equipo_visitante: "",
            fecha: "",
            hora: "",
            cancha: ""
          })}
        >
          Crear Nuevo
        </Button>
        </Box>
      </Box>
      <DataTable columns={columns} rows={rows} setData={(data) => handleEdit(data)} onDelete={(data) => handleDelete(data)}/>
    </div>
  );
}
