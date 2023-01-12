import { createContext, useState } from "react";

export const UserContext = createContext();

const UserConextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [classesData, setClassesData] = useState([]);
  return (
    <UserContext.Provider
      value={{ user, setUser, classesData, setClassesData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserConextProvider;
