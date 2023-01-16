import axios from "axios";
import React, { useContext, useEffect,useState } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";
import NavBar from "./NavBar";
import NewClassForm from "./NewClassForm";
import RequestList from "./RequestList/RequestList";
import { useUserHandle } from "../../hooks/useUserHandle";

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

TabPanel.PropTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
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

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get("http://localhost:2000/unresolved");
        setRequestList(res.data.dates);
      } catch (err) {
        console.log(err);
      }
    };
    getRequests();
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
      <main className="h-full">
        <div className="w-full flex justify-center">
          <Tabs value={value} onChange={handleChange} aria-label="Dashboard Page Tabs">
            <Tab label="class list" name="class list" {...a11yProps(0)} />
            <Tab label="add class" name="add class" {...a11yProps(1)} />
            <Tab label="Dash" name="Dash" {...a11yProps(2)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <RequestList />
        </TabPanel>
        <TabPanel value={value} index={1}>
        <NewClassForm />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <NavBar />
        </TabPanel>
      </main>
      {/* <main className=" h-full flex flex-col items-center bg-primary ">
        <NewClassForm />
        <RequestList />
      </main> */}
    </>
  );
};

export default Dashboard;
