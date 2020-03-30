import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <Link to="/client/add" className="btn btn-block btn-success">
        <i className="fas fa-plus"></i> New
      </Link>
    </div>
  );
};

export default Sidebar;
