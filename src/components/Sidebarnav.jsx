import React from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { RxDashboard } from 'react-icons/rx';
import { BsCalendarPlus } from 'react-icons/bs';
import Tooltip from '@mui/material/Tooltip';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';

import Image from './logo.png';
import Home from './Home';
import Shorts from './Shorts';
import { Link } from 'react-router-dom';
import AddUser from './AddUser';

// export const AppContext = createContext(null);
const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    },
    paper: {
        background: "blue"
    }
});

const drawerWidth = 180;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const theme = createTheme({
    direction: 'rtl'
});

export default function Sidebarnav() {

    // console.log(theme.direction);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const [open, setOpen] = React.useState(false);
    const [menudata, setMenudata] = React.useState("Home");
    const [bgColor, setBgColor] = React.useState({ display: 'block' });
    const listBgColorClass = bgColor == { display: 'block', background: 'red' } ? { display: 'block', background: 'red' } : { display: 'block' };
    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // }; 

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    return (
        <>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    {/* <AppBar position="fixed" elevation={4} sx={{ background: "#FF1E00", color: "white" }}> */}

                    <AppBar position="fixed" elevation={4} sx={{ background: "#19b2ff", color: "white" }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => { setOpen(!open) }}
                                edge="start"

                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                {/* <img src={Image} alt="" height={60} /> */}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                                <Tooltip title="Notification" placement='bottom' arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                    >
                                        <Badge badgeContent={17} color="primary" size="small">
                                            <NotificationsIcon size='small' />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="My profile" placement='bottom' arrow>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                        {renderMobileMenu}
                        {renderMenu}
                    </AppBar>

                    {/* <Drawer variant="permanent" open={open} anchor="right"
                        dir="rtl"> */}
                        <Drawer variant="permanent" open={open}>
                        <DrawerHeader>

                            <IconButton onClick={handleDrawerClose}>
                                {/* {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
                                {/* { theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />
                                    } */}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List>
                            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
                                <Tooltip title="Dashboard" disableHoverListener={open} placement="right">
                                    <ListItem key={"Dashboard"} disablePadding sx={listBgColorClass} onClick={() => { setMenudata("Dashboard") }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <RxDashboard />
                                                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                            </ListItemIcon>
                                            <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Tooltip>
                            </Link>
                            <Link to={"/leave-booking"} style={{ textDecoration: "none", color: "inherit" }}>
                                <Tooltip title="Add Form" disableHoverListener={open} placement="right">
                                    <ListItem key={"Report"} disablePadding sx={listBgColorClass} onClick={() => { setMenudata("Report"); setBgColor({ display: 'block', background: 'red' }) }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <BsCalendarPlus />
                                                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                            </ListItemIcon>
                                            <ListItemText primary={"Booking"} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                </Tooltip>
                            </Link>
                            {/* <Link to={"/users"} style={{ textDecoration: "none", color: "inherit" }}>
                            <ListItem key={"Report"} disablePadding sx={listBgColorClass} onClick={() => { setMenudata("Users"); setBgColor({ display: 'block', background: 'red' }) }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <TbUsers />
                                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} 
                                    </ListItemIcon>
                                    <ListItemText primary={"Users"} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link> */}
                        </List>
                        <Divider />
                    </Drawer>

                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        {menudata === "Dashboard" && <Home />}
                        {menudata === "Report" && <Shorts />}
                        {menudata === "Users" && <AddUser />}
                    </Box>
                </Box>

        </>
    );

}