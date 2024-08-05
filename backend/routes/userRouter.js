import express from "express";
import {
  getUser,
  getAllUsers,
  login,
  logout,
  register,
  updatePassword,
  updateProfile,
  deleteUser,
} from "../controllers/userController.js";
import { isAuthenticated, isAuthenticatedAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getall", getAllUsers);
router.delete("/delete/:id", deleteUser);

router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);

export default router;
