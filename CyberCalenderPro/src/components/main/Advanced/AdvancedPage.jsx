import React, {useContext, useEffect, useState} from "react";
import {
    FormControl,
    InputLabel,
    ListItem,
    ListSubheader,
    MenuItem,
    Select,
    selectClasses,
    TextField
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import axios from "axios";
import {UserContext} from "../../../contexts/UserContext.jsx";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

function AdvancedPage(){
  const [ClassSelect, setClass] = React.useState();
  const [capacity,setCapacity] = useState(0)
    const clone = [];
  const [loading, setLoading] = useState(false);
    const {classesData} = useContext(UserContext);
  const [classesClone,setClassesClone] = useState(classesData)
  const [checks, setchecks] = useState([
    { ac: false },
    { zoom: false },
    { pcs: false  },
  ]);
  const backup_checks = checks
function FilterAc(){
    if(checks[0].ac === true){
        setchecks(...checks, checks[0].ac === false)
    } else{
        setchecks(...checks, checks[0].ac === true)
    }
}
function FilterZoom() {
    if(checks[1].zoom === true){
        setchecks(...checks, checks[1].zoom === false)
    } else{
        setchecks(...checks, checks[1].zoom === true)
    }
}
function FilterPc() {
    if(checks[2].pc === true){
        setchecks(...checks, checks[2].pcs === false)
    } else{
        setchecks(...checks, checks[2].pcs === true)
    }
}
function Search() {
      setCapacity(Number(capacity))
    const filterClassName = classesClone.filter((singleClass)=>{
        console.log(singleClass.capacity)
            if (singleClass.capacity > capacity && singleClass.className === ClassSelect) {
                clone.push(singleClass)
                console.log("yeah")
                return singleClass
            } else if (!ClassSelect){
                if (singleClass.capacity > capacity){
                    return singleClass
                }
            }
    })
    setClassesClone(filterClassName)

    if(filterClassName.length !== 0 ){ // check if filter working
        filterClassName.map((singleClass)=>{
            console.log(singleClass)
            if (checks[0].ac === singleClass.checklist.ac && checks[1].zoom === singleClass.checklist.zoom && checks[2].pcs === singleClass.checklist.pcs){
                clone.push(singleClass)
            }
            })
    } else {
        classesClone.map((singleClass)=>{
            if (checks[0].ac === singleClass.checklist.ac && checks[1].zoom === singleClass.checklist.zoom && checks[2].pcs === singleClass.checklist.pcs){
                clone.push(singleClass)
            }
        })
    }
    setClassesClone(clone)
}
  //     const returnArray = allApartments.filter((apartment) => {
  //       // console.log(apartment.checked[factor].check);
  //       return apartment.checked[factor].check !== false;
  //     });
  //     setAllApartments(returnArray);
  //   }
  // // }
  // function SortByRank(number) {
  //   allApartments.filter((apartment) => {
  //     return apartment.reviews.overwall >= number;
  //   });
  // }
  const handleChange = (event) => {
    setClass(event.target.value);
  };

  return <div id={"that"}>
    <FormControl>
      <InputLabel id="demo-simple-select-label">Class</InputLabel>
      <Select
          sx={{width:"150px"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectClasses}
          label="Class"
          onChange={handleChange}
      >
          {classesClone.map((singleClass,index)=>{
              return <MenuItem key={index} value={singleClass.className}>{singleClass.className}</MenuItem>
          }
              )}

      </Select>
    </FormControl>
      <button onClick={Search}>button</button>
      <TextField
          id="outlined-number"
          label="Capacity"
          onChange={(e)=>setCapacity(e.target.value)}
          type="number"
          value={capacity}
          InputLabelProps={{
              shrink: true,
          }}
      />
    <FormControlLabel
        control={
          <Checkbox
              onChange={() => FilterPc}
              // checked={checks[2].pc?.check}
          />
        }
        label="Pcs"
    />
    <FormControlLabel
        control={
          <Checkbox
              onChange={() => FilterZoom}
              // checked={checks[1].zoom?.check}
          />
        }
        label="Zoom"
    />
    <FormControlLabel
        control={
          <Checkbox
              onChange={() => FilterAc}
              // checked={checks[0].ac?.check}
          />
        }
        label="AC"
    />
      <List
          sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              height:"100hv",
              '& ul': { padding: 0 },
          }}
          subheader={<li />}
      >
          {classesClone.map((singleClass,index) => (
              <li key={`section-${index}`}>
                  <ul>
                      <ListSubheader>{singleClass.className}</ListSubheader>
                      {singleClass.date_data.map((singleDate,index) => (
                          <ListItem key={index}>
                              <ListItemText primary={singleDate.date +" ---- " + singleDate.time_range } />
                          </ListItem>
                      ))}
                  </ul>
              </li>
          ))}
      </List>

  </div>;
};

export default AdvancedPage;
