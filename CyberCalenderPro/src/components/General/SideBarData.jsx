import React, { useState } from "react";
import * as MuiIcons from "@mui/icons-material";

export const SidebarData = (user) => {
  const SidebarDataLinks = [
    {
      title: "Schedule",
      path: "/",
      icon: <MuiIcons.EventNote />,
    },
    {
      title: "Class view",
      path: "/classview",
      icon: <MuiIcons.MeetingRoom />,
    },
  ];

  // adding User
  if (user) {
    SidebarDataLinks.unshift({
      title: "Profile",
      path: "/Profile/" + user,
      icon: <MuiIcons.Person />,
    });

    SidebarDataLinks.push({
      title: "Logout",
      path: "/",
      icon: <MuiIcons.Logout />,
    });
  } else {
    SidebarDataLinks.unshift({
      title: "Login",
      path: "/Login",
      icon: <MuiIcons.Login />,
    });
  }
  // adding User

  return SidebarDataLinks;
};
