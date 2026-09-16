const express = require("express");
const { createRequest ,approveRequest,rejectRequest,  getRequestHistory ,getRequests  ,getRequestById } = require("../controllers/request");
const authenticate = require("../middlewares/auth");
const authorizeRoles = require("../middlewares/authorize");
const router = express.Router();
router.post("/", authenticate, createRequest);

router.patch(
  "/:id/approve",
  authenticate,
  authorizeRoles("manager", "admin"),
  approveRequest
);

router.patch(
  "/:id/reject",
  authenticate,
  authorizeRoles("manager", "admin"),
  rejectRequest
);

router.get(
  "/:id/history",
  authenticate,
  authorizeRoles("manager", "admin"),
  getRequestHistory
);

router.get(
  "/",
  authenticate,
  getRequests
);

router.get(
  "/:id",
  authenticate,
  getRequestById
);
module.exports = router;
