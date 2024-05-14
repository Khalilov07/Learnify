import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Container } from '@mui/material';

const reviews = [
    {
        id: 1,
        name: 'John Doe',
        rating: 5,
        comment: 'Great product! I love it.',
    },
    {
        id: 2,
        name: 'Jane Smith',
        rating: 4,
        comment: 'Good service. Will recommend to others.',
    },
    {
        id: 3,
        name: 'Alex Johnson',
        rating: 3,
        comment: 'Okay. Could be better.',
    },
    {
        id: 3,
        name: 'Alex Johnson',
        rating: 3,
        comment: 'Okay. Could be better.',
    },
    {
        id: 3,
        name: 'Alex Johnson',
        rating: 3,
        comment: 'Okay. Could be better.',
    },
    {
        id: 3,
        name: 'Alex Johnson',
        rating: 3,
        comment: 'Okay. Could be better.',
    },
    // Add more reviews as needed
];

const Reviews = () => {
    return (
        <Box className="section" padding="50px 0">
            <Container sx={{ width: "85%" }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        letterSpacing: "1.5px",
                        fontWeight: "bold"
                    }}
                >

                    Раскрытие опыта обучения своими глазами
                </Typography>
                <Box
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    {reviews.map((review) => (
                        <Box
                            key={review.id}
                            sx={{
                                margin: "0 auto",
                                marginBottom: 3,
                                width: '300px',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                transition: 'box-shadow 0.3s ease',
                                '&:hover': {
                                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
                                },
                                mt: 5
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                {review.name}
                            </Typography>
                            <Rating value={review.rating} readOnly />
                            <Typography variant="body1" sx={{ marginTop: 1 }}>
                                {review.comment}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Container >
        </Box >
    );
};

export default Reviews;
