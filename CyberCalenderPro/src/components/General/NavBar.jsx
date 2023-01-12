import { Link, NavLink } from "react-router-dom";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import * as MuiIcons from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SidebarData } from "./SideBarData";
import TopNavBar from "./TopNavBar";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// const TopDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(

export default function NavBar({ children }) {
  const theme = useTheme();
  const links = SidebarData();
  //  const {user} = React.useContext(UserContext);
  const [open, setOpen] = React.useState(0);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [dropDown, setDropDown] = React.useState(false);
  const toggleDrawer = () => {
    console.log(dropDown);
    setDropDown(!dropDown);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/*TopBar*/}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              display: open ? "none" : { xs: "none", sm: "block" },
            }}
          >
            <MuiIcons.Menu />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{
              marginRight: 2,
              display: { xs: "block", sm: "none" },
            }}
          >
            <MuiIcons.KeyboardArrowDown />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Headline
          </Typography>
        </Toolbar>
      </AppBar>
      {/*TopBar*/}

      {/*Bars*/}
      {/*vvBars*-SideBarvv*/}
      <Drawer
        variant="permanent"
        open={open}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <MuiIcons.ChevronRight />
            ) : (
              <MuiIcons.ChevronLeft />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((item, index) => (
            <NavLink to={item.path} key={index}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      {/*^^Bars-SideBar^^*/}

      {/*vvBars*-UpBarvv*/}

      <React.Fragment key="top-dog">
        <MuiDrawer
          anchor="top"
          open={dropDown}
          onClose={toggleDrawer}
          sx={{ zIndex: theme.zIndex.drawer + 1 }}
        >
          <Box
            sx={{ width: "100vw" }}
            role="presentation"
            onClick={toggleDrawer}
          >
            <List>
              {links.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>

                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </MuiDrawer>
      </React.Fragment>
      {/*^^Bars*-UpBar^^*/}
      {/*Bars*/}

      {/*MainPage*/}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
      {/*MainPage*/}
    </Box>
  );
}