const TaskItem = ({ task, onDelete, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#dc3545';
      case 'Medium': return '#ffc107';
      case 'Low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#28a745';
      case 'In Progress': return '#007bff';
      case 'Todo': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '15px', 
      marginBottom: '10px', 
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 10px 0' }}>{task.title}</h3>
          <p style={{ margin: '5px 0', color: '#666' }}>{task.description}</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <span style={{ 
              padding: '3px 8px', 
              borderRadius: '3px', 
              fontSize: '12px',
              backgroundColor: getPriorityColor(task.priority),
              color: 'white'
            }}>
              {task.priority}
            </span>
            <span style={{ 
              padding: '3px 8px', 
              borderRadius: '3px', 
              fontSize: '12px',
              backgroundColor: getStatusColor(task.status),
              color: 'white'
            }}>
              {task.status}
            </span>
            {task.dueDate && (
              <span style={{ fontSize: '12px', color: '#666' }}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => onEdit(task)}
            style={{ padding: '5px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            style={{ padding: '5px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
