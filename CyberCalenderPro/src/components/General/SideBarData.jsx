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
        path: '/clas',
        icon: <MuiIcons.MeetingRoom />,
    },
]

// adding User
if(user){
console.log(user==='Roei Zaro')
SidebarDataLinks.unshift({
    title: 'Profile',
    path: '/Profile/'+user,
    icon: <MuiIcons.Person />,
},)

SidebarDataLinks.push({
    title: 'Logout',
    path: '/Profile/'+user,
    icon: <MuiIcons.Logout />,
},)
}

else{
SidebarDataLinks.unshift({
    title: 'Login',
    path: '/Login',
    icon: <MuiIcons.Person />,
},)
}
// adding User

return SidebarDataLinks

}
