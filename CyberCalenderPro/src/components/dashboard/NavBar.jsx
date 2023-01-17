import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../../contexts/UserContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useUserHandle } from "../../hooks/useUserHandle";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(UserContext);
  const { logout } = useUserHandle();
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClicked = () => {
    logout();
  };
  return (
    <nav className="flex grow p-4 items-center justify-between bg-fourth overflow-x-hidden">
      <p className="text-xl font-bold text-white">Dashboard</p>
      <Avatar
        sx={{ bgcolor: "white", color: "black", cursor: "pointer" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {user.userName?.slice(0, 2)}
      </Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={onLogoutClicked}>Logout</MenuItem>
      </Menu>
    </nav>
  );
};

export default NavBar;
