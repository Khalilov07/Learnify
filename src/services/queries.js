import axios from "axios";

export const getData = () => {
    return axios.get("http://localhost:8080/courses")
};

export const getOneCourse = (id) => {
    return axios.get(`http://localhost:8080/courses/${id}`)
};

export const removeCourse = (id) => {
    return axios.delete(`http://localhost:8080/courses/${id}`)
};

export const changeCourse = (id, newData) => {
    return axios.patch(`http://localhost:8080/courses/${id}`, newData)
};

export const addComment = (id, newData) => {
    return axios.put(`http://localhost:8080/courses/${id}`, newData)
};