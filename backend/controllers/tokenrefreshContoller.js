import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    // Read refresh token from cookie (make sure cookie-parser middleware is used)
    const token = req.cookies.jid; 
    if (!token) return res.status(401).json({ message: "No refresh token" });

    // Verify the refresh token using the refresh secret
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN);

    // Check if token exists in DB and not expired
    const [[row]] = await db.query(
      `SELECT * FROM refresh_token WHERE user_id = ? AND token = ? AND expires_at > NOW()`,
      [payload.id, token]
    );

    if (!row) return res.status(401).json({ message: "Invalid or expired refresh token" });

    // Get user data for creating new access token
    const [[user]] = await db.query(
      `SELECT id, role FROM user WHERE id = ?`,
      [payload.id]
    );

    if (!user) return res.status(401).json({ message: "User not found" });

    // Generate new access token (short-lived)
    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Optionally: generate a new refresh token and update DB/cookie here (for security)

    // Send new access token to client
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Could not refresh token" });
  }
};
