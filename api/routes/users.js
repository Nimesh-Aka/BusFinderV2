import express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*
router.get("/checkAuthenticated", verifyToken, (req, res, next) => {
  res.send("Authenticated");
});

router.get("/checkUser/:id", verifyUser, (req, res, next) => {
  res.send("Hello User, you are now logged in you can delete account");
});

router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello Admin, you are now logged in you can all account");
});
*/

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/mobile/:id", getUser);
router.get("/", getAllUsers);
export default router;
