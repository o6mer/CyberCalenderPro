import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import * as React from "react";
import NavBar from "./navbar.jsx";
import DayConvert from "../../hooks/dayconvert.js";
import { DataGrid } from "@mui/x-data-grid";

function SingleClass() {
  const today = new Date();
  const todayFormat = DayConvert(today);
  const { name } = useParams();
  const [classData, setClassData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [todayEvents, setTodayEvents] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .post("http://localhost:2000/getdatedata", {
        className: name,
        date: todayFormat,
      })
      .then((classDate) => {
        setClassData(classDate.data.className);
        setTodayEvents(classDate.data.dates);

        setIsLoading(false);
      });
  }, []);

  const columns = [
    { field: "time_range", headerName: "time range", width: 250 },
    { field: "approved", headerName: "Approved", width: 200 },
    { field: "By", headerName: "User", width: 200 },
    { field: "phone", headerName: "User Phone Number", width: 200 },
  ];

  const rows = [];

  todayEvents.map((oneEvent, index) => {
    rows.push({
      date: oneEvent.date,
      time_range: oneEvent.time_range,
      approved: oneEvent.approved,
      id: index,
      By: oneEvent.users[0].userName,
      phone: oneEvent.users[0].phoneNumber,
    });
  });
  return (
    <>
      <NavBar name={name} />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ overflow: "hidden", textAlign: "center" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
        />
        {/*<Test/>*/}
      </div>
    </>
  );
}
export default SingleClass;
