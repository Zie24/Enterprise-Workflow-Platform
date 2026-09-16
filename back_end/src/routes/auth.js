const express = require("express");
const { login ,register , getMe  } = require("../controllers/auth");
const authenticate =require("../middlewares/auth")
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", authenticate, getMe);

module.exports = router;