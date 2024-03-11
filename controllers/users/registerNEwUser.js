import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import Joi from "joi";

// Schemat Joi do walidacji danych wejściowych
const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export async function registerUser(req, res) {
  const { email, password } = req.body;

  const schemaToUse = req.query.existingUser ? registerExistingUserSchema : registerNewUserSchema;

  
  const { error } = schemaToUse.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
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