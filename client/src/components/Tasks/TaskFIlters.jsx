import { Filter } from 'lucide-react';

const TaskFilters = ({ filters, onFilterChange }) => {
  const priorities = ['All', 'High', 'Medium', 'Low'];
  const statuses = ['All', 'Todo', 'In Progress', 'Completed'];

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>


        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Priority:</label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

 
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Status:</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>


        {(filters.priority !== 'All' || filters.status !== 'All') && (
          <button
            onClick={() => onFilterChange({ priority: 'All', status: 'All' })}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;
