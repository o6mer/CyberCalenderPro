import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
  const [className, setClassName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [checklist, setChecklist] = useState({
    ac: true,
    zoom: true,
    pcs: true,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2000/addclass", {
        className,
        capacity,
        checklist,
      });
      console.log(res.data);
      clearForm();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChecklistChange = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.checked;
    setChecklist((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  const clearForm = () => {
    setClassName("");
    setCapacity("");
    setChecklist({
      ac: true,
      zoom: true,
      pcs: true,
    });
  };
  return (
    <form
      action=""
      onSubmit={submitHandler}
      className="flex flex-col w-fit gap-2 "
    >
      <div className="flex items-center justify-around">
        <TextField
          required
          label="Class Name"
          variant="outlined"
          type="text"
          value={className}
          onChange={(e) => setClassName(e.currentTarget.value)}
        />
        <TextField
          required
          label="Capacity"
          variant="outlined"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.currentTarget.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="ac"
              checked={checklist.ac}
              value={checklist.ac}
              onChange={handleChecklistChange}
            />
          }
          label="AC"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="zoom"
              checked={checklist.zoom}
              value={checklist.zoom}
              onChange={handleChecklistChange}
            />
          }
          label="Zoom"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="pcs"
              checked={checklist.pcs}
              value={checklist.pcs}
              onChange={handleChecklistChange}
            />
          }
          label="PC's"
        />
      </div>
      <div className="flex justify-between">
        <Button
          variant="outlined"
          className=""
          type="button"
          onClick={clearForm}
          endIcon={<DeleteIcon fontSize="large" />}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          className=""
          type="submit"
          endIcon={<AddIcon fontSize="large" />}
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default Dashboard;
