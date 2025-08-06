import { useState, useMemo, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProjects } from '../store/slices/projectsSlice';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'author'>('recent');
  const dispatch = useAppDispatch();
  const { projects, isLoading, error } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [dispatch]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter
    if (searchQuery) {
      filtered = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        (project.author?.fullName && project.author.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return (a.author?.fullName || '').localeCompare(b.author?.fullName || '');
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, sortBy, projects]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Get unique technologies for filter suggestions
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Projects</h1>
          <p className="text-gray-600">
            Discover amazing projects built by our community of developers
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Search and Filter Section */}
        {!isLoading && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <SearchBar 
                    placeholder="Search projects, technologies, or developers..."
                    onSearch={handleSearch}
                    className="w-full"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="lg:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'recent' | 'title' | 'author')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="title">Title A-Z</option>
                    <option value="author">Author A-Z</option>
                  </select>
                </div>
              </div>

              {/* Popular Technologies */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Popular Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {allTechnologies.slice(0, 8).map((tech) => (
                    <button
                      key={tech}
                      onClick={() => handleSearch(tech)}
                      className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 text-sm rounded-full transition-colors"
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {searchQuery ? (
              <>Search Results for "{searchQuery}" ({filteredAndSortedProjects.length})</>
            ) : (
              <>All Projects ({filteredAndSortedProjects.length})</>
            )}
          </h2>
          
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredAndSortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? "Try adjusting your search terms or browse all projects"
                : "No projects available at the moment"
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
              >
                Show All Projects
              </button>
            )}
          </div>
        )}

        {/* Load More (Placeholder for pagination) */}
        {filteredAndSortedProjects.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors">
              Load More Projects
            </button>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
