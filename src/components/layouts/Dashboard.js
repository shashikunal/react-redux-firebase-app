import React from "react";
import Clients from "../clients/clients";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div>
      <h1 className="h1 font-weight-bold text-uppercase my-4 text-success">
        DashBoard
      </h1>
      <hr className="my-4" />
      <div className="row">
        <div className="col-md-10">
          <Clients />
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
