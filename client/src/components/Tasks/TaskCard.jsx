const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-orange-500';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Todo': return 'bg-blue-500';
      case 'In Progress': return 'bg-orange-500';
      case 'Completed': return 'bg-green-500';
      default: return 'bg-gray-500';
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

      {/* Status Indicator */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></div>
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
      </div>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-4">{formatDate(task.dueDate)}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <span>📋</span>
          <span>0</span>
        </div>
        <div className="flex items-center gap-1">
          <span>💬</span>
          <span>0</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📎</span>
          <span>0/0</span>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center -space-x-2">
          <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-semibold">
            A
          </div>
          <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-semibold">
            B
          </div>
          <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-semibold">
            C
          </div>
        </div>
        <button
          onClick={() => onEdit(task)}
          className="text-xs text-blue-500 hover:text-blue-700 font-medium"
        >
          + ADD SUBTASK
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
