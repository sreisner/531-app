import queryString from 'query-string';
import ApiService from '../api.service';

export default {
  generateCycle: queryParams =>
    ApiService.get(`/cycles/generate?${queryString.stringify(queryParams)}`),
  createCycle: cycle => ApiService.post('/cycles', cycle),
  updateCurrentCycle: cycleId =>
    ApiService.put('/users/me/current-cycle', cycleId),
};
