import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import propTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";
import NavBar from "./NavBar";
import NewClassForm from "./NewClassForm";
import RequestList from "./RequestList/RequestList";
import { useUserHandle } from "../../hooks/useUserHandle";
import ClassesTableByTime from "../main/home/ClassesTableByTime";
import { UserContext } from "../../contexts/UserContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: propTypes.node,
  index: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index} `,
    sx: { fontSize: "1.3rem" },
  };
}

const Dashboard = () => {
  useUserHandle();
  const { setRequestList } = useContext(DashboardContext);
  const { setClassesData } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const classesData = await axios.post(
          "http://localhost:2000/classesdata"
        );
        const requestList = await axios.get("http://localhost:2000/unresolved");

        if (!classesData || !requestList) return;

        console.log(classesData, requestList);
        setRequestList(requestList.data.dates);
        setClassesData(classesData.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const [value, setValue] = useState(0);
  const [currentPageName, setCurrentPageName] = useState("List");

  const handleChange = (e, newValue) => {
    setCurrentPageName(e.target.name);
    setValue(newValue);
  };
  return (
    <>
      <NavBar />
      <main className="h-full ">
        <div className="w-full flex justify-center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Dashboard Page Tabs"
          >
            <Tab label="class list" name="class list" {...a11yProps(0)} />
            <Tab label="requests" name="requests" {...a11yProps(1)} />
            <Tab label="add class" name="add class" {...a11yProps(2)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <ClassesTableByTime />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RequestList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <NewClassForm />
        </TabPanel>
      </main>
    </>
  );
};

export default Dashboard;
