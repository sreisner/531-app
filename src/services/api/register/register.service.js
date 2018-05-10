import { ApiService } from '../a.service';

export const RegisterService = {
  register: (email, password) =>
    ApiService.post('/register', { email, password }),
};
