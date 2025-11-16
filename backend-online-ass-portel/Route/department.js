import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
 deleteDepartment
} from "../controller/departementController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";

const router = express.Router();
router.use((req,res,next)=>{
  console.log("here it comes",req.url);
  next();
})
router.get("/", verifyToken, getAllDepartments);
router.post("/create",verifyToken,createDepartment);
router.get("/:id", verifyToken, getDepartmentById);     
router.put("/:id", verifyToken, updateDepartment); 
router.delete("/:id", verifyToken, deleteDepartment);   

export default router;
