import { ApiService } from '../../api.service';

export const TrainingMaxesService = {
    getTrainingMaxes: userId => ApiService.get(`/users/${userId}/training-maxes`)
};