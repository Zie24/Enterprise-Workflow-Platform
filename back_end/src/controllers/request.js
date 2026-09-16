const Request = require("../models/request");
const RequestHistory = require("../models/requesthistories");
const User = require("../models/user");
const createRequest = async (req, res) => {
    try {
        const { title, description, priority, department } = req.body;

        const request = await Request.create({
            title,
            description,
            priority,
            department,
            requester: req.user.userId,
            status: "submitted"
        });

        
        await RequestHistory.create({
  request: request._id,
  action: "created",
  performedBy: req.user.userId
});
  // Find the active manager of the same department
    const manager = await User.findOne({
      role: "manager",
      department: department,
      isActive: true
    });
// Create notification for the manager
    if (manager) {
      await Notification.create({
        recipient: manager._id,
        type: "new_request",
        message: `New request: "${title}"`,
        request: request._id
      });

    } 
    res.status(201).json({
            message: "Request created successfully",
            request
        });
      }catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create request"
        });
    }
};
const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }
    if (request.status === "approved") {
  return res.status(400).json({
    message: "Request is already approved"
  });
}

    request.status = "approved";
    request.approver = req.user.userId;

    await request.save();
    await RequestHistory.create({
  request: request._id,
  action: "approved",
  performedBy: req.user.userId
});

    res.status(200).json({
      message: "Request approved successfully",
      request
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to approve request"
    });
  }
};
const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    if (!rejectionReason) {
      return res.status(400).json({
        message: "Rejection reason is required"
      });
    }

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }
if (request.status === "rejected") {
  return res.status(400).json({
    message: "Request is already rejected"
  });
}

    request.status = "rejected";
    request.rejectionReason = rejectionReason;
    request.approver = req.user.userId;

  await request.save();
  await RequestHistory.create({
  request: request._id,
  action: "rejected",
  performedBy: req.user.userId,
  reason: rejectionReason
});
    res.status(200).json({
      message: "Request rejected successfully",
      request
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to reject request"
    });
  }
};
const getRequestHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    const history = await RequestHistory.find({
      request: id
    })
      .populate("performedBy", "name email role")
      .sort({ createdAt: 1 });

    res.status(200).json({
      requestId: id,
      history
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get request history"
    });
  }
};

const getRequests = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "employee") {
      filter.requester = req.user.userId;
    }

    const requests = await Request.find(filter)
      .populate("requester", "name email role")
      .populate("approver", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: requests.length,
      requests
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get requests"
    });
  }
};
const getRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id)
      .populate("requester", "name email role")
      .populate("approver", "name email role");

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }
    // Employee can only view their own request
    if (
      req.user.role === "employee" &&
      request.requester._id.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You are not authorized to view this request"
      });
    }

    res.status(200).json({
      request
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get request"
    });
  }
};
module.exports = {
    createRequest,
    approveRequest,
  rejectRequest,
  getRequestHistory,
    getRequests,
      getRequestById

};