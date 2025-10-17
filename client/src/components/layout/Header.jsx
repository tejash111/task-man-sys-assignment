import { useAuth } from '../../context/AuthContext';
import { Search } from 'lucide-react';

const Header = ({ onCreateTask, searchQuery, onSearchChange }) => {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
  
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800">
              <Search/>
            </span>
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchQuery || ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
            />
          </div>
        </div>

 
        <div className="flex items-center gap-4 ml-6">


          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold">
              {getInitials(user?.name)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
