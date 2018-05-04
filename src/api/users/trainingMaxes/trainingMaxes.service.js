import api from '../../api.service';

export default {
    getTrainingMaxes: userId => api.get(`/users/${userId}/training-maxes`)
};