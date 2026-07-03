import jwt from "jsonwebtoken";

export const generateAccessToken = ({ _id }) => {
  return jwt.sign({ sub: _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};

export const generateRefreshToken = ({ _id }) => {
  return jwt.sign({ sub: _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};
