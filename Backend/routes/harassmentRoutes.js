// Backend\routes\harassmentRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import { createReport, getPublicReports, getMyReports } from "../controller/harassmentController.js";

const router = express.Router();

// Attaches req.user if a valid token is present; does NOT reject if absent/invalid
const optionalAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    try {
      const token = header.split(" ")[1];
      if (token === "dummy-token-local") {
        req.user = { id: "000000000000000000000001" };
      } else {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
      }
    } catch {
      // invalid/expired token — just proceed as anonymous, don't block the report
    }
  }
  next();
};

// Requires a valid token — for "my reports" only
const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ msg: "Not authenticated" });
  try {
    const token = header.split(" ")[1];
    if (token === "dummy-token-local") {
      req.user = { id: "000000000000000000000001" };
    } else {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    }
    next();
  } catch {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

router.post("/", optionalAuth, createReport);
router.get("/", getPublicReports);
router.get("/mine", requireAuth, getMyReports);

export default router;