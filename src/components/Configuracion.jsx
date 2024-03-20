import React from "react";
import { Box } from "@mui/material";
import Streaming from "./ConfigComponents/Streaming";
import PuntosSettings from "./ConfigComponents/PuntosSettings";
export default function Configuracion() {
    return(
        <Box>
            <Streaming />
            <PuntosSettings/>
        </Box>
    )
}