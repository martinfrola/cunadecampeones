import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";

TablaPosiciones.propTypes = {
  modoAuto: PropTypes.bool,
};
export default function TablaPosiciones(equipos) {
  return (
    <div>
      <TableContainer sx={{ border: 2, borderRadius: 1 }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                Equipo
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="right"
              >
                Puntos
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="right"
              >
                PJ
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="right"
              >
                PG
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="right"
              >
                PP
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="right"
              >
                PF
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="right"
              >
                PC
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: 18 }}
                align="right"
              >
                DIF
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipos.equipos.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontSize: 18 }} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }} align="right">
                  {row.puntos}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }} align="right">
                  {row.partidos_ganados + row.partidos_perdidos}{" "}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }} align="right">
                  {row.partidos_ganados}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }} align="right">
                  {row.partidos_perdidos}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }} align="right">
                  {row.puntos_favor}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }} align="right">
                  {row.puntos_contra}
                </TableCell>
                <TableCell sx={{ fontSize: 18 }} align="right">
                  {row.puntos_favor - row.puntos_contra}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
