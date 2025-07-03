import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookie.jid;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const payload = jwt.verify(token, process.env.REFRESH_SECRET); //to get the user id which is contained in the token

    const [[row]] = await db.query(
      `SELECT * from refresh_token where user_id = ${payload.id} and token = "${token} and expires_at > NOW();"`
    );
    if (!row) return res.status(401).json({ message: "Invalid refresh token" });

    const [[user]] = await db.query(
      `SELECT id, role from user where id = "${payload.id}" ;`
    );

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json(200).json({ accesToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: "Could not refresh token" });
  }
};
