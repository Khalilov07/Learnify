import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    InputAdornment,
    Paper,
    CardMedia,
    Tooltip,
    IconButton
} from '@mui/material';

import { Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getData } from '../../services/queries';



const categories = ["All", "UX/UI", "Java-Script", "Python"];

const CoursePage = () => {
    const [filter, setFilter] = useState('');
    const [visibleEvents, setVisibleEvents] = useState(4);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [data, setData] = useState([])

    useEffect(() => {
        getData()
            .then((res) => setData(res.data))
    }, [])

    const filteredEvents = data.filter(
        (course) =>
            (selectedCategory === 'All' || course.category === selectedCategory) &&
            (course.title.toLowerCase().includes(filter.trim().toLowerCase()) ||
                course.category.toLowerCase().trim().includes(filter.trim().toLowerCase()))
    );

    const loadMoreEvents = () => {
        setVisibleEvents((prev) => prev + 4);
    };

    return (
        <Box sx={{ width: '85%', margin: '0 auto', padding: '50px 0' }}>
            <Typography textAlign={"center"} color={"#022139"} variant="h3" gutterBottom>
                Здесь, <br /> вы можете просмотреть наши <span style={{ color: "#1565C0" }} >Курсы</span>
            </Typography>
            <Typography sx={{ opacity: "0.9" }} textAlign={"center"} variant="subtitle1" letterSpacing={"1px"} gutterBottom>
                Множество полезных ресурсов.
            </Typography>

            {/* Фильтр и поиск */}
            <Box marginBottom={2} mt={20} textAlign="center">
                <TextField
                    label="Search"
                    variant="outlined"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* Кнопки фильтрации по категории */}
            <Box marginBottom={2} display='flex' justifyContent='center' flexWrap='wrap' gap={2} textAlign="center">
                {categories.map((category) => (
                    <Button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        variant={selectedCategory === category ? 'contained' : 'outlined'}
                    >
                        {category}
                    </Button>
                ))}
            </Box>

            {/* Курсы */}
            <Grid container spacing={2}>
                {filteredEvents.slice(0, visibleEvents).map((event) => (
                    <Grid component={Link} to={`/course/${event.id}`} sx={{ cursor: 'pointer' }} key={event.id} item xs={12} sm={6} md={6}>
                        <Tooltip sx={{ padding: '10px 10px 20px', '& .MuiTooltip-tooltip': { fontSize: '11rem' } }} title="Подробнее...">
                            <Paper>
                                <img src={`./images/${event.image}`} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', padding: "10px" }} />
                                <Typography variant="h6">{event.title}</Typography>
                                <Typography color="textSecondary">{event.category}</Typography>
                            </Paper>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>

            {/* Кнопка "Ещё" */}
            {visibleEvents < data.length && (
                <Box display="flex" justifyContent="center" marginTop={3}>
                    <Button
                        onClick={loadMoreEvents}
                        variant="contained"
                        sx={{
                            background: 'primary',
                            fontSize: '1rem',
                            textTransform: 'none',
                        }}
                    >
                        Load more
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CoursePage;
