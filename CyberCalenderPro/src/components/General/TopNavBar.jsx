import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SidebarData } from "./SideBarData";

export default function TopNavBar() {
  const links = SidebarData('roei');
  const [dropDown, setDropDown] = React.useState(false);

  const toggleDrawer = () => { setDropDown(!dropDown); };

  return (
    <div>
      <React.Fragment key='ooo'>
        <Button onClick={()=>toggleDrawer()}>7</Button>
        <Drawer
          anchor='top'
          open={dropDown}
          onClose={()=>toggleDrawer()}
          sx={{zIndex:100}}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={()=>toggleDrawer()}
          >
            <List>
              {links?.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>

                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
    //   {['top'].map((anchor) => (
    //     <React.Fragment key='ooo'>
    //       <Button onClick={toggleDrawer()}>456</Button>
    //       <Drawer
    //         anchor={anchor}
    //         open={dropDown}
    //         onClose={toggleDrawer()}
    //       >
    //         {list('top')}
    //       </Drawer>
    //     </React.Fragment>
    //   ))}
    // </div>
  );
}