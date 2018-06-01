import ApiService from '../api.service';

export default {
  getCurrentUser: () => ApiService.get(`/users/me`),
  startCycle: cycleId => ApiService.put(`/users/me/current-cycle`, { cycleId }),
};
