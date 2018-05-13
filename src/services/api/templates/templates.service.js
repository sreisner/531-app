import { ApiService } from '../api.service';

export const TemplatesService = {
  getTemplates: () => ApiService.get(`/templates`),
  getConfig: (templateId, variantId, options) =>
    ApiService.get(
      `/templates/${templateId}/variants/${variantId}/config?options=${options}`
    ),
};
