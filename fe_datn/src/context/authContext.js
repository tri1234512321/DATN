import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  // console.log("currentUser: ", 4);
  // console.log("current: ", currentUser);
  const addUser = (user) => {
    setCurrentUser(user);
    let { image, ...newDataUser } = user;
    localStorage.setItem("user", JSON.stringify(newDataUser));
  };

  const removeUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const login = (data) => {
    addUser(data);
  };

  const logout = () => {
    removeUser();
  };

  useEffect(() => {
    if (currentUser) {
      let { image, ...newDataUser } = currentUser;
      localStorage.setItem("user", JSON.stringify(newDataUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
