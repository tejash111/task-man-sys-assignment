import { useAuth } from '../../context/AuthContext';
import TaskList from '../Tasks/TaskList';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <div style={{ 
        backgroundColor: '#007bff', 
        color: 'white', 
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>Task Manager</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>Welcome, {user?.name || 'User'}!</span>
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 20px', backgroundColor: 'white', color: '#007bff', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
          >
            Logout
          </button>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
