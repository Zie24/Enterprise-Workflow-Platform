const Task = require("../models/task");
const Request = require("../models/request");

// Create Task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      requestId,
      assignee,
      priority
    } = req.body;

    // Request is optional
    if (requestId) {
      const request = await Request.findById(requestId);

      if (!request) {
        return res.status(404).json({
          message: "Request not found"
        });
      }

      // Task can only be linked to an approved request
      if (request.status !== "approved") {
        return res.status(400).json({
          message: "Task can only be created for an approved request"
        });
      }

      // Prevent creating more than one task for the same request
      const existingTask = await Task.findOne({
        request: requestId
      });

      if (existingTask) {
        return res.status(400).json({
          message: "A task already exists for this request"
        });
      }
    }

    // Prepare task data
    const taskData = {
      title,
      description,
      assignee,
      assignedBy: req.user.userId,
      priority
    };

    // Add request only if provided
    if (requestId) {
      taskData.request = requestId;
    }

    const task = await Task.create(taskData);

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create task"
    });
  }
};


// Start Task
const startTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // Only the assigned employee can start the task
    if (task.assignee.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not assigned to this task"
      });
    }

    // Task must be in todo status
    if (task.status !== "todo") {
      return res.status(400).json({
        message: `Task cannot be started because its current status is ${task.status}`
      });
    }

    task.status = "in_progress";

    await task.save();

    res.status(200).json({
      message: "Task started successfully",
      task
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to start task"
    });
  }
};
// Complete Task
const completeTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // Only the assigned employee can complete the task
    if (task.assignee.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not assigned to this task"
      });
    }

    // Task must be in progress
    if (task.status !== "in_progress") {
      return res.status(400).json({
        message: `Task cannot be completed because its current status is ${task.status}`
      });
    }

    task.status = "completed";

    await task.save();

    res.status(200).json({
      message: "Task completed successfully",
      task
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to complete task"
    });
  }
};


// Get Tasks
const getTasks = async (req, res) => {
  try {
    let filter = {};

    // Employee sees only tasks assigned to them
    if (req.user.role === "employee") {
      filter.assignee = req.user.userId;
    }

    // Manager sees only tasks created by them
    if (req.user.role === "manager") {
      filter.assignedBy = req.user.userId;
    }

    const tasks = await Task.find(filter)
      .populate("assignee", "name email role")
      .populate("assignedBy", "name email role")
      .populate("request", "title status priority")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: tasks.length,
      tasks
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get tasks"
    });
  }
};


// Get Task By ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate("assignee", "name email role")
      .populate("assignedBy", "name email role")
      .populate("request", "title status priority");

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    // Employee can only view tasks assigned to them
    if (
      req.user.role === "employee" &&
      task.assignee._id.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You are not authorized to view this task"
      });
    }

    // Manager can only view tasks created by them
    if (
      req.user.role === "manager" &&
      task.assignedBy._id.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You are not authorized to view this task"
      });
    }

    res.status(200).json({
      task
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get task"
    });
  }
};


module.exports = {
  createTask,
  startTask,
  completeTask,
  getTasks,
  getTaskById
};
