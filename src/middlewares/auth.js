import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
      let token;
  
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          token = req.headers.authorization.split(" ")[1];
          console.log(token);

  
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await User.findById(decoded.id).select("-password");
  
          next();
        } catch (error) {
          console.error(error);
          res.status(401);
          throw new Error("Not authorized, token failed");
        }
      }
  
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  };
  
  const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
  };
  
    export { protect, admin };  