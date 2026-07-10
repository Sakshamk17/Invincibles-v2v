import mongoose from "mongoose";

const liveTrackingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    userName: { type: String, default: "User" },
    isActive: { type: Boolean, default: false },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    routeHistory: [
      {
        lat: { type: Number },
        lng: { type: Number },
        timestamp: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("LiveTracking", liveTrackingSchema);
