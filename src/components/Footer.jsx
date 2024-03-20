import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import logo from "../assests/images/logo_cuna_nuevo.png";
import logo_bahiense from "../assests/images/logo_bahiense.jpg";
import logo_LOU from "../assests/images/logo_LOU.jpeg";
export default function Footer() {
  const images = [logo, logo_bahiense, logo_LOU];
  return (
    <>
      <Grid container spacing={2}>
        {images.map((imagen, index) => (
          <Grid key={index} item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <img
              src={imagen}
              alt={`Imagen ${index + 1}`}
              style={{ maxWidth: 200 }}
            />
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ textAlign: "center" }}>
        Power By{" "}
        <Link
          href="https://tench-arg.web.app/"
          target="_blank"
          sx={{ color: "black" }}
        >
          Tench
        </Link>
      </Typography>
    </>
  );
}
