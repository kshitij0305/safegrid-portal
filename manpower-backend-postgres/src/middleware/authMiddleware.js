import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaClient.js";

const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 👇 Use decoded.id instead of decoded.userId
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Auth error:", err);
      res.status(401).json({ error: "Invalid token" });
    }
  };
};

export default authMiddleware;
