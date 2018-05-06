import { ApiService } from '../api.service';

const LoginService = {
    user: null,
    login: (email, password) =>
        ApiService.post('/login', { email, password })
            .then(user => LoginService.user = user)
};

export { LoginService };