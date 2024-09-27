import User from "#models/userModel.js";
export async function verifyUser(req, res) {
  const { verificationToken } = req.params;
  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}