import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import { Check } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getData } from '../../../services/queries';

const FeatureBlock = ({ title, description, date, time }) => {

    return (
        <Grid item xs={12} md={6} lg={3}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',

                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
                    },

                }}
            >
                <Check
                    style={{
                        color: '#4CAF50',
                        fontSize: 40,
                        marginBottom: 20,
                        animation: 'fadeIn 1s ease-in-out',
                    }}
                />
                <Typography
                    variant="h5"
                    gutterBottom
                >
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" pt={1}>
                    {date}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" pt={1}>
                    {time}
                </Typography>
            </Paper>
        </Grid >
    );
};

const Course = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        getData()
            .then(res => setData(res.data))
    }, []);

    return (
        <Box sx={{ backgroundColor: '#f8f8f8', py: 10 }}>
            <Container sx={{ width: '85%', textAlign: "center" }}>
                <Grid container spacing={3} mb={3}>
                    {data.slice(0, 4).map((feature, index) => (
                        <FeatureBlock
                            key={index}
                            {...feature}
                        />
                    ))}
                </Grid>
                <Link to="/courses" style={{ textDecoration: 'none' }}>
                    <Button variant='outlined'>
                        <Typography variant="body1" color="primary">
                            ALL COURSES
                        </Typography>
                    </Button>
                </Link>
            </Container>
        </Box>
    );
};

export default Course;
