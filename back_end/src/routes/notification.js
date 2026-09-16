const express = require("express");

const {
  getNotifications,
  markAsRead,
  markAllAsRead
} = require("../controllers/notification");

const authenticate = require("../middlewares/auth");

const router = express.Router();


// Get current user's notifications
router.get(
  "/",
  authenticate,
  getNotifications
);


// Mark all as read
router.patch(
  "/read-all",
  authenticate,
  markAllAsRead
);


// Mark one as read
router.patch(
  "/:id/read",
  authenticate,
  markAsRead
);


module.exports = router;