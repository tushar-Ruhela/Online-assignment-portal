import express from "express";
import {
    deleteUser,
  createUser,
  getAllUsers,
  getDepartmentsList,
  getUserById,
  updateUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/departments", getDepartmentsList);
router.get("/", getAllUsers);
router.get("/:id/edit", getUserById);
router.put("/:id/update", updateUser);
router.delete("/:id", deleteUser);

export default router;
