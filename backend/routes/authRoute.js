import { login, register } from "../controllers/authController.js";
import express from "express";
import { refreshToken } from "../controllers/tokenrefreshContoller.js";
import { logout } from "../controllers/logoutController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("token/refresh", refreshToken);
router.post("/logout", logout);

export default router;
