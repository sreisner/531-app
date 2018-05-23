import ApiService from '../api.service';

export default {
  login: (email, password) => ApiService.post('/login', { email, password }),
  logout: () => ApiService.get('/logout'),
};
