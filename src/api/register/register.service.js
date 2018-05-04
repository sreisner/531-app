import api from '../api.service';

export default {
    register: (email, password) => api.post('/register', { email, password })
};