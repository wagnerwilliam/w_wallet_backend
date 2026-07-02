import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const signToken = ({ _id }) => {
  return jwt.sign({ id: _id }, JWT_SECRET_KEY /*{ expiresIn: "5m"}*/);
};
