const jwt = require("jsonwebtoken");
const auth = require("./config/auth.json");

const generateToken = (payload) => {
  return jwt.sign(payload, auth.secret, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken };
