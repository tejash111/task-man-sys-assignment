import { useState, useEffect } from 'react';
import { taskAPI } from '../../services/api';

const TaskForm = ({ task, onTaskSaved, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Todo',
    dueDate: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        status: task.status || 'Todo',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
      });
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (task) {
        await taskAPI.updateTask(task._id, formData);
      } else {
        await taskAPI.createTask(formData);
      }
      onTaskSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  return (
    <div className='backdrop-blur-2xl' style={{ 
      
    }}>
      <h3>{task ? 'Edit Task' : 'Create New Task'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Task Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '10px', fontSize: '16px', minHeight: '80px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            style={{ flex: 1, padding: '10px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
          >
            {task ? 'Update Task' : 'Create Task'}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            style={{ flex: 1, padding: '10px', fontSize: '16px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
