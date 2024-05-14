import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Links from './Links';
import { useDispatch, useSelector } from 'react-redux';
import { MenuSharp, AccountCircle } from '@material-ui/icons';

import { logOut } from '../../store/userSlice';
import { Alert, Snackbar, Avatar, Menu, MenuItem, ListItemIcon } from '@mui/material';

const drawerWidth = 280;

const links = [
    { label: 'Главная', to: '/' }, ,
    { label: 'Курсы', to: '/courses' },
    { label: 'Регистрация', to: '/register' },
    { label: 'Авторизация', to: '/login' },
];

const linksAccAdmin = [
    { label: 'Главная', to: '/' }, ,
    { label: 'Курсы', to: '/courses' },
    { label: 'Добавить курс', to: '/addcourse' }
];

const linksAccUser = [
    { label: 'Главная', to: '/' }, ,
    { label: 'Курсы', to: '/courses' },
];

const Header = (props) => {

    const { user } = useSelector(user => user.user)

    console.log(user);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const Exit = () => {
        setOpen(true)
        dispatch(logOut())
        navigate("/")
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Learnify
            </Typography>
            <Divider />
            <List>
                <Links />
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', position: "sticky", zIndex: 99 }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar
                    sx={{
                        background: '#12161F',
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end'
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuSharp />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Learnify
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {user === null ?
                            <>
                                {links.map(link => (
                                    <Button component={Link} to={`${link.to}`} sx={{ color: '#fff', fontWeight: "bold", letterSpacing: "1px" }}>
                                        {link.label}
                                    </Button>
                                ))}
                            </>
                            :
                            <>
                                {user && user.status ?
                                    <>
                                        {linksAccAdmin.map(link => (
                                            <Button key={link.id} component={Link} to={`${link.to}`} sx={{ color: '#fff', fontWeight: "bold", letterSpacing: "1px" }}>
                                                {link.label}
                                            </Button>
                                        ))}
                                    </>
                                    :
                                    <>
                                        {linksAccUser.map(link => (
                                            <Button key={link.id} component={Link} to={`${link.to}`} sx={{ color: '#fff', fontWeight: "bold", letterSpacing: "1px" }}>
                                                {link.label}
                                            </Button>
                                        ))}
                                    </>
                                }
                                <IconButton
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem onClick={handleMenuClose}>
                                        <Typography textAlign={"center"} variant="inherit">Имя: {user.name}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={Exit}>
                                        <ListItemIcon>
                                            <AccountCircle fontSize="small" />
                                        </ListItemIcon>
                                        <Typography variant="inherit">Выйти</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        }

                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'flex', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 0 }}>
                <Toolbar />
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    You're exit!
                </Alert>
            </Snackbar>
        </Box>
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Header;
