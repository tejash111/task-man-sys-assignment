import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [view, setView] = useState('board'); // 'board' or 'list'

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAllTasks();
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleTaskSaved = () => {
    setShowModal(false);
    setEditingTask(null);
    fetchTasks();
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const columns = [
    { id: 'Todo', title: 'To Do', color: 'blue', tasks: getTasksByStatus('Todo') },
    { id: 'In Progress', title: 'In Progress', color: 'orange', tasks: getTasksByStatus('In Progress') },
    { id: 'Completed', title: 'Completed', color: 'green', tasks: getTasksByStatus('Completed') },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <button
            onClick={() => { setEditingTask(null); setShowModal(true); }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            <span>Create Task</span>
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setView('board')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'board'
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>⊞</span>
            <span>Board View</span>
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'list'
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>☰</span>
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-8">
        <div className="flex gap-6 h-full">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 min-w-[320px]">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${column.color}-500`}></div>
                  <h2 className="font-semibold text-gray-900">{column.title}</h2>
                  <span className="text-sm text-gray-500">({column.tasks.length})</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <span className="text-xl">+</span>
                </button>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                {column.tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No tasks in {column.title.toLowerCase()}
                  </div>
                ) : (
                  column.tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => { setShowModal(false); setEditingTask(null); }}
          onTaskSaved={handleTaskSaved}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
