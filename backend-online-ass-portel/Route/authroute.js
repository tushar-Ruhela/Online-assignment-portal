import express from "express";
import registerAdmin from "../controller/resgisterAdmin.js";
import { loginUser,forgotPassword,resetPassword } from "../controller/loginAdmin.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
