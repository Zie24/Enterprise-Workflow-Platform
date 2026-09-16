const rolePermissions = require("../config/permissions");

const authorizePermission = (requiredPermission) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const userPermissions = rolePermissions[req.user.role] || [];

        if (!userPermissions.includes(requiredPermission)) {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            });
        }

        next();
    };
};

module.exports = authorizePermission;