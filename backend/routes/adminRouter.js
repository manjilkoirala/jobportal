import express from "express";
import {
  getAdmin,
  login,
  logout,
  register,
  updatePassword,
  updateProfile,
  deleteAdmin,
  getAllAdmin,
} from "../controllers/adminController.js";
import { isAuthenticatedAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getall", getAllAdmin);
router.get("/logout", isAuthenticatedAdmin, logout);
router.get("/getadmin", isAuthenticatedAdmin, getAdmin);
router.put("/update/profile", isAuthenticatedAdmin, updateProfile);
router.put("/update/password", isAuthenticatedAdmin, updatePassword);
router.delete("/delete/:id", isAuthenticatedAdmin, deleteAdmin);

export default router;
