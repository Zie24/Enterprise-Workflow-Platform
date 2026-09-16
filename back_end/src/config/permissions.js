const rolePermissions = {
    employee: [
        "requests:create",
        "requests:read",
        "tasks:read",
        "tasks:update"
    ],

    manager: [
        "requests:create",
        "requests:read",
        "requests:approve",
        "tasks:read",
        "tasks:create",
        "tasks:assign",
        "tasks:update"
    ],

    admin: [
        "users:create",
        "users:read",
        "users:update",
        "users:deactivate",

        "requests:create",
        "requests:read",
        "requests:update",
        "requests:approve",

        "tasks:create",
        "tasks:read",
        "tasks:update",
        "tasks:assign",
        "tasks:complete"
    ]
};

module.exports = rolePermissions;