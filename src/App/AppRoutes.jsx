import React from 'react';

import HomePage from '../pages/HomePage/HomePage'
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage'
import CoursePage from '../pages/CoursesPage/CoursePage'

import { Routes, Route } from 'react-router-dom';
import SingleCourse from '../pages/SingleCourse/SingleCourse';
import AddCoursePage from '../pages/AddCoursePage/AddCoursePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/courses' element={<CoursePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/course/:id' element={<SingleCourse />} />
            <Route path='/addcourse' element={<AddCoursePage />} />
        </Routes>
    );
};

export default AppRoutes;