import { ApiService } from '../api.service';

export const UsersService = {
  getCurrentUser: () => ApiService.get(`/users/current`),
  getTrainingMaxes: userId => ApiService.get(`/users/${userId}/training-maxes`),
};
