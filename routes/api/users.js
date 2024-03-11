import { loginUser } from "#controllers/users/loginUser.js";
import { loginExistingUser } from "#controllers/users/loginExistingUser.js";
import { logoutExistingUser } from "#controllers/users/logoutExistingUser.js";
import { logoutUser } from "#controllers/users/logoutUser.js";
import { registerExistingUser } from "#controllers/users/registerExistingUser.js";
import { registerNewUser } from "#controllers/users/registerNewUser.js";
import { getExistingUser } from "#controllers/users/getExistingUser.js";
import { getCurrentUser } from "#controllers/users/getCurrentUser.js";
import verifyToken from "#middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

// Rejestracja użytkownika
router.post("/signup", registerNewUser);


// Logowanie użytkownika
router.post("/login", loginUser);


// Pobranie danych bieżącego użytkownika
router.get("/current", verifyToken, getCurrentUser);


// Wylogowanie użytkownika
router.get("/logout", verifyToken, logoutUser);
export default router;