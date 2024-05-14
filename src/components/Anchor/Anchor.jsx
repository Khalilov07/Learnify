import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { ArrowUpward } from '@material-ui/icons';

const Anchor = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <IconButton
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 30,
                zIndex: 1000,
                background: "#1976D2",
                color: "#FFF",
                display: isVisible ? 'flex' : 'none',
                '&:hover': {
                    background: "#1565c0", // изменяем цвет при наведении
                },
            }}
            onClick={scrollToTop}
        >
            <ArrowUpward />
        </IconButton>
    );
};

export default Anchor;
