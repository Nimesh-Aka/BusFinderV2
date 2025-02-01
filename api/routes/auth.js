import express from "express";
import { checkUniqueness, login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/check-uniqueness", checkUniqueness);
router.post("/login", login);

export default router;
