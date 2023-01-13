import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    FormControl, FormLabel,
    InputLabel,
    ListItem, ListItemAvatar,
    ListSubheader,
    MenuItem,
    Select,
    selectClasses,
    TextField
} from "@mui/material";
import "./advancedpage.css"
import Checkbox from "@mui/material/Checkbox";
import {UserContext} from "../../../contexts/UserContext.jsx";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import CollapsibleTable from "./table.jsx";



function AdvancedPage(){
  const [ClassSelect, setClass] = React.useState();
  const [capacity,setCapacity] = useState(0)
    let clone = [];
  const [loading, setLoading] = useState(false);
    const {classesData} = useContext(UserContext);
  const [classesClone,setClassesClone] = useState(classesData)
  const [checks, setchecks] = useState(
      {ac: true, zoom: true, pcs: true}
  );
  const backup_checks = checks
function FilterAc(){
    if(checks[0].ac === true){
        setchecks(...checks, checks.ac === false)
    } else{
        setchecks(...checks, checks.ac === true)
    }
}
function FilterZoom() {
    if(checks[1].zoom === true){
        setchecks(...checks, checks.zoom === false)
    } else{
        setchecks(...checks, checks.zoom === true)
    }
}
function FilterPc() {
    if(checks[2].pc === true){
        setchecks(...checks, checks.pcs === false)
    } else{
        setchecks(...checks, checks.pcs === true)
    }
}
function Search() {
    Rest();
      setCapacity(Number(capacity))
    const filterClassName = classesClone.filter((singleClass)=>{
        console.log(singleClass.capacity)
            if (singleClass.capacity > capacity && singleClass.className === ClassSelect) {
                clone.push(singleClass)
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
            console.log(singleClass.checklist)
            if (checks.ac === singleClass.checklist.ac && checks.zoom === singleClass.checklist.zoom && checks.pcs === singleClass.checklist.pcs){
                clone.push(singleClass)
            }
            })
    } else {
        classesClone.map((singleClass)=>{
            if (checks.ac === singleClass.checklist.ac && checks.zoom === singleClass.checklist.zoom && checks.pcs === singleClass.checklist.pcs){
                clone.push(singleClass)
            }
        })
    }
    setClassesClone(clone)
    clone = []
}
function Rest() {
      setClassesClone(classesData)
}

  const handleChange = (event) => {
    setClass(event.target.value);
  };

  return <div id={"that"}>
      <Container maxWidth={"md"} >
          <div className={"sideNav"}>
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

      <TextField
          id="filled-number"
          label="Capacity"
          sx={{width:"150px", marginTop:"5px"}}
          onChange={(e)=>setCapacity(e.target.value)}
          type="number"
          value={capacity}
          InputLabelProps={{
              shrink: true,
          }}
      />

    <div sx={{width:"100%"}}>
        <Button variant="outlined"onClick={Rest} sx={{width:"90%"}}>Rest</Button>
        <Button variant="contained"onClick={Search} sx={{width:"90%"}}>Search</Button>
    </div>


          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop:"5px"}}>
     <ListItem
        secondaryAction={
          <Checkbox
              onChange={() => FilterPc}
              // checked={checks[2].pc?.check}
          />
        }
        label="Pcs"
     >
         <ListItemButton>
             <ListItemText primary={"Pcs"} />
         </ListItemButton>
     </ListItem>
    <ListItem
        secondaryAction={
          <Checkbox
              onChange={() => FilterZoom}
              // checked={checks[1].zoom?.check}
          />
        }
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
          </FormControl>
      </div>
{/*<ResponsiveDrawer>*/}
          <Container maxWidth={"sm"} >
          <CollapsibleTable values={classesClone}/>
              </Container>
{/*</ResponsiveDrawer>*/}
      </Container>

  </div>;
};

export default AdvancedPage;
