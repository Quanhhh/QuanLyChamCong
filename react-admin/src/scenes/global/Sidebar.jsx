import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Dashboard from "../dashboard";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"; 

import { Padding, PeopleOutline, Title } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem active={selected === title} 
        style={{ color: colors.grey[100]}}
        onClick={() => setSelected(title)}
        icon ={icon}
        >
            <Typography>{title}</Typography>
            <Link  to={to} />
        </MenuItem>
    )
}


const Sidebar = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box 
        sx={{ 
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`
            },
            "& .pro-icon-wrapper":{
                backgroundColor: "transparent !important"
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important"
            },
            "& .pro-inner-item:hover": {
                color: "#868dfb !important"
            },
            "& .pro-menu-item.active": {
                color: "#6870fa !important",
            },

         }}
        >
        
        <ProSidebar collapsed={isCollapsed}>
            <Menu iconShape="square">
                {/* LOGO AND MENU */}
                <MenuItem 
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{ 
                    margin: "10px 0 20px 0",
                    color: colors.grey[100],
                 }}
                >
                    {!isCollapsed && (
                        <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                            <Typography variant="h3" color={colors.grey[100]}>ADMIN</Typography>
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcon/>
                            </IconButton>
                        </Box>
                    )}
                </MenuItem>

                {/* USER */}
                {!isCollapsed &&(
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img 
                            alt="profile-user"
                            width="100px"
                            height="100px"
                            src={'../../assets/anime-cat-swimming-4k-wallpaper-uhdpaper.com-868@0@i.jpg'}
                            style={{  cursor: "pointer", borderRadius: "50%" }} 
                            />
                        </Box>

                    <Box textAlign="center">
                        <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ m: "10px 0 0 0" }}
                        >
                            Quang Anh
                        </Typography>
                        <Typography variant="h5" color={colors.greenAccent[500]}>
                            MASCOM ADMIN    
                        </Typography>    
                    </Box>  
                    </Box>
                )}

                {/* Menu item */}
                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                    <Item 
                        title="Dashboard"
                        to="/"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Quản lý nhân viên"
                        to="/team"
                        icon={<PeopleOutline />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Chấm công"
                        to="/chamcong"
                        icon={<BarChartOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                     <Item 
                        title="Tài liệu"
                        to="/documentt"
                        icon={<ArticleOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item 
                        title="Lịch trình"
                        to="/calendar"
                        icon={<CalendarTodayOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Box>
            </Menu>
        </ProSidebar>

        </Box>
    );
};

export default Sidebar;