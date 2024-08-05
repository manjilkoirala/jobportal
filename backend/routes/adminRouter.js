import express from "express";
import {
  getAdmin,
  login,
  logout,
  register,
  updatePassword,
  updateProfile,
} from "../controllers/adminController.js";
import { isAuthenticatedAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticatedAdmin, logout);
router.get("/getadmin", isAuthenticatedAdmin, getAdmin);
router.put("/update/profile", isAuthenticatedAdmin, updateProfile);
router.put("/update/password", isAuthenticatedAdmin, updatePassword);

export default router;
