import { createContext, useEffect, useState } from "react";
import { axiosGet } from "../helpers/axiosHelper";
import { showNotification } from "@mantine/notifications";

export const UserContext = createContext({});

const getToken = () => {
  return localStorage.getItem("token");
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken());
  async function getUser() {
    try {
      const response = await axiosGet("/user/me");
      if (!response) localStorage.clear()
      else setUser(response)
    } catch (e) {
      //handling unknown errors
      console.log(e);
      showNotification({
        title: "Error",
        message: "An unknown error occured. Please try again later.",
        color: "red",
      });
    } 
  }
  useEffect(() => {
    if (!token) return;
    getUser()
  }, [token]);
  return (
    <UserContext.Provider value={{user, setUser, setToken}}>{props.children}</UserContext.Provider>
  )
};

