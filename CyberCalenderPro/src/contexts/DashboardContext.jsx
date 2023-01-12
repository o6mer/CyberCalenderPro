import { createContext, useState } from "react";

export const DashboardContext = createContext();
const list = [
  {
    _id: "id1",
    className: "aa",
    user: {
      name: "omer",
      phoneNumber: "1111",
      email: "email@gmail.com",
    },
    date: "30/01/2023",
    time_range: "10:30-11:00",
    aprooved: false,
  },
  {
    _id: "id2",
    className: "bb",
    user: {
      name: "omer",
      phoneNumber: "1111",
      email: "email@gmail.com",
    },
    date: "30/01/2023",
    time_range: "10:30-11:00",
    aprooved: false,
  },
  {
    _id: "id3",
    className: "cc",
    user: {
      name: "omer",
      phoneNumber: "1111",
      email: "email@gmail.com",
    },
    date: "30/01/2023",
    time_range: "10:30-11:00",
    aprooved: false,
  },
];
const DashboardContextProvider = ({ children }) => {
  const [requestList, setRequestList] = useState(list);
  return (
    <DashboardContext.Provider value={{ requestList, setRequestList }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
