import React from 'react';
import { Box, Container, Typography, Button } from "@mui/material"
import { Link } from 'react-router-dom';



const Greeting = () => {
    return (
        <Box
            className="section"
            sx={{
                backgroundImage: "url('./images/background-big.jpg')",  // Замените URL на реальный URL изображения
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFF",
                textAlign: "center",
            }}
        >
            <Container>
                <Typography
                    variant="h3"
                    fontWeight={"bold"}
                    mb={5}
                    gutterBottom
                    style={{
                        color: "#FFFFFF",
                        WebkitTextStroke: "0.2px #FFFFFF",
                        TextStroke: "0.2px #FFFFFF"
                    }}
                >
                    Hайди себя и новую профессию в Learnify
                </Typography>
                <Link to="/courses">
                    <Button
                        href="#applyNowForm"
                        variant="contained"
                        sx={{
                            background: "#12161F",
                            fontWeight: "bold",
                            fontSize: '1.2rem'
                        }}>
                        Применить сейчас
                    </Button>
                </Link>
            </Container>
        </Box>
    );
};

export default Greeting;