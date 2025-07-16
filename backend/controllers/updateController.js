import db from "../config/db.js";


export const update = async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  const { id } = req.user;

  try {
    await db.query(
    `UPDATE user SET first_name = ?, last_name = ?, email_adress = ?, phone_num = ? WHERE id = ?`,
    [first_name, last_name, email, phone, id]
    );


    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error });
  }
};
