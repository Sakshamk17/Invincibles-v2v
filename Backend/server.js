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

// Overpass API Proxy Route to prevent CORS blocks in frontend
app.post("/api/overpass", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const mirrors = [
      "https://overpass-api.de/api/interpreter",
      "https://lz4.overpass-api.de/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter"
    ];

    let response;
    let lastError;

    for (const mirror of mirrors) {
      try {
        const url = `${mirror}?data=${encodeURIComponent(query)}`;
        response = await fetch(url, {
          headers: {
            "User-Agent": "NariGuard/1.0 (https://nariguard.vercel.app)"
          }
        });
        if (response.ok) {
          const data = await response.json();
          return res.json(data);
        } else {
          lastError = new Error(`Status ${response.status} from ${mirror}`);
        }
      } catch (err) {
        lastError = err;
      }
    }

    res.status(502).json({ error: lastError?.message || "All Overpass API mirrors failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
