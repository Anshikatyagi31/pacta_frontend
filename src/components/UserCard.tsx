import type { User } from '../types';
import { Link } from 'react-router-dom';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <img 
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.fullName}&size=80`}
          alt={user.fullName}
          className="w-20 h-20 rounded-full mb-4"
        />
        
        {/* Name and Username */}
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          <Link 
            to={`/users/${user.username}`}
            className="hover:text-blue-600 transition-colors"
          >
            {user.fullName}
          </Link>
        </h3>
        <p className="text-gray-500 text-sm mb-3">@{user.username}</p>
        
        {/* Bio */}
        {user.bio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {user.bio}
          </p>
        )}
        
        {/* Location */}
        {user.location && (
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {user.location}
          </div>
        )}
        
        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4 justify-center">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{user.skills.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Join Date */}
        <p className="text-gray-400 text-xs mb-4">
          Joined {formatDate(user.joinedDate)}
        </p>
        
        {/* Actions */}
        <div className="flex space-x-2 w-full">
          <Link 
            to={`/users/${user.username}`}
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium text-center transition-colors"
          >
            View Profile
          </Link>
          {user.website && (
            <a 
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors border border-gray-300 rounded-md"
              title="Visit Website"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
