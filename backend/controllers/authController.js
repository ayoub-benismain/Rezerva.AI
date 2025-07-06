import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

export const register = async (req, res) => {
  const { first_name, last_name, email, phone_num, pwd } = req.body;

  // Required fields check
  if (!first_name || !last_name || !email || !pwd) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  // Email validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Phone number validation for Tunisia: exactly 8 digits (only numbers)
  if (phone_num) {
    const phoneStr = phone_num.toString();
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(phoneStr)) {
      return res.status(400).json({ message: "Phone number must be exactly 8 digits for Tunisia" });
    }
  }

  // Password strength validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
  const strongPwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_#^])[A-Za-z\d@$!%*?&\-_#^]{8,}$/;
  if (!strongPwdRegex.test(pwd)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    });
  }

  try {
    // Check if user exists
    const [existingUser] = await db.query(
      `SELECT * FROM user WHERE email_adress = ?`,
      [email]
    );

    if (existingUser.length !== 0) {
      return res.status(400).json({ message: "User already existing" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Insert user
    await db.query(
      `INSERT INTO user (first_name, last_name, email_adress, phone_num, enc_pwd) VALUES (?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone_num || null, hashedPwd]
    );

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", err: error.message });
  }
};

export const login = async (req, res) => {
  const { email, pwd } = req.body;

  // Basic input validation
  if (!email || !pwd) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    const [user] = await db.query(
      `SELECT * FROM user WHERE email_adress = ?`,
      [email]
    );

    if (user.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(pwd, user[0].enc_pwd);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create tokens
    const accessToken = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user[0].id, role: user[0].role },
      process.env.REFRESH_TOKEN,
      { expiresIn: "7d" }
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Store refresh token in DB
    await db.query(
      `INSERT INTO refresh_token(user_id, token, expires_at) VALUES (?, ?, ?)`,
      [user[0].id, refreshToken, expiresAt]
    );

    // Send refresh token as HTTP-only cookie
    res
      .status(200)
      .cookie("jid", refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // uncomment for production
        sameSite: "Strict",
        expires: expiresAt,
      })
      .json({ token: accessToken, role: user[0].role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", err: error.message });
  }
};
