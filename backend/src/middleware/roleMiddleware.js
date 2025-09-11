// middleware/roleMiddleware.js
export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user data exists in request (from authMiddleware)
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied. No role found." });
    }

    // If the user's role is NOT in the allowedRoles array → deny
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }

    // Otherwise → continue to next middleware or controller
    next();
  };
};
