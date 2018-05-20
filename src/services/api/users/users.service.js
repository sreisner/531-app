import { ApiService } from '../api.service';

export const UsersService = {
  getCurrentUser: userId => ApiService.get(`/users/current`),
  getTrainingMaxes: userId => ApiService.get(`/users/${userId}/training-maxes`),
  updateTrainingMaxes: (userId, trainingMaxes) =>
    ApiService.put(`/users/${userId}/training-maxes`, trainingMaxes),
  startCycle: (userId, cycle) =>
    ApiService.put(`/users/${userId}/cycles/current`, cycle),
};
