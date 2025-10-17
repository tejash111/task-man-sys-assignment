import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskAPI } from '../../services/api';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import { ArrowLeft, Calendar, Flag, CheckCircle2, Edit, Trash2, LoaderCircle } from 'lucide-react';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await taskAPI.getSingleTask(id);
      setTask(response.data.task);
    } catch (error) {
      console.error('Error fetching task:', error);
      setError('Failed to load task details');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/tasks?edit=${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        navigate('/tasks');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-500';
      case 'Medium': return 'bg-yellow-100 text-yellow-500';
      case 'Low': return 'bg-blue-100 text-blue-500';
      default: return 'bg-gray-200 text-gray-900';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-500';
      case 'In Progress': return 'bg-yellow-100 text-yellow-500';
      case 'Todo': return 'bg-blue-100 text-blue-500';
      default: return 'bg-gray-200 text-gray-900';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <LoaderCircle className='animate-spin text-gray-900' size={40} />
          </main>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-4">{error || 'Task not found'}</p>
              <button
                onClick={() => navigate('/tasks')}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Back to Tasks
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/tasks')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Tasks</span>
            </button>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {task.title}
                    </h1>
                    <div className="flex flex-wrap gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                        <Flag size={14} className="inline mr-1" />
                        {task.priority}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                        <CheckCircle2 size={14} className="inline mr-1" />
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleEdit}
                      className="p-2 border border-blue-400 text-blue-500 rounded-lg bg-blue-50 hover:bg-blue-100  transition-colors"
                      title="Edit Task"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="p-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 space-y-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Description
                  </h2>
                  <p className="text-gray-900 text-lg leading-relaxed whitespace-pre-wrap">
                    {task.description || 'No description provided'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Calendar size={16} />
                      Due Date
                    </h2>
                    <p className="text-gray-900 text-lg">
                      {task.dueDate 
                        ? new Date(task.dueDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'No due date set'
                      }
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Created
                    </h2>
                    <p className="text-gray-900 text-lg">
                      {new Date(task.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {task.updatedAt && task.updatedAt !== task.createdAt && (
                  <div className="pt-4 border-t border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Last Updated
                    </h2>
                    <p className="text-gray-900 text-lg">
                      {new Date(task.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskDetail;
