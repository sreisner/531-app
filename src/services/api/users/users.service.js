import { ApiService } from '../api.service';

export const UsersService = {
  getTrainingMaxes: userId => ApiService.get(`/users/${userId}/training-maxes`),
  updateTrainingMaxes: (userId, trainingMaxes) =>
    ApiService.put(`/users/${userId}/training-maxes`, trainingMaxes),
};
