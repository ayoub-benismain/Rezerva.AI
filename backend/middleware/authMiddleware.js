import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const jwtVerification = async (req, res, next) => {
  const tokenHead = req.header("Authorization");
  if (!tokenHead)
    return res.status(403).json({ message: "No token, access denied" });

  const token = tokenHead.startsWith("Bearer ")
    ? tokenHead.slice(7)
    : tokenHead;

  try {
    const dcoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentSecond = Math.floor(Date.now() / 1000);

    if (dcoded.exp <= currentSecond)
      res.status(403).json({ message: "Acess token expired, access denied" });

    const [user] = await db.query(`SELECT * FROM user WHERE id = ${dcoded.id}`);
    if (user.length == 0)
      res.json(403).json({ message: "user non existant, access denied" });
    req.user = dcoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid  " + error });
  }
};
