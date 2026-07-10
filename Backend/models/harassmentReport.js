// Backend\models\harassmentReport.js
import mongoose from "mongoose";

const harassmentReportSchema = new mongoose.Schema(
  {
    // Optional — only set if the user was logged in AND chose not to report anonymously
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isAnonymous: { type: Boolean, default: true },

    incidentType: {
      type: String,
      required: true,
      enum: ["Harassment", "Stalking", "Verbal Abuse", "Physical Assault", "Unsafe Area", "Other"],
    },

    description: { type: String, required: true, maxlength: 2000 },

    // When the incident happened (may differ from submission time)
    occurredAt: { type: Date, default: Date.now },

    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      label: { type: String, default: "" }, // optional human-readable area name
    },

    status: {
      type: String,
      enum: ["submitted", "reviewed"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HarassmentReport", harassmentReportSchema);