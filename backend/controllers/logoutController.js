import db from "../config/db.js";

export const logout = async (req, res) => {
  const token = req.cookie.jid;
  if (token)
    await db.query(`DELETE from refresh_token where token = "${token}"`);

  res
    .clearCookie("jid", {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
    })
    .json({ message: "Log out" });
};
