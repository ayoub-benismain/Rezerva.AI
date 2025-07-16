// controllers/userController.js
import db from "../config/db.js";
import bcrypt from "bcryptjs";

// GET /api/user/me
export const getMe = async (req, res) => {
  const { id } = req.user;

  try {
    const [user] = await db.query(`SELECT * FROM user WHERE id = ?`, [id]);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = user[0];
    res.status(200).json({
      name: `${data.first_name} ${data.last_name}`,
      email: data.email_adress,
      phone: data.phone_num,
      location: data.location || "N/A",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user info", error: err });
  }
};

// PUT /api/user/change-password
export const changePassword = async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;

  try {
    // Get current hashed password from DB (enc_pwd column)
    const [rows] = await db.query(`SELECT enc_pwd FROM user WHERE id = ?`, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify old password matches
    const valid = await bcrypt.compare(oldPassword, rows[0].enc_pwd);

    if (!valid) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in DB
    await db.query(`UPDATE user SET enc_pwd = ? WHERE id = ?`, [hashedNewPassword, id]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password change error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};
