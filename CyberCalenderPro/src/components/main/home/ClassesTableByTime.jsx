import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { UserContext } from "../../../contexts/UserContext";
import { useState } from "react";

const classesTimeTable = [
  { Time: "8:00" },
  { Time: "8:30" },
  { Time: "9:00" },
  { Time: "9:30" },
  { Time: "10:00" },
  { Time: "10:30" },
  { Time: "11:00" },
  { Time: "11:30" },
  { Time: "12:00" },
  { Time: "12:30" },
  { Time: "13:00" },
  { Time: "13:30" },
  { Time: "14:00" },
  { Time: "14:30" },
  { Time: "15:00" },
  { Time: "15:30" },
  { Time: "16:00" },
  { Time: "16:30" },
  { Time: "17:00" },
  { Time: "17:30" },
  { Time: "18:00" },
  { Time: "18:30" },
  { Time: "19:00" },
  { Time: "19:30" },
  { Time: "20:00" },
  { Time: "20:30" },
];
const slotTimesLookup = {};

classesTimeTable.map(
  (specificTimeData, i, classesTimeTable) =>
    (slotTimesLookup[i] = `${specificTimeData.Time}-${
      classesTimeTable[i + 1]?.Time ? classesTimeTable[i + 1].Time : "21:00"
    }`)
);

const slotColumnCommonFields = {
  sortable: false,
  filterable: false,
  pinnable: false,
  minWidth: 100,
  cellClassName: (params) => `Inner-cell ${params.value}`,
};
function notInArr(arr, val) {
  for (let j = 0; j < arr.length; j++)if (arr[j] === val) return 0;
  return 1;
}

function rootStyles(classroomsSchedule) {
  const { classesData } = React.useContext(UserContext);
  const colors = [{backgroundColor:'rgba(200, 150, 255, 0.49)'}, {backgroundColor:'rgba(16, 150, 255, 0.49)'}, {backgroundColor:'rgba(200, 150, 0, 0.49)'}, {backgroundColor:'rgba(200, 10, 255, 0.39)'}, {backgroundColor:'rgba(10, 110, 10, 0.39)'}, {backgroundColor:'rgba(120, 10, 10, 0.39)'}]
  const styles = {
    width: `${classesData.length * 100 + 102}px`,
    backgroundColor: "#C9D6DF",
    
    '& .Free': {
      backgroundColor: 'white',
    },
  }
  const names = []
  classroomsSchedule.map(room => {
    for (let i = 0; i < 4; i++) {
      if (room.slots[i] !== 'Free' && notInArr(names, room.slots[i]))
        names.push(room.slots[i])
    }
  })
  for (let index = 0; index < names.length; index++) {
    styles[`& .${names[index]?.split(' ')[0]}`] = colors[index]

  }
  return styles
};


function isToday(studyCase) {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const fYear = today.getFullYear();
  const studyCaseDate = studyCase.date.split(",");
  let isToday = false;

  if (
    studyCaseDate[0] == fYear &&
    studyCaseDate[1] == month &&
    studyCaseDate[2] == day
  )
    isToday = true;
  return isToday;
}

function getData(classesData) {
  let newclassRows = [];
  for (let i = 0; i < 26; i++) {
    const timeHalfHour = {
      id: i + 1,
      time: slotTimesLookup[i],
      slots: [],
    };
    for (let clssrm = 0; clssrm < classesData.length; clssrm++)
      timeHalfHour.slots.push("Free");
    for (let clssrm = 0; clssrm < classesData.length; clssrm++) {
      for (const studyCase of classesData[clssrm].date_data) {
        if (
          studyCase.time_range === slotTimesLookup[i] &&
          isToday(studyCase) &&
          studyCase.approved === true
        ) {
          timeHalfHour.slots[clssrm] = studyCase.users[0].userName;
        }
      }
    }
    newclassRows.push(timeHalfHour);
  }
  let newclassColums = [
    {
      field: "time",
      headerName: "Time",
    },
  ];
  for (let i = 0; i < classesData.length; i++) {
    newclassColums.push({
      field: `${i}`,
      headerName: classesData[i].className,
      valueGetter: ({ row }) => row.slots[i],
      ...slotColumnCommonFields,
    });
  }
  return [newclassColums, newclassRows];
}

export default function ClassesTableByTime() {
  const { classesData } = React.useContext(UserContext);
  const dataCR = getData(classesData);
  
  return (
    <div className="flex justify-center w-full py-10">
      <Box sx={rootStyles(dataCR[1])}>
        <DataGrid
          columns={dataCR[0]}
          rows={dataCR[1]}
          autoHeight
          // disableExtendRowFullWidth
          disableSelectionOnClick
          hideFooter
          showCellRightBorder
          // showColumnRightBorder
          disableColumnReorder
        />
      </Box>
    </div>
  );
}
