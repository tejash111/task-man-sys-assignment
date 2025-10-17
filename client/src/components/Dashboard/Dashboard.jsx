import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';
import { ClipboardList, CheckCircle2, Clock, RefreshCw, LoaderCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <TaskStats />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;



const StatsCard = ({ title, value, icon, color, subtitle }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const PriorityCard = ({ priority, count, total, color }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <div>
          <p className="font-medium text-gray-900">{priority}</p>
          <p className="text-sm text-gray-500">{count} tasks</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">{percentage}%</p>
      </div>
    </div>
  );
};

const TaskStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('Fetching stats from API...');
      const response = await taskAPI.getTaskStats();
      console.log('Full response:', response);
      console.log('Stats data:', response.data);
      
      if (response.data && response.data.stats) {
        setStats(response.data.stats);
        setError('');
      } else {
        console.error('Invalid response format:', response.data);
        setError('Invalid response format from server');
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          pendingTasks: 0,
          priorityBreakdown: { Low: 0, Medium: 0, High: 0 }
        });
      }
    } catch (err) {
      console.error('Stats error:', err);
      console.error('Error response:', err.response);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch statistics';
      setError(errorMsg);
      setStats({
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        priorityBreakdown: { Low: 0, Medium: 0, High: 0 }
      });
    } finally {
      setLoading(false);
    }
  };

  console.log('TaskStats render - loading:', loading, 'error:', error, 'stats:', stats);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-900 text-lg flex">Loading statistics... <LoaderCircle className='animate-spin'/></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm"> {error}</p>
          <button 
            onClick={fetchStats}
            className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700"
          >
            Retry
          </button>
        </div>
      )}


      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
        </div>
      </div>


      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Total Tasks"
            value={stats?.totalTasks || 0}
            icon={<ClipboardList size={28} className="text-blue-500" />}
            color="bg-blue-50"
            subtitle="All tasks created"
          />
          <StatsCard
            title="Completed"
            value={stats?.completedTasks || 0}
            icon={<CheckCircle2 size={28} className="text-green-500" />}
            color="bg-green-50"
            subtitle="completed task"
          />
          <StatsCard
            title="Pending"
            value={stats?.pendingTasks || 0}
            icon={<Clock size={28} className="text-yellow-500" />}
            color="bg-yellow-50"
            subtitle="Todo & In Progress"
          />
        </div>
      </div>


      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tasks by Priority</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-3">
            <PriorityCard
              priority="High Priority"
              count={stats?.priorityBreakdown?.High || 0}
              total={stats?.totalTasks || 0}
              color="bg-red-500"
            />
            <PriorityCard
              priority="Medium Priority"
              count={stats?.priorityBreakdown?.Medium || 0}
              total={stats?.totalTasks || 0}
              color="bg-yellow-500"
            />
            <PriorityCard
              priority="Low Priority"
              count={stats?.priorityBreakdown?.Low || 0}
              total={stats?.totalTasks || 0}
              color="bg-blue-500"
            />
          </div>
          
       
          {stats?.totalTasks > 0 && (
            <div className="mt-6">
              <div className="flex h-3 rounded-full overflow-hidden">
                {stats?.priorityBreakdown?.High > 0 && (
                  <div
                    className="bg-red-500"
                    style={{ width: `${(stats.priorityBreakdown.High / stats.totalTasks) * 100}%` }}
                  ></div>
                )}
                {stats?.priorityBreakdown?.Medium > 0 && (
                  <div
                    className="bg-yellow-500"
                    style={{ width: `${(stats.priorityBreakdown.Medium / stats.totalTasks) * 100}%` }}
                  ></div>
                )}
                {stats?.priorityBreakdown?.Low > 0 && (
                  <div
                    className="bg-blue-500"
                    style={{ width: `${(stats.priorityBreakdown.Low / stats.totalTasks) * 100}%` }}
                  ></div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

     
    </div>
  );
};


