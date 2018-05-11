import { ApiService } from '../api.service';

export const TemplatesService = {
  getTemplates: () => ApiService.get(`/templates`),
  getTemplateConfig: (templateId, options) =>
    ApiService.get(`/templates/${templateId}/config?options=${options}`),
};
