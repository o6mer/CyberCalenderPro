import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useContext} from "@types/react";
import {UserContext} from "../../../contexts/UserContext.jsx";

function AdvancedPage(){
  const [age, setAge] = React.useState('');
  const [capacity,setCapacity] = useState()
  const [checked, setChecked] = useState(true);
  const { classesData } = useContext(UserContext);
  const [classesClone,setClassesClone] = useState(classesData)
  const [checkes, setcheckes] = useState([
    { ac: false },
    { zoom: true,  },
    { pcs: true  },
  ]);
  const clone = checkes;

  function FilterChecked(factor) {
    if (checkes[factor].check === true) {
      clone[factor].check = false;
      setcheckes([...clone]);
      setClassesClone(classesData)
      // setAllApartments(allApartments2);
    } else {
        clone[factor].check = true;
        setcheckes([...clone]);
        classesClone.filter((single_class)=>{
                return date.checked[factor] === true
            })

    }
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
    setAge(event.target.value);
  };

  return <div>
    <FormControl>
      <InputLabel id="demo-simple-select-label">Class</InputLabel>
      <Select
          sx={{width:"50px"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Class"
          onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
      <TextField
          id="outlined-number"
          label="Capacity"
          onChange={(e)=>setCapacity(e.target.value)}
          type="number"
          InputLabelProps={{
              shrink: true,
          }}
      />
    <FormControlLabel
        control={
          <Checkbox
              onChange={() => FilterChecked(0)}
              checked={checkes[0]?.check}
          />
        }
        label="Pcs"
    />
    <FormControlLabel
        control={
          <Checkbox
              onChange={() => FilterChecked(1)}
              checked={checkes[1]?.check}
          />
        }
        label="Zoom"
    />
    <FormControlLabel
        control={
          <Checkbox
              onChange={() => FilterChecked(2)}
              checked={checkes[2]?.check}
          />
        }
        label="AC"
    />


  </div>;
};

export default AdvancedPage;
