import api from '../api.service';

export const LoginService = {
    login: (email, password) => api.post('/login', { email, password })
};