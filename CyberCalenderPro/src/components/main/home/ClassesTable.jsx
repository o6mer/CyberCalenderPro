import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

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
}]

const slotTimesLookup = {};
const classRows = []
let i = 1
for (const key in classesTimeTable[0]) {
    if (key !== 'Time') {
        classRows.push({
            id: i,
            class: key,
            slots: []
        })
        i++
    }
}

classesTimeTable.map((specificTimeData, i, classesTimeTable) => (
    slotTimesLookup[i] = `${specificTimeData.Time}-${classesTimeTable[i + 1]?.Time ? classesTimeTable[i + 1].Time : "20:00"}`,
    classRows.forEach(classData => {
        classData.slots.push(specificTimeData[classData.class])
    })
))

const slotColumnCommonFields = {
    sortable: false,
    filterable: false,
    pinnable: false,
    minWidth: 140,
    cellClassName: (params) => params.value,
    colSpan: ({ row, field, value }) => {
        const index = Number(field);
        let colSpan = 1;
        for (let i = index + 1; i < row.slots.length; i += 1) {
            const nextValue = row.slots[i];
            if (nextValue === value) {
                colSpan += 1;
            } else {
                break;
            }
        }
        return colSpan;
    },
};

const classColumns = [
    {
        field: 'class',
        headerName: 'Class',
    }
];

for (let i = 0; i < classesTimeTable.length; i++) {
    classColumns.push({
        field: `${i}`,
        headerName: slotTimesLookup[i],
        valueGetter: ({ row }) => row.slots[i],
        ...slotColumnCommonFields,
    })
}

const rootStyles = {
    width: '100%',
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

export default function ClassesTable() {
    return (
        <Box sx={rootStyles}>
            <DataGrid
                columns={classColumns}
                rows={classRows}
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
