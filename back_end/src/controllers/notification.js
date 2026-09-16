const Notification = require("../models/notification");


// Get current user's notifications
const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      recipient: req.user.userId
    })
      .populate("request", "title status")
      .sort({ createdAt: -1 });

    const unreadCount = await Notification.countDocuments({
      recipient: req.user.userId,
      isRead: false
    });

    res.status(200).json({
      count: notifications.length,
      unreadCount,
      notifications
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to get notifications"
    });

  }
};


// Mark one notification as read
const markAsRead = async (req, res) => {
  try {

    const { id } = req.params;

    const notification = await Notification.findOne({
      _id: id,
      recipient: req.user.userId
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
      notification
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update notification"
    });

  }
};


// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {

    await Notification.updateMany(
      {
        recipient: req.user.userId,
        isRead: false
      },
      {
        $set: {
          isRead: true
        }
      }
    );

    res.status(200).json({
      message: "All notifications marked as read"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update notifications"
    });

  }
};


module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead
};