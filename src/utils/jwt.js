import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (id) => {
  const token = jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  return token;
};

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
