import ApiService from '../api.service';

export default {
  generateCycle: queryParams =>
    ApiService.get(`/cycles/generate${queryParams}`),
  createCycle: cycle => ApiService.post('/cycles', cycle),
  getCycle: cycleId => ApiService.get(`/cycles/${cycleId}`),
  updateCurrentCycle: cycleId =>
    ApiService.put('/users/me/current-cycle', cycleId),
  getSession: (cycleId, sessionId) =>
    ApiService.get(`/cycles/${cycleId}/sessions/${sessionId}`),
  beginSession: (cycleId, sessionId) =>
    ApiService.patch(`/cycles/${cycleId}/sessions/${sessionId}`, {
      inProgress: true,
    }),
};
