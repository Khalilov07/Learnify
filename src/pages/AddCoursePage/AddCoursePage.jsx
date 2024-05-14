import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, InputLabel, OutlinedInput } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Navigate, NavigationType, useNavigate } from 'react-router-dom';


const AddCoursePage = () => {
    const [courseTitle, setCourseTitle] = useState('');
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [videoFile, setVideoFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleCourseTitleChange = (event) => {
        setCourseTitle(event.target.value);
    };

    const handleCourseCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    const handleTimeChange = (e) => {
        setTime(e.target.value)

    }

    const handleVideoFileChange = (event) => {
        const file = event.target.files[0];
        setVideoFile(file.name);
    };

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file.name);
        // console.log(file.name);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        // Создание объекта FormData для отправки данных на сервер

        const newData = {
            title: courseTitle,
            category: category,
            description: description,
            video: videoFile,
            image: imageFile,
            date: date,
            time: time
        }

        console.log(newData);

        axios.post("http://localhost:8080/courses", newData)
            .then(res => {
                setCourseTitle("")
                setDescription("")
                setVideoFile("")
                setImageFile("")
                navigate("/courses")
            })

    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Typography variant="h4" gutterBottom>Добавление курса</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="course-title"
                        label="Название"
                        variant="outlined"
                        value={courseTitle}
                        onChange={handleCourseTitleChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                     <TextField
                        id="course-category"
                        label="Категория"
                        variant="outlined"
                        value={category}
                        onChange={handleCourseCategoryChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                        fullWidth
                        margin="normal"
                    />

                    <Box display={"flex"} justifyContent={"space-between"}>
                        <TextField
                            id="date"
                            onChange={handleDateChange}
                            variant="outlined"
                            type='date'
                            required
                            margin="normal"
                        />
                        <TextField
                            id="time"
                            onChange={handleTimeChange}
                            variant="outlined"
                            type='time'
                            required
                            margin="normal"
                        />
                    </Box>

                    <Box display={"flex"} justifyContent={"space-between"} >
                        <Box>
                            <TextField
                                accept="image/*"
                                variant="outlined"
                                id="image-file"
                                type="file"
                                onChange={handleImageFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="image-file">
                                <Button variant="outlined" component="span" color="primary" style={{ margin: '20px 0' }}>
                                    Выбрать фото
                                </Button>
                            </label>
                            {imageFile && <Typography variant="body1">{imageFile}</Typography>}
                        </Box>
                        <Box>
                            <TextField
                                accept="video/*"
                                id="video-file"
                                type="file"
                                variant="outlined"
                                onChange={handleVideoFileChange}
                                style={{ display: 'none' }}
                                sx={{ marginLeft: "20px" }}
                            />
                            <label htmlFor="video-file">
                                <Button variant="outlined" component="span" color="primary" style={{ margin: '20px 0' }}>
                                    Выбрать видео
                                </Button>
                            </label>
                            {videoFile && <Typography variant="body1">{videoFile}</Typography>}
                        </Box>
                    </Box>

                    <Button type="submit" variant="contained" color="primary" style={{ margin: '20px 0' }}>
                        Добавить курс
                    </Button>

                    {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
                    {successMessage && <Typography variant="body2" color="primary">{successMessage}</Typography>}
                </form>
            </Grid>
        </Grid>
    );
};

export default AddCoursePage;
