const { body } = require("express-validator");

const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Task title must be between 3 and 100 characters"),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("assignee")
    .notEmpty()
    .withMessage("Assignee is required")
    .isMongoId()
    .withMessage("Invalid assignee ID"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high", "urgent"])
    .withMessage(
      "Priority must be low, medium, high, or urgent"
    ),

  body("requestId")
    .optional({ checkFalsy: true })
    .isMongoId()
    .withMessage("Invalid request ID")
];

module.exports = {
  createTaskValidator
};
