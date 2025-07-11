import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { first_name, last_name, email, phone_num, pwd } = req.body;
  try {
    const [user] = await db.query(
      `SELECT * FROM user WHERE email_adress = "${email}";`
    );
    if (user.length != 0)
      return res.status(400).json({ message: "User already existing" });

    const hashedPwd = await bcrypt.hash(pwd, 10);

    await db.query(
      `INSERT INTO user (first_name, last_name, email_adress, phone_num, enc_pwd) VALUES ("${first_name}","${last_name}","${email}",${phone_num},"${hashedPwd}");`
    );

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error", err: error });
  }
};

export const login = async (req, res) => {
  const { email, pwd } = req.body;

  try {
    const [user] = await db.query(
      `SELECT * FROM user where email_adress = "${email}" ;`
    );
    if (user.length == 0)
      return res.status(401).json({ message: "User non existing" });
    console.log("0");
    const isMatch = await bcrypt.compare(pwd, user[0].enc_pwd);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "7d",
      }
    );
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    console.log(expiresAt);
    await db.query(
      `INSERT into refresh_token(user_id, token, expires_at) VALUES (?, ?, ?)`,
      [user[0].id, refreshToken, expiresAt]
    );
    res
      .status(201)
      .cookie("jid", refreshToken, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === "productuion", uncomment this line when deploying
        sameSite: "Strict",
        expire: expiresAt,
      })
      .json({ token: accessToken, role: user[0].role });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error " + error, err: error });
  }
};
