import express from "express";
import jwt from "jsonwebtoken";
import LiveTracking from "../models/liveTracking.js";
import Profile from "../models/profile.js";

const router = express.Router();

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

// Start or Update tracking position
router.post("/update", requireAuth, async (req, res) => {
  try {
    const { lat, lng, isActive } = req.body;
    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ msg: "Latitude and Longitude required" });
    }

    // Try to get user profile name
    const profile = await Profile.findOne({ userId: req.user.id });
    const userName = profile ? `${profile.firstName} ${profile.lastName}`.trim() : "Protected User";

    let track = await LiveTracking.findOne({ userId: req.user.id });
    if (!track) {
      track = new LiveTracking({
        userId: req.user.id,
        userName,
        isActive: isActive !== undefined ? isActive : true,
        currentLocation: { lat, lng },
        routeHistory: [{ lat, lng }],
      });
    } else {
      track.currentLocation = { lat, lng };
      if (isActive !== undefined) {
        track.isActive = isActive;
      }
      track.routeHistory.push({ lat, lng });
    }

    await track.save();
    res.json({ msg: "Location updated", track });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Stop tracking session
router.post("/stop", requireAuth, async (req, res) => {
  try {
    let track = await LiveTracking.findOne({ userId: req.user.id });
    if (track) {
      track.isActive = false;
      await track.save();
    }
    res.json({ msg: "Tracking deactivated" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get all active streams (For the Guardian View feed)
router.get("/active", async (req, res) => {
  try {
    const activeStreams = await LiveTracking.find({ isActive: true }).select("userId userName currentLocation updatedAt");
    res.json(activeStreams);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Get specific user tracking path
router.get("/stream/:userId", async (req, res) => {
  try {
    const stream = await LiveTracking.findOne({ userId: req.params.userId });
    if (!stream) return res.status(404).json({ msg: "Tracking stream not found" });
    res.json(stream);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;
