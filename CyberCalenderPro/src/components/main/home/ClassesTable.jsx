import * as React from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';

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
classesTimeTable.map((specificTimeData, i, classesTimeTable) =>
    (slotTimesLookup[i] = `${specificTimeData.Time}-${classesTimeTable[i + 1]?.Time ? classesTimeTable[i + 1].Time : "21:00"}`))
//{{0:'08:00-08:30'}, {1:'08:30-09:00'}, {2:'09:00-09:30'}, .... , {25: 20:30-21:00}}

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
            if (nextValue === value && value !== 'Free') {
                colSpan += 1;
            } else {
                break;
            }
        }
        return colSpan;
    },
};

const rootStyles = {
    width: '100%',
    backgroundColor: 'rgba(157, 255, 118, 0.8)',
    '& .Netpes': {
        backgroundColor: "rgba(10, 100, 150, 0.49)"
    },
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
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    size: "fit",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};
const modalBtnStyle = {
    marginTop: '2rem'
}

function isToday(studyCase) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const fYear = today.getFullYear();
    const studyCaseDate = studyCase.date.split(',')
    let studyCaseTimeIndex = 0
    let index = (studyCase.time_range.split(':')[0] - 8) * 2

    if (studyCase.time_range.split(':')[1].charAt(0) === '3') index++

    if (studyCaseDate[0] == fYear && studyCaseDate[1] == month && studyCaseDate[2] == day) studyCaseTimeIndex = index + 1


    return studyCaseTimeIndex


}
function getData(classesData) {
    const classRows = []
    for (let i = 0; i < classesData.length; i++) {
        const classroom = {
            id: i + 1,
            class: classesData[i].className,
            slots: []
        }
        for (let j = 0; j < 26; j++)classroom.slots.push('Free')

        for (const studyCase of classesData[i].date_data) {
            const place = isToday(studyCase)
            if (place) {
                classroom.slots[place - 1] = studyCase.users[0].userName
            }
        }
        classRows.push(classroom)
    }

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

    return [classRows, classColumns]
}


export default function ClassesTable() {
    const { classesData } = React.useContext(UserContext);
    const rowscols = getData(classesData)
    const [open, setOpen] = React.useState(false);
    const [cl, setCl] = React.useState()
    const handleOpen = (eve) => {
        if (eve.value === 'Free') setOpen(true);
        setCl({
            time: rowscols[1][Number(eve.field) + 1].headerName,
            class: rowscols[0][Number(eve.id) - 1]?.class,
        })
    }
    const handleClose = () => setOpen(false);
    return (
        <Box sx={rootStyles}>
            <DataGrid
                columns={rowscols[1]}
                rows={rowscols[0]}
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
                onCellClick={(eve) => handleOpen(eve)}

            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" >Do you wanna learn in {cl?.class} at {cl?.time} ?</Typography>
                    
                    <Box sx={{ display: "flex", justifyContent: 'space-evenly' }}>
                        <Button sx={modalBtnStyle} variant="contained" width="medium">Yes!</Button>
                        <Button sx={modalBtnStyle} onClick={handleClose} variant="contained" size="medium">no</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}