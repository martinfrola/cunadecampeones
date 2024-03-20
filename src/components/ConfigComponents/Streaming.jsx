import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, InputLabel, Typography } from "@mui/material";
import { canchas } from "../../data/canchas";
import { getStreamingData, addStreamingData } from "../../api/streaming";
const Streaming = () => {
    const [streamingUrls, setStreamingUrls] = useState(canchas.map(cancha => ({ cancha: cancha.name, url: "" })));

  useEffect(() => {
    async function fetchStreamingData() {
      try {
        const data = await getStreamingData();
        if(data.length > 0){
            setStreamingUrls(data);
        }
         // Actualizar el estado con los datos obtenidos
      } catch (error) {
        console.error("Error al obtener los datos de Firebase:", error);
      }
    }
    fetchStreamingData();
  }, []); // Se ejecuta solo una vez al montar el componente
console.log(streamingUrls)
  const handleUrlChange = (index, event) => {
    const newUrls = [...streamingUrls];
    newUrls[index] = { ...newUrls[index], url: event.target.value };
    setStreamingUrls(newUrls);
  };

  const handleSave = () => {
    console.log(streamingUrls)
    addStreamingData(streamingUrls);
  };

  return (
    <Box sx={{ m: 5, p: 3, borderRadius: 2, border: 3, borderColor: "primary.main" }}>
      <Typography sx={{ textAlign: 'center', paddingBottom: 2 }} variant="h6">Links Streaming</Typography>
      <Grid container spacing={2}>
        {canchas.map((cancha, index) => (
          <Grid item md={4} xl={3} key={index}>
            <Box>
              <InputLabel>{cancha.name}</InputLabel>
              <TextField
                label="URL"
                variant="outlined"
                fullWidth
                type="url"
                value={streamingUrls[index]?.url || ""}
                onChange={(event) => handleUrlChange(index, event)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default Streaming;
