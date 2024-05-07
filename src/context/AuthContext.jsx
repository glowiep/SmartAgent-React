import  { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('full_name');
    localStorage.removeItem('agent_id');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
