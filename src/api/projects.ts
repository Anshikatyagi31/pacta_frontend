import api from './index';

export interface ProjectQuery {
  page?: number;
  limit?: number;
  q?: string;
  technologies?: string[];
  author?: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  projectImage?: File;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies?: string[];
  projectImage?: File;
}

export const projectAPI = {
  // Get all projects with search and pagination
  getProjects: async (query: ProjectQuery = {}) => {
    const response = await api.get('/projects', { params: query });
    return response.data;
  },

  // Get project by ID
  getProjectById: async (id: string) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Get projects by user
  getProjectsByUser: async (userId: string, query: Omit<ProjectQuery, 'author'> = {}) => {
    const response = await api.get(`/projects/user/${userId}`, { params: query });
    return response.data;
  },

  // Create new project
  createProject: async (data: CreateProjectData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.githubUrl) formData.append('githubUrl', data.githubUrl);
    if (data.liveUrl) formData.append('liveUrl', data.liveUrl);
    data.technologies.forEach(tech => formData.append('technologies', tech));
    if (data.projectImage) formData.append('projectImage', data.projectImage);

    const response = await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update project
  updateProject: async (id: string, data: UpdateProjectData) => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.githubUrl !== undefined) formData.append('githubUrl', data.githubUrl);
    if (data.liveUrl !== undefined) formData.append('liveUrl', data.liveUrl);
    if (data.technologies) {
      data.technologies.forEach(tech => formData.append('technologies', tech));
    }
    if (data.projectImage) formData.append('projectImage', data.projectImage);

    const response = await api.put(`/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete project
  deleteProject: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};
