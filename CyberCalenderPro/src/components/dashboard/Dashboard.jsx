import axios from "axios";
import React, { useContext, useEffect } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import { UserContext } from "../../contexts/UserContext";
import NewClassForm from "./NewClassForm";
import RequestList from "./RequestList/RequestList";
import TopNavBar from "./TopNavBar/TopNavBar";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { requestList, setRequestList } = useContext(DashboardContext);

  console.log(user);
  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get("http://localhost:2000/unresolved");

        setRequestList(res.data.dates);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRequests();
  }, []);

  return (
    <main className="w-full h-full flex flex-col bg-primary">
      <TopNavBar />
      <section className="w-full grow flex flex-col justify-center items-center p-2">
        <NewClassForm />
        <RequestList />
      </section>
    </main>
  );
};

export default Dashboard;
