import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";

const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const checkTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, "your-secret-key");
      req.user = decodedToken;
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  next();
};

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, "my-secret-key");
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
}

export async function registerUser(req, res) {
  const { email, password } = req.body;

  const schemaToUse = req.query.existingUser ? registerUserSchema : undefined;

  if (schemaToUse) {
    const { error } = schemaToUse.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  }

  try {
    // Sprawdzenie, czy użytkownik już istnieje
    if (req.query.existingUser) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email is already in use" });
      }
    } else {
      // Rejestracja nowego użytkownika
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const registerUserWithTokenCheck = [checkTokenMiddleware, verifyToken, registerUser];