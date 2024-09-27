import express from "express";

import verifyToken from "#middleware/authMiddleware.js";
import { verifyUser } from "#controllers/users/verifyUser.js";
import { verifyUserAgain } from "#controllers/users/verifyUserAgain.js";
import { loginUser } from "#controllers/users/loginUser.js";
import { logoutUser } from "#controllers/users/logoutUser.js";
import { updateAvatar } from "#controllers/users/updateAvatar.js";
import { getCurrentUser } from "#controllers/users/getCurrentUser.js";
import { getExistingUser } from "#controllers/users/getExistingUser.js";
import { registerNewUser } from "#controllers/users/registerNewUser.js";
import { loginExistingUser } from "#controllers/users/loginExistingUser.js";
import { logoutExistingUser } from "#controllers/users/logoutExistingUser.js";
import { registerExistingUser } from "#controllers/users/registerExistingUser.js";

const router = express.Router();

router.post("/signup", registerNewUser);
router.post("/signup", registerExistingUser);

router.post("/login", loginUser);
router.post("/login", loginExistingUser);
router.post("/verify", verifyUserAgain);

router.get("/current", verifyToken, getCurrentUser);
router.get("/current", verifyToken, getExistingUser);

router.get("/logout", verifyToken, logoutExistingUser);
router.get("/logout", verifyToken, logoutUser);
router.get("/verify/:verificationToken", verifyUser);
router.patch("/avatars", verifyToken, updateAvatar);

export default router;