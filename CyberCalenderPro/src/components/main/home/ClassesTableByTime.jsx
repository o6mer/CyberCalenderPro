import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../../../contexts/UserContext';
import { useState } from 'react';


const classesTimeTable = [
    { "Time": "8:00" },
    { "Time": "8:30" },
    { "Time": "9:00" },
    { "Time": "9:30" },
    { "Time": "10:00" },
    { "Time": "10:30" },
    { "Time": "11:00" },
    { "Time": "11:30" },
    { "Time": "12:00" },
    { "Time": "12:30" },
    { "Time": "13:00" },
    { "Time": "13:30" },
    { "Time": "14:00" },
    { "Time": "14:30" },
    { "Time": "15:00" },
    { "Time": "15:30" },
    { "Time": "16:00" },
    { "Time": "16:30" },
    { "Time": "17:00" },
    { "Time": "17:30" },
    { "Time": "18:00" },
    { "Time": "18:30" },
    { "Time": "19:00" },
    { "Time": "19:30" },
    { "Time": "20:00" },
    { "Time": "20:30" }
]
const slotTimesLookup = {};

classesTimeTable.map((specificTimeData, i, classesTimeTable) => (
    slotTimesLookup[i] = `${specificTimeData.Time}-${classesTimeTable[i + 1]?.Time ? classesTimeTable[i + 1].Time : "21:00"}`

))

const slotColumnCommonFields = {
    sortable: false,
    filterable: false,
    pinnable: false,
    minWidth: 100,
    cellClassName: (params) => `Inner-cell ${params.value}`
};

function rootStyles() {
    const { classesData } = React.useContext(UserContext);
    return{
    width: `${classesData.length*100+102}px`,
    backgroundColor: "rgba(10, 100, 150, 0.39)",
    '& .Inner-cell': {
        backgroundColor: 'rgba(157, 255, 118, 0.49)',
    },
    '& .Free': {
        backgroundColor: 'rgba(200, 150, 255, 0.49)',
    },
}
};

function isToday(studyCase) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const fYear = today.getFullYear();
    const studyCaseDate = studyCase.date.split(',')
    let isToday = false
    
    if (studyCaseDate[0] == fYear && studyCaseDate[1] == month && studyCaseDate[2] == day) isToday = true
    return isToday

}

function getData(classesData) {
    let newclassRows = []
    for (let i = 0; i < 26; i++) {
        const timeHalfHour =({
            id: i + 1,
            time: slotTimesLookup[i],
            slots: []
        })
        for (let clssrm = 0; clssrm < classesData.length; clssrm++)timeHalfHour.slots.push('Free')
        for (let clssrm = 0; clssrm < classesData.length; clssrm++){
            for (const studyCase of classesData[clssrm].date_data){
                if (studyCase.time_range===slotTimesLookup[i] && isToday(studyCase) && studyCase.approved===true) {
                    timeHalfHour.slots[clssrm] = studyCase.users[0].userName
                }
            }
        }
        newclassRows.push(timeHalfHour)
    }
    let newclassColums = [
        {
            field: 'time',
            headerName: 'Time',
        }
    ]
    for (let i = 0; i < classesData.length; i++) {
        newclassColums.push({
            field: `${i}`,
            headerName: classesData[i].className,
            valueGetter: ({ row }) => row.slots[i],
            ...slotColumnCommonFields,
        })
    }
    return [newclassColums, newclassRows]
}

export default function ClassesTableByTime() {
    const { classesData } = React.useContext(UserContext);
    console.log(classesData);
    const dataCR = getData(classesData)
    return (
        <div className='flex justify-center w-full py-10'>
            <Box sx={rootStyles}>
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


