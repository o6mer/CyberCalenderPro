import React, { useState } from "react";
import * as MuiIcons from "@mui/icons-material";
import { Modal } from "@mui/material";

export const SidebarData = (user) => {
  const SidebarDataLinks = [
    {
      title: "Edit",
      path: <Modal/>,
      icon: <MuiIcons.Edit />,
    },
    {
      title: "Schedule",
      path: "/main",
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
