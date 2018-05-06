import { ApiService } from "../api.service";

export const UsersService = {
    getCurrentUser: () => ApiService.get(`/users?user=current`)
};