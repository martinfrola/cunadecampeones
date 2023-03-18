import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

const HomeMenu = () => {
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Partidos"
        value="partidos"
        icon={<SportsBasketballIcon />}
      />
      <BottomNavigationAction
        label="Resultados"
        value="resultados"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Tablas"
        value="tablas"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
};

export default HomeMenu;
