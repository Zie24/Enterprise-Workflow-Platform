const express = require("express");

const router = express.Router();

const {
    createUser,
    getEmployees
} = require("../controllers/user");

const authenticate = require("../middlewares/auth");
const authorize = require("../middlewares/role");
const authorizePermission = require("../middlewares/permission");


router.post("/", createUser);


// Get employees for task assignment
router.get(
    "/employees",
    authenticate,
    authorize("manager"),
    getEmployees
);


router.get(
    "/profile",
    authenticate,
    (req, res) => {

        res.json({
            message: "You are authenticated",
            user: req.user
        });

    }
);


router.get(
    "/admin-test",
    authenticate,
    authorize("admin"),
    (req, res) => {

        res.json({
            message: "Welcome Admin"
        });

    }
);


router.get(
    "/approve-test",
    authenticate,
    authorizePermission("requests:approve"),
    (req, res) => {

        res.json({
            message: "You can approve requests"
        });

    }
);


module.exports = router;