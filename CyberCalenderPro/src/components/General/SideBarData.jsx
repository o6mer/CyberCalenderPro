import React, { useState } from "react";
import * as MuiIcons from '@mui/icons-material'
import { Link } from "react-router-dom";

export const SidebarData = [
    {
        title: 'Login',
        path: '/Login',
        icon: <MuiIcons.Person />,
        className: 'nav-text'
    },
    {
        title: 'Admin',
        path: '/',
        icon: <MuiIcons.ManageAccounts />,
        className: 'nav-text'
    },
    {
        title: 'Schedule',
        path: '/',
        icon: <MuiIcons.EventNote />,
        className: 'nav-text'
    },
    {
        title: 'Classrooms',
        path: '/',
        icon: <MuiIcons.MeetingRoom />,
        className: 'nav-text'
    },
    
]