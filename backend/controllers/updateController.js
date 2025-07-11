import express from "express";
import db from "../config/db.js";

export const update = async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  const { id } = req.user;
  console.log(first_name, last_name, email, phone, id);
  try {
    await db.query(
      `UPDATE user SET first_name = "${first_name}", last_name = "${last_name}", email_adress = "${email}", phone_num = ${phone} where id = ${id};`
    );

    res.status(204).json({ message: "Updated successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error });
  }
};
