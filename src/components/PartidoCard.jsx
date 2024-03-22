import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";

PartidoCard.propTypes = {
  partido: PropTypes.object,
  type: PropTypes.string,
  links: PropTypes.array
};

export default function PartidoCard({ partido, type, links }) {

  const [link, setLink] = useState("")
  useEffect(() => {
    const linkCancha = links.filter(link => link.cancha == partido.cancha)
    console.log(links, linkCancha)
    if(linkCancha.length > 0){
      setLink(linkCancha[0].url)
    }
    
  }, [])
  return (
    <Card
      sx={{
        width: 320,
        height: 170,
        marginBottom: 1,
        marginRight: 3,
        border: 1,
      }}
      onClick={() => console.log(partido.id)}
    >
      <CardContent sx={{p:1}}>
        <Typography 
          color="secondary"
          sx={{ fontWeight: "bold", fontFamily: "sans-serif", textAlign: 'center',fontSize: 18 }}
        >
          {partido.category}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            {partido.equipo_local}
          </Typography>
          {type === "resultado" && (
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              {partido.puntos_local}
            </Typography>
          )}
        </Box>

        <Typography sx={{ fontSize: 14 }}>VS</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
            {partido.equipo_visitante}
          </Typography>
          {type === "resultado" && (
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              {partido.puntos_visitante}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: "bold" }} color="primary.blue">
            Cancha: {partido.cancha}
          </Typography>
          {link != "" &&
            <Link
              href={link}
              target="_blank"
              color="secondary"
              underline="none"
              sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
            >
              Ver Partido
            </Link>
          }
          
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
