import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useUserHandle } from "../../hooks/useUserHandle";

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(UserContext);
  const { auth } = useUserHandle();

  useEffect(() => {
    auth();
  }, []);

  return (
    <>{Object.keys(user).length ? children : <Navigate to={"/Login"} />}</>
  );
};

export default ProtectedRoutes;
