import { login, register } from "../controllers/authController.js";
import express from "express";
import { refreshToken } from "../controllers/tokenrefreshContoller.js";
import { logout } from "../controllers/logoutController.js";
import { jwtVerification } from "../middleware/authMiddleware.js";
import { update } from "../controllers/updateController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/token/refresh", refreshToken);
router.post("/logout", logout);
router.put("/update", jwtVerification, update);

export default router;
