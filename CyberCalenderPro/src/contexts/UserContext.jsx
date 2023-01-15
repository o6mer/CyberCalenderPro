import { createContext, useState } from "react";

export const UserContext = createContext();

const UserConextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [classesData, setClassesData] = useState([]);

  function buildAvilableTimesList(takenTimes) {
    let list = [];
    for (let i = 8; i < 21; i++) {
      if (i < 10) {
        list.push(`0${i}:00-0${i}:30`);
        list.push(`0${i}:30-${i + 1 === 10 ? `${i + 1}:00` : `0${i + 1}:00`}`);
      } else {
        list.push(`${i}:00-${i}:30`);
        list.push(`${i}:30-${i + 1}:00`);
      }
    }

    if (!takenTimes) return list;

    list = list.filter(
      (timeRange) => !takenTimes.find((takenTime) => timeRange === takenTime)
    );
    return list;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        classesData,
        setClassesData,
        buildAvilableTimesList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserConextProvider;
