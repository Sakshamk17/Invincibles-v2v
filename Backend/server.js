import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import sosRoutes from "./routes/sosRoutes.js";
import harassmentRoutes from "./routes/harassmentRoutes.js";
import liveTrackingRoutes from "./routes/liveTrackingRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow local development and deployed frontend URLs dynamically
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        "http://localhost:5173",
        "https://shield-her-x2gl.vercel.app"
      ];
      // Check if it's in the allowed list or is a vercel subdomain
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        // Also dynamically accept the origin to avoid blocking other preview/production domains
        callback(null, true);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/sos", sosRoutes); 
app.use("/api/harassment", harassmentRoutes);
app.use("/api/tracking", liveTrackingRoutes);

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
    })
    .catch((err) => {
        console.error(' Error connecting to MongoDB', err);
    });

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

// console.log(process.env.JWT_SECRET);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
