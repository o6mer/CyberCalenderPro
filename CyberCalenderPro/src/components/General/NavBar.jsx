import React, { useState } from "react";
import * as MuiIcons from '@mui/icons-material'
import { Link } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import "./NavBar.css"

function NavBar() {
    const [sidebar, setSidebar] = useState('false')

    const changeSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars" >

                </Link>
            </div>
            <nav className={sidebar ? "nav-menu1" : "nav-menu2"}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars" onClick={changeSidebar}>
                            {!sidebar ? <MuiIcons.ViewList /> : <MuiIcons.Apps />}
                        </Link>
                    </li>

                    {SidebarData.map((item, i) => {
                        return (
                            <li key={i} className={item.className} id="sidebarItem">
                                <Link to={item.path}>
                                    {item.icon}
                                    <span className="sidebarTxt" onClick={changeSidebar}>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        </>
    )
}

export default NavBar;