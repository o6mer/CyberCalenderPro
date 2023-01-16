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
import AddMeeting from "./handles/createMeeting.jsx";
import DayConvert from "./handles/dayconvert.js";

function createData(date, time_range, approved, users) {
  return {
    date,
    time_range,
    approved,
    users: [users],
  };
}

function Row(props) {
  const { user } = useContext(UserContext);
  const { day } = props;
  const { hours } = props;
  const date = DayConvert(day);
  const { row } = props;
  let classHours;
  for (let i = 0; i < hours.length; i++) {
    if (row.className === hours[i][0]) {
      classHours = hours[i][1];
      break;
    }
  }
  const [open, setOpen] = React.useState(true);

  function Del(index) {
    classHours = classHours.splice(index, 1);
    window.location.reload();
  }

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
                    <TableCell>Time Range</TableCell>
                    <TableCell align="left">Request</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classHours.map((singleDate, index) => (
                    <TableRow key={singleDate}>
                      <TableCell component="th" scope="row">
                        {singleDate}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <button
                          onClick={() => {
                            AddMeeting(
                              date,
                              singleDate,
                              row.capacity,
                              row.className,
                                user
                            );
                            Del(singleDate);
                          }}
                        >
                          Take This meeting
                        </button>
                      </TableCell>
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

export default function CollapsibleTable(props) {
  const classesData = props.clone;
  const day = props.date;
  const hours = props.values;
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
            return <Row key={index} hours={hours} day={day} row={row} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
