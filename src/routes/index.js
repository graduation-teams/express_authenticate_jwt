const authRoute = require("./auth");
const jwtMiddleware = require("../app/middlewares/jwtMiddleware");

const route = (app) => {
    app.use("/auth", authRoute);
    app.use(jwtMiddleware);
    app.get("/", (req, res) => {
        res.json({
            message: req.user,
        });
    });
};

module.exports = route;
