const bcryptPass = require("bcrypt");
const { sequelize, DataTypes } = require("../../config/database");
const User = require("../models/user")(sequelize, DataTypes);
const jwt = require("jsonWebtoken");
const { token } = require("morgan");

const findUser = async (req) => {
    return await User.findOne({
        where: {
            email: req.body.email,
        },
    });
};

const registerUser = async (req) => {
    const user = await findUser(req);
    if (!user) {
        bcryptPass.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return next(err);
            }

            await User.create({
                email: req.body.email,
                username: req.body.username,
                password: hash,
                role: 1,
            });
        });
        return true;
    } else {
        return false;
    }
};

const loginUser = async (req) => {
    const user = await findUser(req);
    if (!user) {
        return false;
    } else {
        const comparePass = await bcryptPass.compare(
            req.body.password,
            user.password
        );
        if (!comparePass) {
            return false;
        } else {
            const token = jwt.sign(user.dataValues, "secret_key", { expiresIn: "1h" });
            return token;
        }
    }
};

module.exports = {
    registerUser,
    loginUser,
};
