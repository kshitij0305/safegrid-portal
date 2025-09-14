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

      // ✅ Ensure we always have a userId
      const userId = decoded.id || decoded.userId;
      if (!userId) {
        return res.status(401).json({ error: "Invalid token payload" });
      }

      // ✅ Fetch fresh user data from DB
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      // ✅ Role check if needed
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Attach both DB user + decoded token
      req.user = user;
      req.tokenPayload = decoded;

      next();
    } catch (err) {
      console.error("Auth error:", err);
      res.status(401).json({ error: "Invalid token" });
    }
  };
};

export default authMiddleware;
