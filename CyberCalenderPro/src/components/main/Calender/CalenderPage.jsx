import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Alert, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { UserContext } from "../../../contexts/UserContext";
import { Fade } from "@mui/material";

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
  const [isError, setIsError] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { user, classesData, getAviliableTimeListByDate } =
    useContext(UserContext);

  useEffect(() => {
    dateSelectedHandler(new Date());
    const classes = classesData.map((c) => c.className);
    setAvilableClassList([...classes]);
    setSelectedClass(classes[0]);
  }, []);

  useEffect(() => {
    setCurrentShownTimes(avilableTimeList[selectedClass]);
  }, [selectedClass, selectedDate]);

  useEffect(() => {
    setIsError(false);
  }, [selectedClass, selectedTime, groupSize]);

  function dateSelectedHandler(date) {
    setSelectedDate(date);
    const times = getAviliableTimeListByDate(date);
    setAvilableTimeList(times);
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedClass || !groupSize) {
      setIsError(true);
      return setTimeout(() => setIsError(false), 2000);
    }
    try {
      const res = await axios.post("http://localhost:2000/addMeeting", {
        date: selectedDate,
        className: selectedClass,
        time_range: selectedTime,
        groupSize,
        phoneNumber: user.phone,
      });
      setAvilableTimeList((prev) => {
        prev[selectedClass] = prev[selectedClass].filter(
          (t) => t !== selectedTime
        );
        setCurrentShownTimes([...prev[selectedClass]]);
        return { ...prev };
      });
      setIsSent(true);
      return setTimeout(() => setIsSent(false), 2000);
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
    <div className="w-full h-full flex flex-col items-center justify-center gap-8  py-8 relative">
      <Calendar
        calendarType="Hebrew"
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
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center w-max gap-2"
      >
        <div className="flex items-center justify-center gap-6">
          <label htmlFor="select-class">
            Class Room:{" "}
            <select
              className="border p-2 rounded-xl"
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

          <label htmlFor="select-time">
            Time Range:{" "}
            <select
              className="border p-2 rounded-xl"
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

          <TextField
            sx={{ width: "fit-content" }}
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
      <Fade in={isError}>
        <Alert
          severity="error"
          sx={{
            position: "absolute",
            bottom: "5%",
            right: "50%",
            translate: "50% 0",
          }}
        >
          Please fill al the fields
        </Alert>
      </Fade>
      <Fade in={isSent}>
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            bottom: "5%",
            right: "50%",
            translate: "50% 0",
          }}
        >
          Meeting Saved!
        </Alert>
      </Fade>
    </div>
  );
};

export default CalenderPage;
