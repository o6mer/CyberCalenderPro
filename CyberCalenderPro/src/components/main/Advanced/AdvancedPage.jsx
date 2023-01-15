import React, { useContext, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  selectClasses,
  TextField,
} from "@mui/material";
import "./advancedpage.css";
import Checkbox from "@mui/material/Checkbox";
import { UserContext } from "../../../contexts/UserContext.jsx";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import CollapsibleTable from "./table.jsx";
import DayConvert from "./handles/dayconvert.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function AdvancedPage() {
  const [ClassSelect, setClass] = useState();
  const [capacity, setCapacity] = useState(0);
  const today = new Date();
  const [datePick, setDatePick] = useState(today);
  let clone = [];
  const [reload, setReload] = useState(true);
  const { classesData, getAviliableTimeListByDate } = useContext(UserContext);
  const [avilableDates, setAvilableDates] = useState(
    Object.entries(getAviliableTimeListByDate(DayConvert(today)))
  );
  const [classesClone, setClassesClone] = useState(classesData);
  const [checks, setChecks] = useState({ ac: true, zoom: true, pcs: true });
  function FilterAc() {
    if (checks.ac === true) {
      setChecks(...checks, checks.ac === false);
    } else {
      setChecks(...checks, checks.ac === true);
    }
  }
  function FilterZoom() {
    if (checks.zoom === true) {
      setChecks(...checks, checks.zoom === false);
    } else {
      setChecks(...checks, checks.zoom === true);
    }
  }
  function FilterPc() {
    if (checks.pcs === true) {
      setChecks(...checks, checks.pcs === false);
    } else {
      setChecks(...checks, checks.pcs === true);
    }
  }
  function Search() {
    Rest();
    setCapacity(Number(capacity));
    const filterClassName = classesClone.filter((singleClass) => {
      if (
        singleClass.capacity > capacity &&
        singleClass.className === ClassSelect
      ) {
        clone.push(singleClass);
        return singleClass;
      } else if (!ClassSelect) {
        if (singleClass.capacity > capacity) {
          return singleClass;
        }
      }
    });
    setClassesClone(filterClassName);
    if (filterClassName.length !== 0) {
      // check if filter working
      filterClassName.map((singleClass) => {
        if (
          checks.ac === singleClass.checklist.ac &&
          checks.zoom === singleClass.checklist.zoom &&
          checks.pcs === singleClass.checklist.pcs
        ) {
          clone.push(singleClass);
        }
      });
    } else {
      classesClone.map((singleClass) => {
        if (
          checks.ac === singleClass.checklist.ac &&
          checks.zoom === singleClass.checklist.zoom &&
          checks.pcs === singleClass.checklist.pcs
        ) {
          clone.push(singleClass);
        }
      });
    }
    setClassesClone(clone);
    clone = [];
  }
  function Rest() {
    setClassesClone(classesData);
  }
  function ChangeDatePick(e) {
    setDatePick(e?.$d);
    setReload(false);
    setReload(true);
    setAvilableDates(
      Object.entries(getAviliableTimeListByDate(DayConvert(e.$d)))
    );
  }

  return (
    <div id={"that"} className="overflow-x-hidden">
      <Container maxWidth={"md"}>
        <div className={"sideNav overflow-x-hidden"}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              sx={{ width: "100%", marginTop: "5px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectClasses}
              label="Class"
              onChange={(e) => setClass(e.target.value)}
            >
              {classesClone.map((singleClass, index) => {
                return (
                  <MenuItem key={index} value={singleClass.className}>
                    {singleClass.className}
                  </MenuItem>
                );
              })}
            </Select>
            <div className={"datepicker"}>
              <LocalizationProvider
                sx={{ width: "100%", marginTop: "15px" }}
                dateAdapter={AdapterDayjs}
              >
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/DD/YYYY"
                  value={datePick}
                  onChange={ChangeDatePick}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <TextField
              id="filled-number"
              label="Capacity"
              sx={{ width: "100%", marginTop: "5px" }}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              value={capacity}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <List
              dense
              sx={{
                width: "100%",
                maxWidth: 360,
                bgColor: "background.paper",
                marginTop: "5px",
              }}
            >
              <ListItem
                secondaryAction={<Checkbox onChange={() => FilterPc} />}
                label="Pcs"
              >
                <ListItemButton>
                  <ListItemText primary={"Pcs"} />
                </ListItemButton>
              </ListItem>
              <ListItem
                secondaryAction={<Checkbox onChange={() => FilterZoom} />}
                label="Zoom"
              >
                <ListItemButton>
                  <ListItemText primary={"Zoom"} />
                </ListItemButton>
              </ListItem>
              <ListItem
                secondaryAction={
                  <Checkbox
                    onChange={() => FilterAc}
                    // checked={checks[0].ac?.check}
                  />
                }
                label="AC"
              >
                <ListItemButton>
                  <ListItemText primary={"AC"} />
                </ListItemButton>
              </ListItem>
            </List>
            <div>
              <Button variant="outlined" onClick={Rest} sx={{ width: "100%" }}>
                Rest
              </Button>
              <Button
                variant="contained"
                onClick={Search}
                sx={{ width: "100%" }}
              >
                Search
              </Button>
            </div>
          </FormControl>
        </div>
        {reload ? (
          <Container maxWidth={"sm"}>
            <CollapsibleTable
              values={avilableDates}
              clone={classesClone}
              date={datePick}
            />
          </Container>
        ) : (
          <p>Reload!</p>
        )}
      </Container>
    </div>
  );
}

export default AdvancedPage;
