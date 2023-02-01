import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const cookiesTime = new Date(new Date().setDate(new Date().getDate() + 7));
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  setInterval(() => {
    if (!localStorage.getItem("user")) {
      cookies.remove("jwtTime");
      localStorage.removeItem("user");
      setCurrentUser(null);
    }

    if (!cookies.get("jwtTime") && localStorage.getItem("user")) {
      localStorage.removeItem("user");
      setCurrentUser(null);
    }
  }, 10000);

  const register = async (email, password, nick) => {
    const res = await axios.post("/auth/register", {
      email,
      password,
      nick,
    });
    setCurrentUser(res.data);
    cookies.set("jwtTime", ".", { path: "/", expires: cookiesTime });
    return res;
  };

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", {
      email,
      password,
    });
    setCurrentUser(res.data);
    cookies.set("jwtTime", ".", { path: "/", expires: cookiesTime });
    return res;
  };

  const changeNick = async (nick) => {
    setCurrentUser({
      ...currentUser,
      nick,
    });
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    if (cookies.get("jwtTime")) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else setCurrentUser(null);
  }, [currentUser, cookies.get("jwtTime")]);

  const value = {
    changeNick,
    currentUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
