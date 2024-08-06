import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { Admin } from "../models/adminSchemas.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated.", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource.`
        )
      );
    }
    next();
  };
};

export const isAuthenticatedAdmin = catchAsyncErrors(async (req, res, next) => {
  const { adminToken } = req.cookies;
  if (!adminToken) {
    return next(new ErrorHandler("Admin is not authenticated.", 400));
  }
  const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);

  req.admin = await Admin.findById(decoded.id);

  next();
});
