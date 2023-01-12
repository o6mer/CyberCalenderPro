import axios from "axios";
import React, { useContext, useEffect } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import NewClassForm from "./NewClassForm";
import RequestList from "./RequestList/RequestList";

const Dashboard = () => {
  const { setRequestList } = useContext(DashboardContext);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get("http://localhost:2000/unresolved");
        const list = [];
        res.data.dates.forEach((c) =>
          c.date.forEach((date) =>
            list.push({ ...date, className: c.className })
          )
        );
        console.log(list);
        setRequestList(list);
      } catch (err) {
        console.log(err);
      }
    };
    getRequests();
  }, []);

  return (
    <main className="w-full h-full flex flex-col bg-primary ">
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
