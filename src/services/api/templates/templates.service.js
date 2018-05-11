import { ApiService } from '../api.service';
import base64 from 'base-64';

export const TemplatesService = {
  getTemplates: () => ApiService.get(`/templates`),
  getTemplateConfig: (templateId, options) => {
    return ApiService.get(
      `/templates/${templateId}/config?options=${base64.encode(
        JSON.stringify(options)
      )}`
    );
  },
};
