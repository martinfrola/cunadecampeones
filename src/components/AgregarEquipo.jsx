import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Box,
  Grid
} from "@mui/material";
import { columns } from "../dataTableConfig/equipos";
import { addEquipo, deleteEquipo } from "../api/equipos";
import DataTable from "./DataTable";
import { getAllEquipos } from "../api/equipos";
import { categories } from "../data/categories";
export default function AgregarEquipo() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllEquipos().then((res) => {
      setRows(res);
    });
  }, []);

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
      id: dataEquipo.id != null ? dataEquipo.id : Math.random(),
    });
  };

  const handleSubmit = async() => {
    await addEquipo(dataEquipo)
    setDataEquipo({
      id: null,
      name: "",
      category: "",
      puntos: 0,
      partidos_ganados: 0,
      partidos_perdidos: 0,
      puntos_favor: 0,
      puntos_contra: 0,
      zona: null,
    })
    const existingIndex = rows.findIndex(row => row.id === dataEquipo.id);

    if (existingIndex !== -1) {
      // Si el objeto ya existe, reemplazarlo en su posición actual
      const updatedRows = [...rows];
      updatedRows[existingIndex] = dataEquipo;
      setRows(updatedRows);
    } else {
      // Si el objeto no existe, agregarlo al inicio del array
      setRows(oldRows => [dataEquipo, ...oldRows]);
    }
  };

  const handleEdit = (data) => {
    console.log("llegó:", data)
    setDataEquipo(data)
  }

  const handleDelete = async(data) => {
    await deleteEquipo(data.id)
    const nuevosEquipos = rows.filter(row => row.id != data.id)
    setRows(nuevosEquipos)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 5 }}>
        Agregar equipo
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputLabel id="demo-simple-select-label">Nombre Equipo</InputLabel>
          <TextField
            id="outlined-basic"
            name="name"
            variant="outlined"
            value={dataEquipo.name}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Categoría</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="category"
            label="Categoría"
            value={dataEquipo.category || ""}
            onChange={(e) => handleChange(e)}
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
          <InputLabel>Zona</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="zona"
            label="Zona"
            value={dataEquipo.zona || ""}
            onChange={(e) => handleChange(e)}
            fullWidth
          >
            <MenuItem disabled value="">
              Seleccionar
            </MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="puntos-label">Puntos</InputLabel>
          <TextField
            id="puntos"
            name="puntos"
            type="number"
            variant="outlined"
            value={dataEquipo.puntos}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="partidos_ganados-label">Partidos ganados</InputLabel>
          <TextField
            id="partidos_ganados"
            name="partidos_ganados"
            type="number"
            variant="outlined"
            value={dataEquipo.partidos_ganados}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="partidos_perdidos-label">Partidos perdidos</InputLabel>
          <TextField
            id="partidos_perdidos"
            name="partidos_perdidos"
            type="number"
            variant="outlined"
            value={dataEquipo.partidos_perdidos}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="puntos_favor-label">Puntos a favor</InputLabel>
          <TextField
            id="puntos_favor"
            name="puntos_favor"
            type="number"
            variant="outlined"
            value={dataEquipo.puntos_favor}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="puntos_contra-label">Puntos en contra</InputLabel>
          <TextField
            id="puntos_contra"
            name="puntos_contra"
            type="number"
            variant="outlined"
            value={dataEquipo.puntos_contra}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box mt={3} textAlign="center" width="100%" display="flex" justifyContent="center" gap={2}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Guardar Equipo
        </Button>
        <Button
          sx={{ width: "200px" }}
          variant="outlined"
          onClick={() => setDataEquipo({
            id: null,
            name: "",
            category: "",
            puntos: 0,
            partidos_ganados: 0,
            partidos_perdidos: 0,
            puntos_favor: 0,
            puntos_contra: 0,
            zona: null,
          })}
        >
          Crear Nuevo
        </Button>
      </Box>

      <DataTable columns={columns} rows={rows} setData={(data) => handleEdit(data)} onDelete={(data) => handleDelete(data)}/>
    </Box>
  );
}
