import React from "react";
import ClassesTable from "./ClassesTable";
import ClassesTableByTime from "./ClassesTableByTime";



const HomePage = () => {
  return (
    <>
  <ClassesTable />
  <ClassesTableByTime />
  </>
  );
};

export default HomePage;
