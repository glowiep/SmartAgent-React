import { BrowserRouter, useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Hero from "./components/Landing/Hero";
import AgentMainPage from "./components/AgentMainPage/AgentMainPage";
import Dashboard from "./components/Dashboard/Dashboard";
import { AppProvider } from "./context/AppContext";
import useApplicationData from "./hooks/useApplicationData";
import useLocalStorage from "./hooks/useLocalStorage";
import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";
import React from 'react';

const AppRoutes = () => {
  const { getAgents } = useApplicationData();
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('full_name', "SmartAgent Demo");
  localStorage.setItem('agent_id', "10");
  useLocalStorage();
  
  getAgents();
  let routes = useRoutes([
    { path: "/", element: <Hero /> },
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
