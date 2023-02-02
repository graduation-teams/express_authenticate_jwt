const { check } = require("express-validator");

const registerValidate = () => {
    return [
        check("email", "Email is required").not().isEmpty(),
        check("email", "Email is invalid").isEmail(),
        check("username", "Username is required").not().isEmpty(),
        check("username", "Username must be at least 3 characters").isLength({
            min: 3,
        }),
        check("password", "Password is required").not().isEmpty(),
        check("password", "Password must be at least 6 characters").isLength({
            min: 6,
        }),
        check("password_confirmation", "Password confirmation is required")
            .not()
            .isEmpty(),
        check("password_confirmation", "Password mismatch").custom(
            (value, { req }) => value === req.body.password
        ),
    ];
};

const loginValidate = () => {
    return [
        check("email", "Email is required").not().isEmpty(),
        check("email", "Email is invalid").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        check("password", "Password must be at least 6 characters").isLength({
            min: 6,
        }),
    ];
};

module.exports = {
    registerValidate,
    loginValidate,
};
