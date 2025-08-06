import api from './index';

export interface CommentQuery {
  page?: number;
  limit?: number;
}

export interface CreateCommentData {
  content: string;
  projectId: string;
}

export interface UpdateCommentData {
  content: string;
}

export const commentAPI = {
  // Get comments for a project
  getCommentsByProject: async (projectId: string, query: CommentQuery = {}) => {
    const response = await api.get(`/comments/project/${projectId}`, { params: query });
    return response.data;
  },

  // Create new comment
  createComment: async (data: CreateCommentData) => {
    const response = await api.post('/comments', data);
    return response.data;
  },

  // Update comment
  updateComment: async (id: string, data: UpdateCommentData) => {
    const response = await api.put(`/comments/${id}`, data);
    return response.data;
  },

  // Delete comment
  deleteComment: async (id: string) => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  },
};
