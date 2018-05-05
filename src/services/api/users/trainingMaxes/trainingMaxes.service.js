import api from '../../api.service';

export const TrainingMaxesService = {
    getTrainingMaxes: userId => api.get(`/users/${userId}/training-maxes`)
};