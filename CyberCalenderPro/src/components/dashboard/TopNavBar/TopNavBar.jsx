import { Avatar } from "@mui/material";
import React from "react";

const TopNavBar = () => {
  return (
    <nav className="flex w-full justify-end bg-thirdy p-2">
      <button className="justify-self-end">
        <Avatar alt="Cindy Baker" sx={{ backgroundColor: "#1E2022" }}>
          US
        </Avatar>
      </button>
    </nav>
  );
};

export default TopNavBar;
