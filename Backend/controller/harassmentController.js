// Backend\controller\harassmentController.js
import HarassmentReport from "../models/harassmentReport.js";

// POST /api/harassment  — create a report (works with or without auth)
export const createReport = async (req, res) => {
  try {
    const { incidentType, description, occurredAt, location, isAnonymous } = req.body || {};

    if (!incidentType || !description || !location?.lat || !location?.lng) {
      return res.status(400).json({ msg: "incidentType, description, and location are required" });
    }

    const anon = isAnonymous !== false; // default true unless explicitly false

    const report = await HarassmentReport.create({
      reporterId: !anon && req.user?.id ? req.user.id : null,
      isAnonymous: anon,
      incidentType,
      description: description.trim(),
      occurredAt: occurredAt || Date.now(),
      location: {
        lat: location.lat,
        lng: location.lng,
        label: location.label || "",
      },
    });

    res.status(201).json({ msg: "Report submitted", reportId: report._id });
  } catch (error) {
    console.error("CREATE REPORT ERROR:", error);
    res.status(500).json({ msg: error.message });
  }
};

// GET /api/harassment  — public, anonymized feed (Public Safety Feed reuses this)
export const getPublicReports = async (req, res) => {
  try {
    const reports = await HarassmentReport.find()
      .select("incidentType description occurredAt location.lat location.lng location.label createdAt")
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(reports); // reporterId/isAnonymous never selected — nothing PII leaks
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET /api/harassment/mine — logged-in user's own submitted (non-anonymous) reports
export const getMyReports = async (req, res) => {
  try {
    if (!req.user?.id) return res.status(401).json({ msg: "Not authenticated" });
    const reports = await HarassmentReport.find({ reporterId: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};