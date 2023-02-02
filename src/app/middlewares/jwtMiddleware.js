const jwt = require("jsonWebtoken");

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.status(401).json({
            status: "fails",
            message: "Token was not provided",
        });
    }
    jwt.verify(token, "secret_key", (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

module.exports = jwtMiddleware;
