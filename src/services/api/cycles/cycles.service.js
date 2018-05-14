import { ApiService } from '../api.service';
import queryString from 'query-string';

const CyclesService = {
  generateCycle: queryParams =>
    ApiService.get(`/cycles?${queryString.stringify(queryParams)}`),
};

export { CyclesService };
