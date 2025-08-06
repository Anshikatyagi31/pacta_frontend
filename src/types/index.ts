export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  skills?: string[];
  joinedDate: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  authorId: string;
  author?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
  skills?: string[];
  joinedDate: string;
  token: string;
}
