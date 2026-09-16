const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {///ودي Middleware function.والـ Middleware في Express بتستقبل 3 حاجات: req -res- next
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token is missing"
            });
        }

        const decoded = jwt.verify(//Verify Token
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authenticate;