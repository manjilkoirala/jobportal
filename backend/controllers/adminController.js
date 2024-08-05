import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Admin } from "../models/adminSchemas.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("All fileds are required.", 400));
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return next(new ErrorHandler("Email is already registered.", 400));
    }
    const adminData = {
      name,
      email,
      password,
    };
    const admin = await Admin.create(adminData);
    sendToken(admin, 201, res, "Admin Registered.");
  } catch (error) {
    next(error);
  }
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required.", 400));
  }
  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  const isPasswordMatched = await admin.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  sendToken(admin, 200, res, "Admin logged in successfully.");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});

export const getAdmin = catchAsyncErrors(async (req, res, next) => {
  const admin = req.admin;
  res.status(200).json({
    success: true,
    admin,
  });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newAdminData = {
    name: req.body.name,
    email: req.body.email,
  };
  const admin = await Admin.findByIdAndUpdate(req.admin.id, newAdminData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    admin,
    message: "Profile updated.",
  });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findById(req.admin.id).select("+password");

  const isPasswordMatched = await admin.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect.", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("New password & confirm password do not match.", 400)
    );
  }

  admin.password = req.body.newPassword;
  await admin.save();
  sendToken(admin, 200, res, "Password updated successfully.");
});
