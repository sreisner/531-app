import apiService from "../api.service";

export const UsersService = {
    getCurrentUser: () => apiService.get(`/users?user=current`)
};