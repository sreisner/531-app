import api from '../api.service';

export const RegisterService = {
    register: (email, password) => api.post('/register', { email, password })
};