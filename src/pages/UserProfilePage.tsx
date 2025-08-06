import { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchUsers } from '../store/slices/usersSlice';
import { fetchProjects } from '../store/slices/projectsSlice';

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const { users, isLoading: usersLoading, error: usersError } = useAppSelector((state) => state.users);
  const { projects } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchUsers({}));
    dispatch(fetchProjects({}));
  }, [dispatch]);

  // Find the user
  const user = useMemo(() => {
    return users.find(u => u.username === username);
  }, [username, users]);

  // Get user's projects  
  const userProjects = useMemo(() => {
    if (!user) return [];
    return projects.filter(project => project.authorId === user.id);
  }, [user, projects]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  // Show loading state
  if (usersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show error state
  if (usersError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading User</h1>
          <p className="text-gray-600 mb-6">{usersError}</p>
          <Link 
            to="/users"
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
          >
            Back to Developers
          </Link>
        </div>
      </div>
    );
  }

  // Show user not found only after loading is complete
  if (!user && !usersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-6">The user you're looking for doesn't exist.</p>
          <Link 
            to="/users"
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
          >
            Back to Developers
          </Link>
        </div>
      </div>
    );
  }

  // Return early if user is still undefined (shouldn't happen after loading checks)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="mb-6">
          <Link 
            to="/users"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Developers
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&size=120`}
                  alt={user.fullName}
                  className="w-30 h-30 rounded-full mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.fullName}</h1>
                <p className="text-gray-500 mb-2">@{user.username}</p>
                {user.location && (
                  <div className="flex items-center justify-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </div>
                )}
              </div>

              {/* Bio */}
              {user.bio && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">About</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{user.bio}</p>
                </div>
              )}

              {/* Skills */}
              {user.skills && user.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="break-all">{user.email}</span>
                </div>

                {user.website && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <a 
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                <div className="flex items-center text-gray-600 text-sm">
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Joined {formatDate(user.joinedDate)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2">
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors">
                  Send Message
                </button>
                <button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors">
                  Follow
                </button>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Projects ({userProjects.length})
              </h2>
              <p className="text-gray-600">
                Check out {user.fullName}'s amazing projects
              </p>
            </div>

            {userProjects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {userProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Yet</h3>
                <p className="text-gray-500">
                  {user.fullName} hasn't shared any projects yet. Check back later!
                </p>
              </div>
            )}

            {/* Stats Section */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{userProjects.length}</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{user.skills?.length || 0}</div>
                  <div className="text-sm text-gray-600">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">24</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
