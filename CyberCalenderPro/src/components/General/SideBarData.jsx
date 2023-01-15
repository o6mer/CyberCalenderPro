import React, { useState } from "react";
import * as MuiIcons from '@mui/icons-material'

export const SidebarData = (user)=>{

    const SidebarDataLinks = [
        {
            title: 'Schedule',
            path: '/',
            icon: <MuiIcons.EventNote />,
        },
        {
        title: 'Class view',
        path: '/classview',
        icon: <MuiIcons.MeetingRoom />,
    },
]

// adding User
user?SidebarDataLinks.unshift({
    title: user,
    path: '/',
    icon: <MuiIcons.Person />,
},)
:
SidebarDataLinks.unshift({
    title: 'Login',
    path: '/Login',
    icon: <MuiIcons.Person />,
},)
// adding User

return SidebarDataLinks

}
