import type { User, Project, Comment } from '../types';

export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    fullName: 'John Doe',
    bio: 'Full-stack developer passionate about creating innovative web applications',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    skills: ['React', 'Node.js', 'TypeScript', 'Python'],
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    username: 'sarahsmith',
    email: 'sarah@example.com',
    fullName: 'Sarah Smith',
    bio: 'UI/UX Designer and Frontend Developer with a love for clean, intuitive designs',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    location: 'New York, NY',
    website: 'https://sarahdesigns.com',
    skills: ['React', 'Vue.js', 'Figma', 'CSS'],
    joinedDate: '2023-02-20'
  },
  {
    id: '3',
    username: 'mikejohnson',
    email: 'mike@example.com',
    fullName: 'Mike Johnson',
    bio: 'Backend engineer specializing in scalable systems and microservices',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'Austin, TX',
    website: 'https://miketech.io',
    skills: ['Java', 'Spring', 'Docker', 'AWS'],
    joinedDate: '2022-11-10'
  },
  {
    id: '4',
    username: 'emilychen',
    email: 'emily@example.com',
    fullName: 'Emily Chen',
    bio: 'Data scientist and machine learning enthusiast building AI-powered applications',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    location: 'Seattle, WA',
    website: 'https://emilychen.ai',
    skills: ['Python', 'TensorFlow', 'React', 'SQL'],
    joinedDate: '2023-03-05'
  }
];

export const dummyProjects: Project[] = [
  {
    id: '1',
    title: 'Task Management App',
    description: 'A collaborative task management application built with React and Node.js. Features include real-time updates, team collaboration, drag-and-drop functionality, and project analytics.',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    githubUrl: 'https://github.com/johndoe/task-manager',
    liveUrl: 'https://taskapp.johndoe.dev',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    authorId: '1',
    author: dummyUsers[0],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    title: 'E-commerce Dashboard',
    description: 'Modern admin dashboard for e-commerce platforms with advanced analytics, inventory management, and customer insights. Built with Vue.js and features beautiful data visualizations.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    githubUrl: 'https://github.com/sarahsmith/ecommerce-dashboard',
    liveUrl: 'https://dashboard.sarahdesigns.com',
    technologies: ['Vue.js', 'Chart.js', 'Express', 'PostgreSQL'],
    authorId: '2',
    author: dummyUsers[1],
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-10T16:45:00Z'
  },
  {
    id: '3',
    title: 'Microservices API Gateway',
    description: 'Scalable API gateway built with Spring Boot for managing microservices architecture. Includes authentication, rate limiting, load balancing, and comprehensive monitoring.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
    githubUrl: 'https://github.com/mikejohnson/api-gateway',
    technologies: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'Redis'],
    authorId: '3',
    author: dummyUsers[2],
    createdAt: '2024-01-20T11:30:00Z',
    updatedAt: '2024-01-25T13:20:00Z'
  },
  {
    id: '4',
    title: 'AI-Powered Recipe Recommender',
    description: 'Machine learning application that recommends recipes based on available ingredients, dietary preferences, and past user behavior. Features a beautiful React frontend and Python ML backend.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    githubUrl: 'https://github.com/emilychen/recipe-ai',
    liveUrl: 'https://recipes.emilychen.ai',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker'],
    authorId: '4',
    author: dummyUsers[3],
    createdAt: '2024-02-05T08:00:00Z',
    updatedAt: '2024-02-12T15:10:00Z'
  },
  {
    id: '5',
    title: 'Social Media Analytics Tool',
    description: 'Comprehensive analytics platform for social media managers to track engagement, analyze trends, and schedule content across multiple platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    githubUrl: 'https://github.com/johndoe/social-analytics',
    liveUrl: 'https://analytics.johndoe.dev',
    technologies: ['React', 'D3.js', 'Node.js', 'Redis', 'PostgreSQL'],
    authorId: '1',
    author: dummyUsers[0],
    createdAt: '2024-01-10T12:45:00Z',
    updatedAt: '2024-01-18T10:30:00Z'
  },
  {
    id: '6',
    title: 'Mobile Banking App Design',
    description: 'Complete UI/UX design system for a modern mobile banking application. Includes user research, wireframes, prototypes, and design components.',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    technologies: ['Figma', 'Principle', 'Adobe XD', 'Sketch'],
    authorId: '2',
    author: dummyUsers[1],
    createdAt: '2024-01-25T14:20:00Z',
    updatedAt: '2024-02-01T09:15:00Z'
  }
];

export const dummyComments: Comment[] = [
  {
    id: '1',
    content: 'This is fantastic! The real-time collaboration feature works seamlessly. Great job on the UI design too.',
    authorId: '2',
    author: dummyUsers[1],
    projectId: '1',
    createdAt: '2024-01-16T15:30:00Z',
    updatedAt: '2024-01-16T15:30:00Z'
  },
  {
    id: '2',
    content: 'Love the clean architecture and the use of Socket.io for real-time updates. Have you considered adding file attachments to tasks?',
    authorId: '3',
    author: dummyUsers[2],
    projectId: '1',
    createdAt: '2024-01-17T10:15:00Z',
    updatedAt: '2024-01-17T10:15:00Z'
  },
  {
    id: '3',
    content: 'The data visualizations are stunning! The performance is also impressive even with large datasets.',
    authorId: '4',
    author: dummyUsers[3],
    projectId: '2',
    createdAt: '2024-02-02T11:45:00Z',
    updatedAt: '2024-02-02T11:45:00Z'
  },
  {
    id: '4',
    content: 'Excellent work on the microservices architecture. The documentation is also very comprehensive.',
    authorId: '1',
    author: dummyUsers[0],
    projectId: '3',
    createdAt: '2024-01-21T09:20:00Z',
    updatedAt: '2024-01-21T09:20:00Z'
  },
  {
    id: '5',
    content: 'The ML model recommendations are surprisingly accurate! How did you handle the cold start problem?',
    authorId: '2',
    author: dummyUsers[1],
    projectId: '4',
    createdAt: '2024-02-06T16:10:00Z',
    updatedAt: '2024-02-06T16:10:00Z'
  }
];
