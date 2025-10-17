import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'tasks', label: 'Tasks', icon: '📋', path: '/tasks' },
    { id: 'completed', label: 'Completed', icon: '✓', path: '/completed' },
    { id: 'in-progress', label: 'In Progress', icon: '⏳', path: '/in-progress' },
    { id: 'todo', label: 'To Do', icon: '📝', path: '/todo' },
    { id: 'team', label: 'Team', icon: '👥', path: '/team' },
    { id: 'trash', label: 'Trash', icon: '🗑️', path: '/trash' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">✓</span>
          </div>
          <span className="text-xl font-bold text-gray-900">TaskMe</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.id === 'tasks' && location.pathname === '/dashboard');
            return (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <span className="text-lg">⚙️</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
