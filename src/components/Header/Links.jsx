import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, MenuItem, Menu, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/userSlice';

const Links = () => {
    const menuItems = [
        { label: 'Главная', to: '/' },
        { label: 'Курсы', to: '/courses' },
        { label: 'Авторизация', to: '/login' }
    ];

    const menuItemsAccAdmin = [
        { label: 'Главная', to: '/' },
        { label: 'Курсы', to: '/courses' },
        { label: 'Добавления', to: '/addcourse' }
    ];

    const menuItemsAccUser = [
        { label: 'Главная', to: '/' },
        { label: 'Курсы', to: '/courses' },
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const Exit = () => {
        dispatch(logOut())
        navigate("/")
    }

    const { user } = useSelector(user => user.user)

    return (
        <Box>
            {user === null ?
                <>

                    {menuItems.map((item, index) => (
                        <ListItem disablePadding key={index}>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText>
                                    <Link style={{ color: "#000" }} to={item.to}>
                                        {item.label}
                                    </Link>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}


                </>
                :
                <>
                    {user && user.status ?
                        <>
                            {menuItemsAccAdmin.map((item, index) => (
                                <ListItem disablePadding key={index}>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText>
                                            <Link style={{ color: "#000" }} to={item.to}>
                                                {item.label}
                                            </Link>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <ListItem disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText onClick={() => Exit()} style={{ color: "#000" }}>
                                        Logout
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </>
                        :
                        <>
                            {menuItemsAccUser.map((item, index) => (
                                <ListItem disablePadding key={index}>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText>
                                            <Link style={{ color: "#000" }} to={item.to}>
                                                {item.label}
                                            </Link>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            <ListItem disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText onClick={() => Exit()} style={{ color: "#000" }}>
                                        Logout
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </>
                    }
                </>
            }
        </Box>
    );
};

export default Links;
