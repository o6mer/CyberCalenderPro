import React from "react";
import NewClassForm from "./NewClassForm";
import RequestList from "./RequestList/RequestList";
import TopNavBar from "./TopNavBar/TopNavBar";

const Dashboard = () => {
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
