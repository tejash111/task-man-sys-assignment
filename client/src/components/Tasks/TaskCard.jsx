const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };



  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      {/* Priority Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-1 text-xs font-medium ${getPriorityColor(task.priority)}`}>
          <span>▲</span>
          <span className="uppercase">{task.priority} PRIORITY</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="text-lg">⋯</span>
        </button>
      </div>

   
      <div className="flex items-center gap-2 mb-2">
       
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
      </div>

      <p className="text-sm text-gray-500 mb-4">{formatDate(task.dueDate)}</p>


      {task.description && (
        <p className="text-sm bg-gray-100 p-1 rounded-lg text-gray-700 mb-3 line-clamp-2">{task.description}</p>
      )}

    

  
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 px-3 py-1.5 text-xs border border-blue-300 text-blue-500 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 px-3 py-1.5 text-xs bg-red-100 text-red-500 border border-red-300 rounded hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
