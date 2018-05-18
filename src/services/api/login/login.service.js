import { ApiService } from '../api.service';

const LoginService = {
  login: (email, password) => ApiService.post('/login', { email, password }),
  logout: () => ApiService.get('/logout'),
};

export { LoginService };
