import { login, register } from "../controllers/authController.js";
import express from "express";
import { refreshToken } from "../controllers/tokenrefreshContoller.js";
import { logout } from "../controllers/logoutController.js";
import { jwtVerification } from "../middleware/authMiddleware.js";
import { update } from "../controllers/updateController.js";
import { getMe } from "../controllers/userController.js";
import { changePassword } from "../controllers/userController.js";





const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/token/refresh", refreshToken);
router.post("/logout", logout);
router.put("/update", jwtVerification, update);
router.get("/me", jwtVerification, getMe);
router.put("/change-password", jwtVerification, changePassword);

export default router;
