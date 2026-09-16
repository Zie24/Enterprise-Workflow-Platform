const express = require("express");

const router = express.Router();

const {
  createTask,startTask ,completeTask ,  getTasks , getTaskById} = require("../controllers/task");

const authenticate = require("../middlewares/auth");
const authorizeRoles = require("../middlewares/authorize");
const {
  createTaskValidator
} = require("../validators/task.js");
router.post(
  "/",
  authenticate,
  authorizeRoles("manager", "admin"),
  createTaskValidator,
  createTask
);
router.patch(
  "/:id/start",
  authenticate,
  startTask
);
router.patch(
  "/:id/complete",
  authenticate,
  completeTask
);
router.get(
  "/",
  authenticate,
  getTasks
);
router.get(
  "/:id",
  authenticate,
  getTaskById
);

module.exports = router;