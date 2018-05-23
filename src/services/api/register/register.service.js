import ApiService from '../a.service';

export default {
  register: (email, password) =>
    ApiService.post('/register', { email, password }),
};
