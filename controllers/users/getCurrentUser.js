import User from "../../models/userModel.js";

export async function getUserDetails(req, res) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.query.fullDetails) {
      return res.status(200).json({
        user: {
          email: user.email,
          subscription: user.subscription,

        },
      });
    }

    res.status(200).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}