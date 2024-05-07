import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Hero from "./components/Landing/Hero";
import Login from "./components/Login/Login";
// import IconSidebar from "./components/AgentMainPage/SidePanel/IconSidebar";
// import Navbar from "./components/AgentMainPage/Navbar";
import AgentMainPage from "./components/AgentMainPage/AgentMainPage";
import Dashboard from "./components/Dashboard/Dashboard";
import { AppProvider } from "./context/AppContext";
import useApplicationData from "./hooks/useApplicationData";
import useLocalStorage from "./hooks/useLocalStorage";
import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";

const AppRoutes = () => {
  const { getAgents } = useApplicationData();
  useLocalStorage();
  
  getAgents();
  let routes = useRoutes([
    { path: "/", element: <Hero /> },
    { path: "/login", element: <Login /> },
    { path: "/main", element: <PrivateRoute><AgentMainPage/></PrivateRoute>},
    { path: "/dashboard", element: <PrivateRoute><Dashboard/></PrivateRoute>},
    { path: "/chat", element: <PrivateRoute><Chat/></PrivateRoute>},
    { path: "/profile", element: <PrivateRoute><Profile/></PrivateRoute>},


  ]);
  return routes;
};
function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
