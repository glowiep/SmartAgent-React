import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useChatData } from "../../hooks/useChatData"
import IconSidebar from "../AgentMainPage/SidePanel/IconSidebar";
function PrivateRoute({ children }) {
  useChatData();

  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <div className="app flex h-screen bg-base-200">
      <IconSidebar />
      <div className="content w-[100%] bg-base-200">{children}</div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
