import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProjectById } from '../store/slices/projectsSlice';
import { fetchCommentsByProject, createComment } from '../store/slices/commentsSlice';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState('');
  const dispatch = useAppDispatch();
  
  const { projects, currentProject, isLoading: projectsLoading, error: projectsError } = useAppSelector((state) => state.projects);
  const { comments, isLoading: commentsLoading } = useAppSelector((state) => state.comments);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
      dispatch(fetchCommentsByProject({ projectId: id }));
    }
  }, [dispatch, id]);

  // Find the project (prefer currentProject from Redux)
  const project = useMemo(() => {
    return currentProject || projects.find(p => p.id === id);
  }, [currentProject, projects, id]);

  // Get comments for this project
  const projectComments = useMemo(() => {
    return comments.filter(comment => comment.projectId === id);
  }, [comments, id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !id) return;

    const result = await dispatch(createComment({
      projectId: id,
      content: newComment.trim()
    }));
    
    if (createComment.fulfilled.match(result)) {
      setNewComment('');
      // Refresh comments
      dispatch(fetchCommentsByProject({ projectId: id }));
    }
  };

  // Show loading state
  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show error state
  if (projectsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Project</h1>
          <p className="text-gray-600 mb-6">{projectsError}</p>
          <Link 
            to="/projects"
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project && !projectsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
          <Link 
            to="/projects"
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Return early if project is still undefined (shouldn't happen after loading checks)
  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="mb-6">
          <Link 
            to="/projects"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </nav>

        {/* Project Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Project Image */}
          {project.imageUrl && (
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            {/* Title and Meta */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
              
              {/* Author Info */}
              {project.author ? (
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={project.author.avatar || `https://ui-avatars.com/api/?name=${project.author.fullName}&size=50`} 
                    alt={project.author.fullName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <Link 
                      to={`/users/${project.author.username}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {project.author.fullName}
                    </Link>
                    <p className="text-gray-500">@{project.author.username}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600">?</span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-gray-500">Unknown Author</span>
                    <p className="text-gray-500">@unknown</p>
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>Created: {formatDate(project.createdAt)}</span>
                <span>Updated: {formatDate(project.updatedAt)}</span>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-900 text-white hover:bg-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>View Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Project</h3>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Comments ({projectComments.length})
          </h2>

          {/* Add Comment Form - Only for authenticated users */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="mb-8">
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Leave a comment
                </label>
                <textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your thoughts about this project..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={commentsLoading || !newComment.trim()}
                className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 px-6 py-2 rounded-md font-medium transition-colors"
              >
                {commentsLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 mb-4">You need to be logged in to leave a comment.</p>
              <Link
                to="/login"
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
              >
                Sign In to Comment
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {projectComments.length > 0 ? (
              projectComments.map(comment => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex space-x-4">
                    <img 
                      src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.fullName}&size=40`}
                      alt={comment.author.fullName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Link 
                          to={`/users/${comment.author.username}`}
                          className="font-semibold text-gray-900 hover:text-blue-600"
                        >
                          {comment.author.fullName}
                        </Link>
                        <span className="text-gray-500 text-sm">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
