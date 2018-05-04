import api from '../../api.service';

export default {
    getTrainingMaxes: userId => api.get(`/user/${userId}/training-maxes`)
};