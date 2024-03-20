import React, { useState } from "react";
import AgregarEquipo from "../components/AgregarEquipo";
import AgregarPartido from "../components/AgregarPartido";
import AgregarResultado from "../components/AgregarResultado";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assests/images/logo_cuna.jpeg'; // Importar la imagen
import Configuracion from "../components/Configuracion";
const Admin = () => {
  const [pageSelected, setPageSelected] = useState("agregarResultado");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (page) => {
    setPageSelected(page);
    handleClose();
  };

  return (
    <Box sx={{ m: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cuna de Campeones
          </Typography>
          <img src={Logo} alt="Logo" style={{ height: 64, marginRight: 10 }} /> {/* Agregar la imagen en el borde derecho */}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => handleMenuItemClick("agregarEquipo")}
          selected={pageSelected === "agregarEquipo"}
        >
          Agregar Equipo
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("agregarPartido")}
          selected={pageSelected === "agregarPartido"}
        >
          Agregar Partido
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("agregarResultado")}
          selected={pageSelected === "agregarResultado"}
        >
          Agregar Resultado
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("configuracion")}
          selected={pageSelected === "configuracion"}
        >
          Configuracion
        </MenuItem>
      </Menu>
      {pageSelected === "agregarEquipo" && <AgregarEquipo />}
      {pageSelected === "agregarPartido" && <AgregarPartido />}
      {pageSelected === "agregarResultado" && <AgregarResultado />}
      {pageSelected === "configuracion" && <Configuracion />}
      
    </Box>
  );
};

export default Admin;
