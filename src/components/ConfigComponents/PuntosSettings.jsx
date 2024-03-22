import { Box, Switch, Grid, InputLabel, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getPointsConfig, addPointsConfig } from "../../api/pointsConfig";
export const PuntosSettings = () => {
    const [categoriesPointsConfig, setCategoriesPointsConfig] = useState([]);

    useEffect(() => {
        obtenerDatosFirebase();
    }, []); // Llamar a obtenerDatosFirebase solo una vez al montar el componente

    const obtenerDatosFirebase = async () => {
        try {
            const data = await getPointsConfig();
            if(data.length > 0){
                setCategoriesPointsConfig(data)
            }
        } catch (error) {
            console.error('Error al obtener datos de Firebase:', error);
        }
    };

    const handleConfigChange = (index, event, category) => {
        const newCategoriesPointsConfig = [...categoriesPointsConfig];
        newCategoriesPointsConfig[index] = { ...newCategoriesPointsConfig[index], sumaPuntos: event.target.checked, category };
        setCategoriesPointsConfig(newCategoriesPointsConfig);
    };

    const handleSave = async () => {
        console.log(categoriesPointsConfig)
        try {
            await addPointsConfig(categoriesPointsConfig);
            console.log("Configuración guardada correctamente:", categoriesPointsConfig);
        } catch (error) {
            console.error('Error al guardar la configuración:', error);
        }
    };

    return (
        <Box sx={{m:5, p:3, borderRadius:2, border: 3, borderColor: "primary.main"}}>
            <Typography sx={{textAlign: 'center', paddingBottom: 2}} variant="h6">Configuración de suma de puntos</Typography>
            <Grid container spacing={2}>
                {categoriesPointsConfig.map((category, index) => (
                    <Grid item md={2} xl={1} key={index}>
                        <Box>
                            <InputLabel>{category.category}</InputLabel>
                            <Switch
                                checked={category.sumaPuntos || false}
                                onChange={(e) => handleConfigChange(index, e, category.category)}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{mt:3, display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Guardar
                </Button>
            </Box>
        </Box>
    );
};

export default PuntosSettings;
