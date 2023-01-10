import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
const Dashboard = () => {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <form action="">
        <TextField label="Class Name" variant="outlined" type="text" />
        <TextField label="Capacity" variant="outlined" type="number" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="AC" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Zoom" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="PC's" />
      </form>
    </main>
  );
};

export default Dashboard;
