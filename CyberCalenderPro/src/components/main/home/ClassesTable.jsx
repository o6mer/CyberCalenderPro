import React from "react";
import { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

const tableData = [{
  "Time": "8:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "8:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "9:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "9:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "10:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "10:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "11:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "11:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "12:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "12:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "13:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "13:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "14:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "14:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "15:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "15:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "16:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "16:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "17:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "17:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "18:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "18:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "19:00",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}, {
  "Time": "19:30",
  "c1": 'Fullstack',
  "c2": 'Fullstack',
  "c3": 'Fullstack',
  "c4": 'Fullstack'
}
]
const ClassesTable = () => {
  return <TableContainer component={Paper}>
            <Table aria-aria-label="simple table">
              <TableHead>
                <TableCell>Time</TableCell>
                <TableCell>C1</TableCell>
                <TableCell>C2</TableCell>
                <TableCell>C3</TableCell>
                <TableCell>C4</TableCell>
              </TableHead>
              <TableBody>
                {
                  tableData.map(row =>(
                    <TableRow key={row.Time}
                    sx={{'&:last-child td, &:last-child th' : {border:0}}}
                    >
                      <TableCell>{row.Time}</TableCell>
                      <TableCell>{row.c1}</TableCell>
                      <TableCell>{row.c2}</TableCell>
                      <TableCell>{row.c3}</TableCell>
                      <TableCell>{row.c4}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
         </TableContainer>;
};

export default ClassesTable;


