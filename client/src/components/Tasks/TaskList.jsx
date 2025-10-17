import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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
    setShowForm(true);
  };

  const handleTaskSaved = () => {
    setShowForm(false);
    setEditingTask(null);
    fetchTasks();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>My Tasks</h2>
        <button 
          onClick={() => { setShowForm(!showForm); setEditingTask(null); }}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {showForm && (
        <TaskForm 
          task={editingTask} 
          onTaskSaved={handleTaskSaved}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
        />
      )}

      {tasks.length === 0 ? (
        <p>No tasks found. Create your first task!</p>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
