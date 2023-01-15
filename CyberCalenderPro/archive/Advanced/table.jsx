import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";

function createData(date, time_range, approved, users) {
  return {
    date,
    time_range,
    approved,
    users: [users],
  };
}

function Row(props) {
  const [open, setOpen] = React.useState(true);
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.className}</TableCell>
        <TableCell align="right">{row.capacity}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Class Data
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time Range</TableCell>
                    <TableCell align="right">Request</TableCell>
                    <TableCell align="right">user</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.date_data.map((singleDate) => (
                    <TableRow key={singleDate.date}>
                      <TableCell component="th" scope="row">
                        {singleDate.date}
                      </TableCell>
                      <TableCell>{singleDate.time_range}</TableCell>
                      <TableCell>{singleDate.approved.toString()}</TableCell>
                      {singleDate.users.map((user) => {
                        return (
                          <TableCell align="right">{user.userName}</TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    className: PropTypes.string.isRequired,
    capacity: PropTypes.string.isRequired,
    date: PropTypes.array.isRequired,
  }),
};

export default function CollapsibleTable(props) {
  const classesData = props.values;

  const rows = classesData;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">className</TableCell>
            <TableCell align="right">capacity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return <Row key={index} row={row} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
