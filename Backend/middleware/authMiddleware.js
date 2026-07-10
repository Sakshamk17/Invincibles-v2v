import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check header exists
        if (!authHeader) {
            return res.status(401).json({ msg: "No token provided" });
        }

        //Check proper format
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Invalid token format" });
        }

        const token = authHeader.split(" ")[1];

        // Support dummy login token for testing/deployed demo
        if (token === "dummy-token-local") {
            req.user = { id: "000000000000000000000001" };
            return next();
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // must contain id
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message); // 👈 VERY IMPORTANT for debugging
        return res.status(401).json({ msg: "Invalid token" });
    }
};

export default authMiddleware;