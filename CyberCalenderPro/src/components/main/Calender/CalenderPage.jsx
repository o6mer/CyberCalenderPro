import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dateFormat, { masks } from "dateformat";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { UserContext } from "../../../contexts/UserContext";
const CalenderPage = () => {
  const [avilableTimeList, setAvilableTimeList] = useState([]);
  const [avilableClassList, setAvilableClassList] = useState([]);
  const [currentShownTimes, setCurrentShownTimes] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 14
    )
  );
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [groupSize, setGroupSize] = useState("");

  const { user, classesData } = useContext(UserContext);

  useEffect(() => {
    dateSelectedHandler(new Date());
    const classes = classesData.map((c) => c.className);
    setAvilableClassList([...classes]);
    setSelectedClass(classes[0]);
  }, []);

  useEffect(() => {
    setCurrentShownTimes(avilableTimeList[selectedClass]);
  }, [selectedClass]);

  function dateSelectedHandler(date) {
    const formatedDate = dateFormat(date, "yyyy,mm,dd").toString();
    setSelectedDate(formatedDate);
    const times = {};
    classesData.forEach((c) => {
      times[c.className] = buildAvilableTimesList(
        c.date_data.map((d) => {
          if (d.date === formatedDate) return d.time_range;
        })
      );
    });
    setAvilableTimeList(times);
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

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2000/addMeeting", {
        date: selectedDate,
        className: selectedClass,
        time_range: selectedTime,
        groupSize,
        phoneNumber: user.phone,
      });
      setAvilableTimeList((prev) => {
        console.log(prev[selectedClass]);
        prev[selectedClass] = prev[selectedClass].filter(
          (t) => t.time_range !== selectedTime
        );
        setCurrentShownTimes([...prev[selectedClass]]);
        return { ...prev };
      });
    } catch (err) {
      console.log(err);
    }
  }

  function clearForm() {
    setGroupSize("");
    setSelectedClass("");
    setSelectedTime("");
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 px-80 py-8">
      <Calendar
        onChange={dateSelectedHandler}
        onActiveStartDateChange={(date) => {
          setStartDate(date);
          setEndDate(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 14)
          );
        }}
        view="month"
        minDate={startDate}
        maxDate={endDate}
      />
      <form onSubmit={submitHandler} className="flex flex-col w-full gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="select-time">
            Time Range:{" "}
            <select
              name=""
              id="select-time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select Time</option>
              {currentShownTimes?.map((timeRange) => (
                <option value={timeRange} key={timeRange}>
                  {timeRange}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="select-class">
            Class Room:{" "}
            <select
              name=""
              id="select-class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Select Class</option>
              {avilableClassList.map((className) => (
                <option value={className} key={className}>
                  {className}
                </option>
              ))}
            </select>
          </label>

          <TextField
            size="small"
            label="Group Size"
            variant="outlined"
            type="number"
            value={groupSize}
            onChange={(e) => {
              setGroupSize(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outlined"
            className=""
            type="button"
            onClick={clearForm}
            endIcon={<DeleteIcon fontSize="large" />}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            className=""
            type="submit"
            endIcon={<CheckIcon fontSize="large" />}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CalenderPage;
