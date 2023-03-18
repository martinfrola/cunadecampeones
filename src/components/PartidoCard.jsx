import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";

PartidoCard.propTypes = {
  partido: PropTypes.object,
  type: PropTypes.string,
};

export default function PartidoCard({ partido, type }) {
  return (
    <Card
      sx={{
        width: 300,
        height: 150,
        marginBottom: 1,
        marginRight: 3,
        border: 1,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
            {partido.equipo_local}
          </Typography>
          {type === "resultado" && (
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              {partido.puntos_local}
            </Typography>
          )}
        </Box>

        <Typography sx={{ fontSize: 16 }}>VS</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
            {partido.equipo_visitante}
          </Typography>
          {type === "resultado" && (
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              {partido.puntos_visitante}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: "bold" }}>
            Cancha: {partido.cancha}
          </Typography>
          {partido.cancha === "Bahiense C1" && type === "partido" && (
            <Link
              href="https://youtu.be/kBuSNVKlgqM"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
          {partido.cancha === "Bahiense C2" && type === "partido" && (
            <Link
              href="https://youtu.be/it3IW4KjR9M"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
          {partido.cancha === "Bahiense C3" && type === "partido" && (
            <Link
              href="https://youtu.be/plT1VekB_sw"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
          {partido.cancha === "Liniers C1" && type === "partido" && (
            <Link
              href="https://youtu.be/XPc_Y4zkPag"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
          {partido.cancha === "Liniers C2" && type === "partido" && (
            <Link
              href="https://youtu.be/IJYPOPmNG6E"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", textDecoration: "underline" }}>
            Fecha: {partido.fecha}
          </Typography>
          <Typography sx={{ fontWeight: "bold", textDecoration: "underline" }}>
            Hora: {partido.hora}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
