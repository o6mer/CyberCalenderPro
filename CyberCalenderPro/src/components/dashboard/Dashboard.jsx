import axios from "axios";
import React, { useContext, useEffect } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import NavBar from "./NavBar";
import NewClassForm from "./NewClassForm";
import RequestList from "./RequestList/RequestList";

const Dashboard = () => {
  const { setRequestList } = useContext(DashboardContext);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get("http://localhost:2000/unresolved");
        console.log(res.data.dates);
        setRequestList(res.data.dates);
      } catch (err) {
        console.log(err);
      }
    };
    getRequests();
  }, []);

  return (
    <>
      <NavBar />
      <main className=" h-full flex flex-col items-center bg-primary ">
        <NewClassForm />
        <RequestList />
      </main>
    </>
  );
};

export default Dashboard;
