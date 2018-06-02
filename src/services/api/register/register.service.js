import ApiService from '../api.service';

export default {
  register: (email, password) =>
    ApiService.post('/register', { email, password }),
};
