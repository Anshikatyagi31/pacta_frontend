import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProjects } from '../store/slices/projectsSlice';
import { fetchUsers } from '../store/slices/usersSlice';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProjects({}));
    dispatch(fetchUsers({}));
  }, [dispatch]);

  // Filter projects and users based on search query
  const filteredProjects = useMemo(() => {
    const projectsList = searchQuery ? projects : projects.slice(0, 4); // Show only 4 recent projects
    
    if (!searchQuery) return projectsList;
    
    return projects.filter(project =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => 
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      (project.author?.fullName && project.author.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, projects]);

  const filteredUsers = useMemo(() => {
    const usersList = searchQuery ? users : users.slice(0, 3); // Show only 3 featured users
    
    if (!searchQuery) return usersList;
    
    return users.filter(user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills?.some(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Showcase Your <span className="text-blue-200">Development</span> Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Connect with developers, share your projects, and get valuable feedback from the community
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar 
                placeholder="Search projects, developers, or technologies..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/projects"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Projects
              </Link>
              <Link 
                to="/create-project"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Share Your Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{projects.length}+</div>
              <div className="text-gray-600">Amazing Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{users.length}+</div>
              <div className="text-gray-600">Talented Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Technologies Featured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {searchQuery ? 'Search Results - Projects' : 'Recent Projects'}
            </h2>
            {!searchQuery && (
              <Link 
                to="/projects"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            )}
          </div>
          
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Developers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {searchQuery ? 'Search Results - Developers' : 'Featured Developers'}
            </h2>
            {!searchQuery && (
              <Link 
                to="/users"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </Link>
            )}
          </div>
          
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No developers found matching your search.</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Work?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join our community of developers and showcase your amazing projects
          </p>
          <Link 
            to="/signup"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
