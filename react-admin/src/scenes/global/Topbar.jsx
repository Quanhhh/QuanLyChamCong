import { Box, IconButton, useTheme, Menu, MenuItem, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // State cho menu thông báo
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleNotificationsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSettingsClick = () => {
        window.location.href = "/settings";
    };

    const handleProfileClick = () => {
        window.location.href = "/profile";
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* Search bar */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>

                {/* Thông báo */}
                <IconButton onClick={handleNotificationsClick}>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <Typography variant="body2">Bạn có 3 thông báo mới</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        🔔 Nhắc nhở họp lúc 10h sáng
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                    🔔 Bạn có tin nhắn mới 
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                    🔔 Công việc "Xây dựng UI" đã hoàn thành
                    </MenuItem>
                </Menu>

                {/* Cài đặt */}
                <IconButton onClick={handleSettingsClick}>
                    <SettingsOutlinedIcon />
                </IconButton>

                {/* Hồ sơ cá nhân */}
                <IconButton onClick={handleProfileClick}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
