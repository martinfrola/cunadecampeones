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
        width: 320,
        height: 150,
        marginBottom: 1,
        marginRight: 3,
        border: 1,
      }}
      onClick={() => console.log(partido.id)}
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
          <Typography sx={{ fontWeight: "bold" }} color="primary.blue">
            Cancha: {partido.cancha}
          </Typography>
          {partido.cancha === "Bahiense C1" && (
            <Link
              href="https://www.youtube.com/watch?v=W1BUGbLb07g"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
          {partido.cancha === "Bahiense C2" && (
            <Link
              href="https://www.youtube.com/watch?v=MG5N0ikT84A"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
          {partido.cancha === "Bahiense C3" && (
            <Link
              href="https://www.youtube.com/watch?v=u87RnK27Mf0"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
          {partido.cancha === "Independiente" && (
            <Link
              href="https://www.youtube.com/watch?v=_7kAkVJBYo4"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
          {partido.cancha === "Barracas" && (
            <Link
              href="https://www.youtube.com/watch?v=lvspZA4qSJ4"
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          )}
          {partido.cancha === "Sportivo" && (
            <Link
              href="https://www.youtube.com/watch?v=d0fozfdtyss"
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
          <Typography
            color="primary.blue"
            sx={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            Hora: {partido.hora}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
