import express from "express";
import { checkUniqueness, getAllUsers, login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/check-uniqueness", checkUniqueness);
router.post("/login", login);
router.get("/all-users", getAllUsers)

export default router;
