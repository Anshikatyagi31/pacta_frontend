import api from './index';

export interface UserQuery {
  page?: number;
  limit?: number;
  q?: string;
  skills?: string[];
}

export const userAPI = {
  // Get all users with search and pagination
  getUsers: async (query: UserQuery = {}) => {
    const response = await api.get('/users', { params: query });
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string) => {
    const response = await api.get(`/users/id/${id}`);
    return response.data;
  },

  // Get user by username
  getUserByUsername: async (username: string) => {
    const response = await api.get(`/users/username/${username}`);
    return response.data;
  },
};
