import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export const useUserHandle = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user) return;
    localStorage.setItem("user", JSON.stringify({ userId: user.userId }));
    if (user.role === "admin") {
      navigate("/dashboard");
    } else if (user.role === "user") {
      navigate("/main");
    }
  }, [user]);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("http://localhost:2000/login", {
        email,
        password,
      });

      //userName, role, userId
      setUser(res.data);
    } catch (err) {
      if (!err.response.data.message) alert("Invalid Email or password ");
    }
  };

  const signup = async ({ email, password, userName, phone }) => {
    try {
      const res = await axios.post("http://localhost:2000/signup", {
        userName: userName,
        Password: password,
        Email: email,
        PhoneNumber: phone,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser();
    localStorage.removeItem("user");
    navigate("/login");
  };

  const auth = async () => {
    try {
      const storedData = JSON.parse(localStorage.getItem("user"));
      if (!Object.keys(storedData).length) return;
      const res = await axios.post("http://localhost:2000/auth", {
        id: storedData.userId,
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { login, signup, logout, auth };
};
