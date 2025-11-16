import express from "express";
import registerAdmin from "../controller/resgisterAdmin.js";
import { loginUser } from "../controller/loginAdmin.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginUser);

export default router;
