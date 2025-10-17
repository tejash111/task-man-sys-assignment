import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (userData) => api.post('/auth/login', userData),
    logout: () => api.post('/auth/logout'),
    getProfile: () => api.get('/auth/getuser'),
};

// Task API
export const taskAPI = {
    getAllTasks: () => api.get('/tasks'),
    createTask: (taskData) => api.post('/tasks', taskData),
    getSingleTask: (id) => api.get(`/tasks/${id}`),
    updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
    getTaskStats: () => api.get('/tasks/stats'),
};

export default api;
