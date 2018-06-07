import ApiService from '../api.service';

export default {
  sendFeedback: (userId, satisfaction, feedbackType, comments) =>
    ApiService.post('/feedback', {
      userId,
      satisfaction,
      feedbackType,
      comments,
    }),
};
