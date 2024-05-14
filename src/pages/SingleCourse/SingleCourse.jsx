import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addComment, changeCourse, editCourse, getOneCourse, removeCourse } from '../../services/queries';
import { useSelector } from 'react-redux';

const SingleCourse = () => {

    const [course, setCourse] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [videoFile, setVideoFile] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        getOneCourse(id)
            .then(res => {
                setCourse(res.data);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setDate(res.data.date);
                setTime(res.data.time);
                setVideoFile(res.data.video);
                setComments(res.data.comments)
                console.log(res.data.video);
            });
    }, []);


    const deleteCourse = () => {
        removeCourse(id)
            .then(res => {

                navigate("/courses")
            })
    }

    const editCourse = (id) => {

        const newData = {
            title,
            description,
            video: videoFile,
            time,
            date
        }

        changeCourse(id, newData)
            .then(res => {
                setEditMode(false)
                setCourse(res.data)
            })
    }

    const handlePostComment = () => {

        const currentComments = course.comments || []; // Если текущие комментарии не определены, создаем пустой массив
        // Создаем новый массив комментариев, содержащий как старые, так и новые комментарии
        const newComments = [
            ...currentComments,
            {
                title: comment,
                name: user.name
            }
        ];
        // Создаем новый объект данных курса с обновленным массивом комментариев
        const newData = {
            ...course,
            comments: newComments,
        };

        addComment(id, newData)
            .then(res => {
                getOneCourse(id)
                    .then(res => {
                        setCourse(res.data);
                        setTitle(res.data.title);
                        setDescription(res.data.description);
                        setDate(res.data.date);
                        setTime(res.data.time);
                        setVideoFile(res.data.video);
                        setComments(res.data.comments)
                        setComment("")
                    });
            })

    }



    return (
        <Box>
            {editMode === false ?
                <Box>
                    <Box sx={{ background: "#1567F4" }} minHeight={"25vh"} width={"100%"}>
                        <Box container width={'70%'} margin={'0 auto'} pt={10}>
                            <Typography variant='subtitle1' color={'#fff'} fontWeight={'bold'} textAlign='center'>
                                ДАТА: {course.date} ВРЕМЯ: {course.time}
                            </Typography>
                            <Typography
                                variant='h3'
                                color={'#fff'}
                                fontWeight={'bold'}
                                textAlign='center'
                                pt={5}
                                pb={5}
                                sx={{
                                    '@media (max-width: 560px)': {
                                        fontSize: '1.8rem',
                                        lineHeight: 1.5
                                    },
                                }}
                            >
                                {course.title}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        container
                        width={"50%"}
                        margin='30px auto'
                        sx={{
                            '@media (max-width: 850px)': {
                                width: '70%'
                            },
                            '@media (max-width: 600px)': {
                                width: '90%'
                            },
                        }}
                    >
                        <Box mr={5} mb={3} width='100%'>
                            <Typography variant='subtitle1' letterSpacing={0.5} textAlign='start'>
                                {course.description}
                            </Typography>
                        </Box>

                        {user === null ?
                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                                <Box textAlign='center' p={2} bgcolor='warning.main' color='warning.contrastText' width={"100%"}>
                                    Вам нужно <Link to='/login'>Авторизоваться</Link> или <Link to='/register'>Пройти регистрацию</Link> для просмотра роликов.
                                </Box>
                                <Button variant="outlined" sx={{ marginTop: "10px" }}>
                                    <Link to='/register'>
                                        Посмотреть комментарии
                                    </Link>
                                </Button>
                            </Box>
                            :
                            <>
                                <Box>
                                    <video src={`http://localhost:8080/video/${course.video}`} type="video/mp4" controls width="100%">
                                     
                                        Your browser does not support the video tag.
                                    </video>
                                </Box>
                                <Box sx={{ marginBottom: '20px', marginTop: "20px" }}>
                                    <TextField
                                        id="comment"
                                        label="Add a comment"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        fullWidth
                                    />
                                    <Button variant="contained" color="primary" onClick={handlePostComment} sx={{ marginTop: '10px' }}>
                                        Добавить комментарии
                                    </Button>
                                </Box>
                                <Box>
                                    {comments && comments.length > 0 && comments.map(comment => (
                                        <Box key={comment.id} mb={2}>
                                            <Typography variant="body1" fontWeight="bold">{comment.name}</Typography>
                                            <Typography variant="body2">{comment.title}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        }

                        {user && user.status ?
                            <>

                                <Box display={"flex"} columnGap={2} mt={3}>
                                    <Button variant="contained" color="success" onClick={() => setEditMode(true)}>
                                        РЕДАКТИРОВАТЬ
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => deleteCourse(id)}>
                                        УДАЛИТЬ
                                    </Button>
                                </Box>
                            </>
                            :
                            null
                        }
                    </Box>
                </Box>
                :
                <Box>
                    <Box sx={{ background: "#" }} minHeight={"25vh"} width={"100%"}>
                        <Box container width={'50%'} margin={'0 auto'} pt={10} display={"flex"} flexDirection={"column"} >
                            <Typography variant='subtitle1' color={'#fff'} fontWeight={'bold'} textAlign='center'>
                                ДАТА:
                                <TextField
                                    id="date"
                                    onChange={(e) => setDate(e.target.value)}
                                    variant="outlined"
                                    type='date'
                                    required
                                    margin="normal"
                                    value={date}
                                />
                                ВРЕМЯ: <TextField
                                    id="time"
                                    onChange={(e) => setTime(e.target.value)}
                                    value={time}
                                    variant="outlined"
                                    type='time'
                                    required
                                    margin="normal"
                                />
                            </Typography>
                            <TextField
                                id="course-title"
                                label="Название"
                                sx={{ color: 'white' }}
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                margin="normal"
                            />
                        </Box>
                    </Box>
                    <Box
                        container
                        width={"50%"}
                        margin='30px auto'
                        sx={{
                            '@media (max-width: 850px)': {
                                width: '70%'
                            },
                            '@media (max-width: 600px)': {
                                width: '90%'
                            },
                        }}
                    >
                        <Box mr={5} mb={3} width='100%'>
                            <TextField
                                id="description"
                                label="Описание"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </Box>

                        <Box>
                            <TextField
                                accept="video/*"
                                id="video-file"
                                type="file"
                                variant="outlined"
                                onChange={(e) => setVideoFile(e.target.files[0].name)}
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


                        <Box display={"flex"} columnGap={2} mt={3}>
                            <Button variant="contained" color="success" onClick={() => editCourse(id)}>
                                СОХРАНИТЬ
                            </Button>
                        </Box>

                    </Box>
                </Box>
            }
        </Box>
    );
};

export default SingleCourse;
