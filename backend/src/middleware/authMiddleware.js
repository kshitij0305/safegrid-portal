import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaClient.js";

const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // No token provided
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.error("❌ Invalid JWT:", err.message);
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      // Ensure userId exists
      const userId = decoded.id || decoded.userId;
      if (!userId) {
        return res.status(401).json({ error: "Invalid token payload" });
      }

      // Fetch user from DB
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      // Check role
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden: insufficient role" });
      }

      // Attach user to request
      req.user = user;
      req.tokenPayload = decoded;

      next();
    } catch (err) {
      console.error("❌ Auth middleware error:", err.message);
      res.status(500).json({ error: "Internal auth error" });
    }
  };
};

export default authMiddleware;
