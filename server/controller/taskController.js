import Task from "../models/tasks.js"

const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body

       

        const newTask = await Task.create({
            title,
            description,
            priority,
            status,
            dueDate,
            userId: req.user._id
        })

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            newTask
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllTask = async (req, res) => {
    try {
        const userId = req.user._id
        const fetchAllTaskById = await Task.find({ userId })

        if (fetchAllTaskById) {
            return res.status(201).json({
                success: true,
                message: "fetched all tasks",
                tasks: fetchAllTaskById
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const taskId = req.params.id;

        const fetchTaskById = await Task.findOne({ _id: taskId, userId });

        if (fetchTaskById) {
            return res.status(201).json({
                success: true,
                message: "Fetched single task successfully",
                task: fetchTaskById,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    const { title, description, priority, dueDate, status } = req.body;
    const userId = req.user._id
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,
            {
                title,
                description,
                priority,
                status,
                dueDate,
            },
            { new: true })

        if (updatedTask) {
            return res.status(201).json({
                success: true,
                message: "Task updated successfully",
                task: updatedTask
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "id is required"
            })
        }
        const task = await Task.findById(id)

        if (task.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete this task"
            });
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        if (deletedTask) {
            return res.status(201).json({
                success: true,
                message: "task deleted successfully"
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const allTasks = await Task.find({ userId });

    if (allTasks && allTasks.length > 0) {
      const totalTasks = allTasks.length;
      const completedTasks = allTasks.filter(
        (task) => task.status === "Completed"
      ).length;
      const pendingTasks = allTasks.filter(
        (task) => task.status === "Todo" || task.status === "In Progress"
      ).length;

      const priorityBreakdown = {
        Low: allTasks.filter((task) => task.priority === "Low").length,
        Medium: allTasks.filter((task) => task.priority === "Medium").length,
        High: allTasks.filter((task) => task.priority === "High").length,
      };

      return res.status(201).json({
        success: true,
        message: "Fetched detailed task statistics successfully",
        stats: {
          totalTasks,
          completedTasks,
          pendingTasks,
          priorityBreakdown,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No tasks found for this user",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { createTask, getAllTask, getSingleTask, updateTask, deleteTask ,getTaskStats }


