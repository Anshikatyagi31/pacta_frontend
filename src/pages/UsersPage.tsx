import { useState, useMemo, useEffect } from 'react';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchUsers } from '../store/slices/usersSlice';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'recent' | 'username'>('name');
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({}));
  }, [dispatch]);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    // Apply search filter
    if (searchQuery) {
      filtered = users.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skills?.some(skill => 
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.fullName.localeCompare(b.fullName);
        case 'recent':
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
        case 'username':
          return a.username.localeCompare(b.username);
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, sortBy, users]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Get unique skills for filter suggestions
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    users.forEach(user => {
      user.skills?.forEach(skill => skillSet.add(skill));
    });
    return Array.from(skillSet).sort();
  }, [users]);

  // Get unique locations
  const allLocations = useMemo(() => {
    const locationSet = new Set<string>();
    users.forEach(user => {
      if (user.location) locationSet.add(user.location);
    });
    return Array.from(locationSet).sort();
  }, [users]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Developers Community</h1>
          <p className="text-gray-600">
            Connect with talented developers from around the world
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
                placeholder="Search developers by name, skills, or location..."
                onSearch={handleSearch}
                className="w-full"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'recent' | 'username')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Name A-Z</option>
                <option value="recent">Recently Joined</option>
                <option value="username">Username A-Z</option>
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="mt-4 space-y-3">
            {/* Popular Skills */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Popular Skills:</p>
              <div className="flex flex-wrap gap-2">
                {allSkills.slice(0, 6).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSearch(skill)}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm rounded-full transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Locations:</p>
              <div className="flex flex-wrap gap-2">
                {allLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleSearch(location)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {searchQuery ? (
              <>Search Results for "{searchQuery}" ({filteredAndSortedUsers.length})</>
            ) : (
              <>All Developers ({filteredAndSortedUsers.length})</>
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

        {/* Users Grid */}
        {filteredAndSortedUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No developers found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? "Try adjusting your search terms or browse all developers"
                : "No developers available at the moment"
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors"
              >
                Show All Developers
              </button>
            )}
          </div>
        )}

        {/* Load More (Placeholder for pagination) */}
        {filteredAndSortedUsers.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-md font-medium transition-colors">
              Load More Developers
            </button>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
