import User from "../../models/userModel.js";

export async function logoutUser(req, res) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    user.token = null;
    await user.save();

    res.status(204).end(); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}