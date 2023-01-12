import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomePage from "./home/HomePage";
import CalenderPage from "./Calender/CalenderPage";
import AdvancedPage from "./Advanced/AdvancedPage";
import axios from "axios";
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

function Main() {
  const [value, setValue] = useState(0);
  const [currentPageName, setCurrentPageName] = useState("home");

  const { setClassesData } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post("http://localhost:2000/classesdata");

        const { data } = res.data;
        if (!data) return;

        setClassesData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleChange = (e, newValue) => {
    setCurrentPageName(e.target.name);
    setValue(newValue);
  };

  return (
    <main className="h-full">
      <div className="w-full">
        <div className="w-full flex justify-center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Main Page Tabs"
          >
            <Tab label="Home" name="Home" {...a11yProps(0)} />
            <Tab label="Calender" name="Calender" {...a11yProps(1)} />
            <Tab label="Advanced" name="Advanced" {...a11yProps(2)} />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <HomePage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CalenderPage />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AdvancedPage />
        </TabPanel>
      </div>
    </main>
  );
}

export default Main;
