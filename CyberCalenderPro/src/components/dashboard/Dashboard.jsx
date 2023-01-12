import axios from "axios";
import React, { useContext, useEffect } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import NewClassForm from "./NewClassForm";
import RequestList from "./RequestList/RequestList";
import TopNavBar from "../TopNavBar";
import { Avatar } from "@mui/material";

const Dashboard = () => {
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

  return (
    <main className="w-full h-full flex flex-col bg-primary ">
      <TopNavBar align="end">
        <button className="justify-self-end">
          <Avatar alt="Cindy Baker" sx={{ backgroundColor: "#1E2022" }}>
            US
          </Avatar>
        </button>
      </TopNavBar>
      <div className=" px-80">
        <section className="w-full grow flex flex-col justify-center items-center">
          <NewClassForm />
          <RequestList />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
