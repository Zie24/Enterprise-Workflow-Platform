const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    approver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    department: {
      type: String,
      required: true
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium"
    },

    status: {
      type: String,
      enum: [
        "draft",
        "submitted",
        "pending_approval",
        "approved",
        "rejected",
        "in_progress",
        "completed"
      ],
      default: "draft"
    },
    rejectionReason: {
  type: String,
  default: null,
  trim: true
}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Request", requestSchema);