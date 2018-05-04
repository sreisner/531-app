import api from '../api.service';

export default {
    login: (email, password) => api.post('/login', { email, password })
};