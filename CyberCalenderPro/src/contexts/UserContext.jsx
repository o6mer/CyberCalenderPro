import { createContext, useState } from "react";
import dateFormat, { masks } from "dateformat";

export const UserContext = createContext();

const UserConextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [classesData, setClassesData] = useState([]);

  function getAviliableTimeListByDate(date) {
    const formatedDate = dateFormat(date, "yyyy,mm,dd").toString();
    const times = {};
    classesData.forEach((c) => {
      times[c.className] = buildAvilableTimesList(
        c.date_data.map((d) => {
          if (d.date === formatedDate && d.approved) return d.time_range;
        })
      );
    });
    return times;
  }

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
        getAviliableTimeListByDate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserConextProvider;
