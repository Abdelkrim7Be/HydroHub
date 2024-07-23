const jwt = require("jsonwebtoken");

module.exports.createToken = async (data) => {
  // generate a token
  const token = await jwt.sign(data, process.env.SECRET, {
    expiresIn: "7d",
  });
  return token;
};
