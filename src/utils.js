const jwt = require("jsonwebtoken");
const auth = require("./config/auth.json");

const generateToken = (playload) => {
  return jwt.sign(playload, auth.secret, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken };