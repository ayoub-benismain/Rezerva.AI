// controllers/logoutController.js
import db from "../config/db.js";

export const logout = async (req, res) => {
  try {
    const token = req.cookies.jid;
    if (!token) return res.sendStatus(204); // No content

    // Remove refresh token from DB
    await db.query(`DELETE FROM refresh_token WHERE token = ?`, [token]);

    // Clear cookie
    res.clearCookie("jid", {
      httpOnly: true,
      sameSite: "Strict",
      // secure: process.env.NODE_ENV === "production",
    });

    res.sendStatus(204).json({ message: "Loged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed" });
  }
};
