import jwt from "jsonwebtoken";
export const protectedRoute = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "User not authenticated(Missing Token)",
      });
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedData) {
      return res.status(401).json({
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log("Error in protected route", error);
  }
};
