import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useChatData } from "../../hooks/useChatData"
import IconSidebar from "../AgentMainPage/SidePanel/IconSidebar";
function PrivateRoute({ children }) {
  useChatData();

  return (
    <div className="app flex h-screen bg-base-200">
      <IconSidebar />
      <div className="content w-[100%] bg-base-200">{children}</div>
    </div>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
