const { validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../services/authService");

const getError = (aData) => {
    let oData = {};
    aData.forEach((err) => {
        if (!oData[err.param] && oData[err.param] !== err.param) {
            oData[err.param] = err.msg;
        }
    });

    return oData;
};

class authController {
    async signup(req, res, next) {
        try {
            const validator = validationResult(req);
            if (!validator.isEmpty()) {
                const aData = getError(validator.array());
                res.status(400).json({
                    status: "fails",
                    message: aData,
                });
                return;
            }

            await registerUser(req, res).then((result) => {
                if (!result) {
                    res.status(401).json({
                        status: "fails",
                        message: "Email already registered",
                    });
                } else {
                    res.json({
                        status: "success",
                        message: "Email successfully registered",
                    });
                }
            });
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }

    async signin(req, res, next) {
        try {
            const validator = validationResult(req);
            if (!validator.isEmpty()) {
                const aData = getError(validator.array());
                res.status(400).json({
                    status: "fails",
                    message: aData,
                });
                return;
            } else {
                await loginUser(req).then((token) => {
                    if (!token) {
                        res.status(401).json({
                            status: "fails",
                            message: "Email or password incorrect",
                        });
                    } else {
                        res.json({
                            status: "success",
                            message: "Sign in successfully",
                            token,
                        });
                    }
                });
            }
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
}

module.exports = new authController();
