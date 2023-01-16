import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '../../../contexts/UserContext';

const classesTimeTable = [{
    "Time": "8:00",
    "c1": 'Free',
    "c2": 'QA',
    "c3": 'Free',
    "c4": 'Physics'
}, {
    "Time": "8:30",
    "c1": 'Free',
    "c2": 'QA',
    "c3": 'Free',
    "c4": 'Physics'
}, {
    "Time": "9:00",
    "c1": 'Fullstack-oct',
    "c2": 'QA',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "9:30",
    "c1": 'Fullstack-oct',
    "c2": 'QA',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "10:00",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "10:30",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "11:00",
    "c1": 'Fullstack-oct',
    "c2": 'QA',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "11:30",
    "c1": 'Fullstack-oct',
    "c2": 'QA',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "12:00",
    "c1": 'Fullstack-oct',
    "c2": 'QA',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "12:30",
    "c1": 'Fullstack-oct',
    "c2": 'QA',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "13:00",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "13:30",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "14:00",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "14:30",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "15:00",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "15:30",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "16:00",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "16:30",
    "c1": 'Fullstack-oct',
    "c2": 'Free',
    "c3": 'Fullstack-nov',
    "c4": 'Physics'
}, {
    "Time": "17:00",
    "c1": 'Fullstack-self',
    "c2": 'Fullstack-self',
    "c3": 'Bezeq',
    "c4": 'Physics'
}, {
    "Time": "17:30",
    "c1": 'Fullstack-self',
    "c2": 'Fullstack-self',
    "c3": 'Bezeq',
    "c4": 'Physics'
}, {
    "Time": "18:00",
    "c1": 'Fullstack-self',
    "c2": 'Fullstack-self',
    "c3": 'Bezeq',
    "c4": 'Physics'
}, {
    "Time": "18:30",
    "c1": 'Fullstack-self',
    "c2": 'Fullstack-self',
    "c3": 'Bezeq',
    "c4": 'Physics'
}, {
    "Time": "19:00",
    "c1": 'Fullstack-self',
    "c2": 'Fullstack-self',
    "c3": 'Bezeq',
    "c4": 'Physics'
}, {
    "Time": "19:30",
    "c1": 'Fullstack-self',
    "c2": 'Fullstack-self',
    "c3": 'Bezeq',
    "c4": 'Physics'
}, {
    "Time": "20:00",
    "c1": 'Fullstack-self',
    "c2": 'Fullstack-self',
    "c3": 'Bezeq',
    "c4": 'Physics'
}, {
    "Time": "20:30",
    "c1": 'Fullstack-self',
    "c2": 'Fullstack-self',
    "c3": 'Bezeq',
    "c4": 'Physics'
}]

const slotTimesLookup = {};

classesTimeTable.map((specificTimeData, i, classesTimeTable) => (
    slotTimesLookup[i] = `${specificTimeData.Time}-${classesTimeTable[i + 1]?.Time ? classesTimeTable[i + 1].Time : "21:00"}`
    
))

const slotColumnCommonFields = {
    sortable: false,
    filterable: false,
    pinnable: false,
    minWidth: 180,
    cellClassName: (params) => params.value,
    
};

const rootStyles = {
    width: '50%',
    '& .Fullstack-oct': {
        backgroundColor: 'rgba(157, 255, 118, 0.49)',
    },
    '& .QA': {
        backgroundColor: 'rgba(255, 255, 10, 0.49)',
    },
    '& .Fullstack-nov': {
        backgroundColor: 'rgba(150, 150, 150, 0.49)',
    },
    '& .Free': {
        backgroundColor: 'rgba(255, 150, 150, 0.49)',
    },
    '& .Physics': {
        backgroundColor: 'rgba(10, 150, 255, 0.49)',
    },
    '& .Fullstack-self': {
        backgroundColor: 'rgba(224, 183, 60, 0.55)',
    },
    '& .Bezeq': {
        backgroundColor: 'rgba(200, 150, 255, 0.49)',
    },
};


function getData(classesData){
    let newclassRows=[]
    for (let i = 0; i < 26; i++) {
        newclassRows.push({
            id: i+1,
            time: slotTimesLookup[i],
            slots: ['free','free','free','free']
        })
        
    }
    let newclassColums=[
        {
        field: 'time',
        headerName: 'Time',
        }
    ]
    for (let i = 0; i < classesData.length; i++) {
        newclassColums.push({
            field: `${i}`,
            headerName: classesData[i].className,
            valueGetter: ({ row }) => row.slots[i]
        })
    }
    
    return [newclassColums,newclassRows]
}

export default function ClassesTableByTime() {
    const { classesData } = React.useContext(UserContext);
    const dataCR = getData(classesData)
    console.log(dataCR)
    return (
        <Box sx={rootStyles}>
            <DataGrid
                columns={dataCR[0]}
                rows={dataCR[1]}
                initialState={{
                    pinnedColumns: {
                        left: ['class'],
                    },
                }}
                autoHeight
                disableExtendRowFullWidth
                disableSelectionOnClick
                hideFooter
                showCellRightBorder
                showColumnRightBorder
                disableColumnReorder


            />
        </Box>
    );
}


