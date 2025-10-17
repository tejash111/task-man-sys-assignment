import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { LoaderCircle } from 'lucide-react';

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
      console.log('KanbanBoard: Fetching tasks...');
      const response = await taskAPI.getAllTasks();
      console.log('KanbanBoard: Tasks response:', response.data);
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error('KanbanBoard: Error fetching tasks:', error);
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
      <div className="flex items-center justify-center h-full ">
        <div className="text-gray-500 flex">Loading tasks... <LoaderCircle className='animate-spin'/></div>
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


      <div className="flex-1 overflow-x-auto p-8">
        {view === 'board' ? (
      
          <div className="flex gap-6 h-full">
            {columns.map((column) => (
              <div key={column.id} className="flex-1 min-w-[320px]">
    
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
        ) : (
 
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">

              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
                <div className="col-span-4">Task</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Priority</div>
                <div className="col-span-2">Due Date</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

           
              <div className="divide-y divide-gray-200">
                {tasks.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No tasks found. Create your first task!
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div key={task._id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
         
                      <div className="col-span-4">
                        <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
                        {task.description && (
                          <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
                        )}
                      </div>

                  
                      <div className="col-span-2 flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : task.status === 'In Progress'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {task.status}
                        </span>
                      </div>

               
                      <div className="col-span-2 flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'High'
                            ? 'bg-red-100 text-red-700'
                            : task.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

        
                      <div className="col-span-2 flex items-center text-sm text-gray-600">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                      </div>

 
                      <div className="col-span-2 flex items-center bg-black justify-end gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>


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
