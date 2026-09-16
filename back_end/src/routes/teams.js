const express = require("express");
const { getTeams } = require("../controllers/teams");

const authenticate = require("../middlewares/auth");

const router = express.Router();

router.get("/", authenticate, getTeams);

module.exports = router;