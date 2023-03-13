import express from "express";
import { changeUserRole, getAllUsers } from "../controllers/admin.js";

const router = express.Router();

router.post("/users", getAllUsers);
router.post("/changerole", changeUserRole);

export default router;
