import queryString from 'query-string';
import ApiService from '../api.service';

export default {
  generateCycle: queryParams =>
    ApiService.get(`/cycles?${queryString.stringify(queryParams)}`),
};
