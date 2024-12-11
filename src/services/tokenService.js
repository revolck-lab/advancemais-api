const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const RESET_TOKEN_EXPIRATION = "1h";

const generationToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: RESET_TOKEN_EXPIRATION });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const generatePasswordResetToken = (login) => {
  if (!login)
    throw new Error(
      "CPF or CNPJ are mandatory to generate the password reset token."
    );

  const payload = { login };
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = {
  generationToken,
  verifyToken,
  generatePasswordResetToken,
};
