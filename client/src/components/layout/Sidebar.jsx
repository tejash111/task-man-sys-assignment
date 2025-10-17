import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { ListTodo } from 'lucide-react';

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
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard/> , path: '/dashboard' },
    { id: 'tasks', label: 'Tasks', icon: <ListTodo/>, path: '/tasks' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
  
      <div className="p-6 ">
        <div className="flex items-center gap-2">
          <span className="text-2xl  font-semibold  text-gray-900">Taskify</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-black text-white font-medium'
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

      <div className="p-2 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-1 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <span className="text-lg"><LogOut/></span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
