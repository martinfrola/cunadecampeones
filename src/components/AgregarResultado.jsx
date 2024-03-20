import React, { useEffect, useState } from "react";
import { getPartidos, deletePartido } from "../api/partidos";
import { addResultado, deleteResultado, getResultados } from "../api/resultados";
import { updateEquipos } from "../api/equipos";
import DataTable from "./DataTable";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Box,
  Typography,
  Grid
} from "@mui/material";
import { columns } from "../dataTableConfig/resultados";
import { categories } from "../data/categories";
export default function AgregarResultado() {
  const [partidos, setPartidos] = useState([]);
  const [partidosSeleccionables, setPartidosSeleccionables] = useState([]);
  const [resultado, setResultado] = useState({});
  const [rows, setRows] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    getPartidos().then((res) => {
      setPartidos(res);
      setPartidosSeleccionables(res);
    });

    getResultados().then((res) => {
      setRows(res);
    });
  }, []);

  const selectCategory = (e) => {
    const newListPartidos = partidos.filter(
      (partido) => partido.category === e.target.value
    );
    setPartidosSeleccionables(newListPartidos);
  };

  const selectPartido = (id) => {
    const partidoSelected = partidos.filter((partido) => partido.id == id);
    setResultado({
      ...partidoSelected[0],
      puntos_local: null,
      puntos_visitante: null,
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setResultado({ 
      ...resultado, 
      [e.target.name]: e.target.value,
      id: resultado.id != null ? resultado.id : Math.random()
    });
  };

  const submitResultado = async () => {
    if(isEditing){
      await updateEquipos(resultado, true);
    } else {
      await updateEquipos(resultado, false);
    }
    await addResultado(resultado);
    await deletePartido(resultado.id);
    
    const existingIndex = rows.findIndex(row => row.id === resultado.id);
    if (existingIndex !== -1) {
      // Si el objeto ya existe, reemplazarlo en su posición actual
      const updatedRows = [...rows];
      updatedRows[existingIndex] = resultado;
      setRows(updatedRows);
    } else {
      // Si el objeto no existe, agregarlo al inicio del array
      setRows(oldRows => [resultado, ...oldRows]);
    }
    setIsEditing(false)
  };

  const handleEdit = (data) => {
    setResultado(data)
    setIsEditing(true)
  }

  const handleDelete = async(data) => {
    await deleteResultado(data.id)
    const nuevosResultados = rows.filter(row => row.id != data.id)
    setRows(nuevosResultados)
  }

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 5 }}>
        Agregar resultado
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <InputLabel>Categoría</InputLabel>
          {resultado.id != null ?
            (<TextField
              id="puntos"
              name="categoria"
              variant="outlined"
              value={resultado.category}
              disabled
              fullWidth
          />) 
          : 
          (
            <Select
              id="demo-simple-select"
              name="category"
              label="Categoría"
              defaultValue="Seleccionar"
              value={resultado.category || ""}
              onChange={(e) => selectCategory(e)}
              fullWidth
            >
              <MenuItem disabled value="">
              Seleccionar
              </MenuItem>
              {categories.map(category => (
                <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
              ))}
            </Select>
          )}
        </Grid>
        {resultado.id != null ?
          (
            <Grid item xs={12} sm={6}>
                <InputLabel>Seleccionar Partido</InputLabel>
                <TextField
                    id="puntos"
                    name="partido"
                    variant="outlined"
                    value={`${resultado.equipo_local} vs ${resultado.equipo_visitante}`}
                    disabled
                    fullWidth
                />
            </Grid>
          ) : 
          (
            <Grid item xs={12} sm={6}>
              <InputLabel>Seleccionar Partido</InputLabel>
              <Select
                  id="demo-simple-select"
                  name="partidos"
                  label="Partidos"
                  defaultValue="Seleccionar"
                  onChange={(e) => selectPartido(e.target.value)}
                  fullWidth
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
            </Grid>
          )
        }

        <Grid item xs={12} sm={6}>
          <InputLabel>Puntos: {resultado.equipo_local}</InputLabel>
          <TextField
            name="puntos_local"
            value={resultado.puntos_local}
            type="number"
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel>Puntos: {resultado.equipo_visitante}</InputLabel>
          <TextField
            name="puntos_visitante"
            value={resultado.puntos_visitante}
            type="number"
            onChange={(e) => handleChange(e)}
            fullWidth
          />
        </Grid>

      </Grid>
      <Box mt={3} textAlign="center" width="100%" display="flex" justifyContent="center" gap={2}>
        <Button
          sx={{ width: "200px" }}
          variant="contained"
          onClick={() => submitResultado()}
        >
          Cargar Resultado
        </Button>
        <Button
          sx={{ width: "200px" }}
          variant="outlined"
          onClick={() => setResultado({
            id: null,
            category: "",
            equipo_local: "",
            equipo_visitante: "",
            puntos_local: "",
            puntos_visitante: ""
          })}
        >
          Agregar Nuevo
        </Button>
      </Box>

      <DataTable columns={columns} rows={rows} setData={(data) => handleEdit(data)} onDelete={(data) => handleDelete(data)}/>
    </Box>
  );
}
