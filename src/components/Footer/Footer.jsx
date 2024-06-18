import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@material-ui/icons';



const Footer = () => {

    const [isVisible, setIsVisible] = useState(false)

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
        <Box component="footer" sx={{ mt: '50px', backgroundColor: '#12161F', color: '#fff' }}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" component="div">
                            О нас
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Миссия Learnify — дать возможность каждому быть актуальным и
                            востребованным специалистом прямо сейчас. Вне зависимости от возраста и географии.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" component="div">
                            Быстрые ссылки
                        </Typography>
                        <Button component={Link} onClick={() => scrollToTop()} to="/" color="inherit" sx={{ display: 'block', mt: 1 }}>
                            Главная
                        </Button>
                        <Button component={Link} onClick={() => scrollToTop()} to="/courses" color="inherit" sx={{ display: 'block', mt: 1 }}>
                            Курсы
                        </Button>
                        <Button component={Link} onClick={() => scrollToTop()} to="/addCourse" color="inherit" sx={{ display: 'block', mt: 1 }}>
                            Добавить курс
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" component="div">
                            Контакты
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Ажыбек-Баатыра 1/1a
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            learnifykg.@gmail.com
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            KG  996 (224) 446-655  
                        </Typography>
                        <IconButton
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            aria-label="Facebook"
                            sx={{ mr: 1, mt: 2 }}
                        >
                            <Facebook />
                        </IconButton>
                        <IconButton
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            aria-label="Twitter"
                            sx={{ mr: 1, mt: 2 }}                        >
                            <Twitter />
                        </IconButton>
                        <IconButton
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            aria-label="Instagram"
                            sx={{ mr: 1, mt: 2 }}
                        >
                            <Instagram />
                        </IconButton>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ p: 2, color: "#FFF" }}>
                        © {new Date().getFullYear()} Learnify. Все права защищены.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;