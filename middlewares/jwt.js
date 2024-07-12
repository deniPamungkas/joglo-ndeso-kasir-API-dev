import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//authenticate access token
export const authenticateToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res
      .status(401)
      .json({ message: "not logged in", error: "Unauthorized" });
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Internal server error", error: err });
    if (!result) {
      return res.status(401).json({ message: "Unauthorized", error: result });
    } else {
      req.user = result;
      next();
    }
  });
};

//check is user already logged in?
export const isLoggedIn = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (user)
        return res
          .status(409)
          .json({ message: "Already logged in", error: "conflict" });
    });
  } else {
    next();
  }
};
