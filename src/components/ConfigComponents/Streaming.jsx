import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, InputLabel, Typography } from "@mui/material";
import { getStreamingData, addStreamingData } from "../../api/streaming";

const Streaming = () => {
    const [streamingUrls, setStreamingUrls] = useState([]);

    useEffect(() => {
        async function fetchStreamingData() {
            try {
                const data = await getStreamingData();
                if (data.length > 0) {
                    setStreamingUrls(data);
                }
            } catch (error) {
                console.error("Error al obtener los datos de Firebase:", error);
            }
        }
        fetchStreamingData();
    }, []); 

    const handleUrlChange = (index, event, cancha) => {
        const newUrls = [...streamingUrls];
        newUrls[index] = { ...newUrls[index], url: event.target.value, cancha };
        setStreamingUrls(newUrls);
    };

    const handlePaste = (index, event, cancha) => {
        const pastedText = event.clipboardData.getData('Text');
        const newUrls = [...streamingUrls];
        newUrls[index] = { ...newUrls[index], url: pastedText, cancha };
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
                {streamingUrls.map((cancha, index) => (
                    <Grid item md={4} xl={3} key={index}>
                        <Box>
                            <InputLabel>{cancha.cancha}</InputLabel>
                            <TextField
                                label="URL"
                                variant="outlined"
                                fullWidth
                                type="url"
                                value={cancha.url || ""}
                                onChange={(event) => handleUrlChange(index, event, cancha.cancha)}
                                onPaste={(event) => handlePaste(index, event, cancha.cancha)}
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
