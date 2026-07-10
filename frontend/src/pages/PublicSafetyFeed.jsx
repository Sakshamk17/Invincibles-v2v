import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPublicReports } from "../services/harassmentService";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  body{background:#0e0618;color:#f5c6e8;font-family:'Rajdhani',sans-serif;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
  @keyframes glow{0%,100%{text-shadow:0 0 18px rgba(233,30,140,0.4);}50%{text-shadow:0 0 36px rgba(233,30,140,0.75);}}
  
  .feed-card {
    background: rgba(4,18,48,0.82);
    border: 1px solid rgba(180,20,120,0.18);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    animation: fadeUp 0.4s ease both;
    transition: transform 0.2s, border-color 0.2s;
  }
  .feed-card:hover {
    transform: translateY(-2px);
    border-color: rgba(233,30,140,0.45);
  }
`;

export default function PublicSafetyFeed() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userLoc, setUserLoc] = useState(null);
  const [proximityCount, setProximityCount] = useState(0);

  useEffect(() => {
    // 1. Fetch Reports
    const getReports = async () => {
      try {
        const data = await fetchPublicReports();
        setReports(data);
      } catch (err) {
        setError("Failed to load community safety updates.");
      } finally {
        setLoading(false);
      }
    };
    getReports();

    // 2. Get User Location to calculate proximity
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => console.log("Proximity check skipped (location disabled)")
    );
  }, []);

  // Calculate nearby incidents (within ~5km)
  useEffect(() => {
    if (!userLoc || reports.length === 0) return;
    
    // Quick Haversine distance calculator
    const getDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    const nearby = reports.filter(r => {
      if (!r.location?.lat || !r.location?.lng) return false;
      const dist = getDistance(userLoc.lat, userLoc.lng, r.location.lat, r.location.lng);
      return dist <= 5; // 5 km radius
    });

    setProximityCount(nearby.length);
  }, [userLoc, reports]);

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: "#0e0618" }}>
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: "64px",
          padding: "0 20px", display: "flex", alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(14,6,24,0.94)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(180,20,120,0.14)",
        }}>
          <span style={{
            fontFamily: "'Orbitron',monospace", fontWeight: 700, color: "#e91e8c",
            letterSpacing: "3px", fontSize: "15px",
          }}>NARIGUARD</span>
          <button onClick={() => navigate("/dashboard")} style={{
            background: "transparent", border: "1px solid rgba(180,20,120,0.3)",
            borderRadius: "6px", color: "rgba(233,30,140,0.6)", padding: "6px 14px",
            fontFamily: "'Courier New',monospace", fontSize: "11px", cursor: "pointer",
          }}>← DASHBOARD</button>
        </nav>

        <main style={{ maxWidth: "720px", margin: "0 auto", padding: "96px 20px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px", animation: "fadeUp .5s ease both" }}>
            <h1 style={{
              fontFamily: "'Courier New',monospace", fontSize: "clamp(1.2rem,4vw,2rem)",
              color: "#f8a8d8", letterSpacing: "3px", animation: "glow 4s ease-in-out infinite",
              marginBottom: "8px",
            }}>
              PUBLIC SAFETY FEED
            </h1>
            <p style={{ color: "rgba(180,20,120,0.6)", fontSize: "12px", fontFamily: "'Courier New',monospace" }}>
              Community awareness & incident logging network
            </p>
          </div>

          {userLoc && (
            <div style={{
              background: "rgba(233,30,140,0.06)",
              border: "1px solid rgba(233,30,140,0.3)",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "'Courier New',monospace",
              fontSize: "13px",
              color: proximityCount > 0 ? "#ff5252" : "#00c864",
              animation: "fadeUp .4s ease both",
            }}>
              <span style={{ fontSize: "16px" }}>📡</span>
              <span>
                {proximityCount > 0 
                  ? `ALERT: ${proximityCount} incident(s) reported within 5km of your location recently.`
                  : "Safe Area: No recent incidents reported in your immediate vicinity (5km)."}
              </span>
            </div>
          )}

          {loading ? (
            <p style={{ textAlign: "center", color: "rgba(180,20,120,0.5)", fontFamily: "'Courier New',monospace", fontSize: "13px", marginTop: "40px" }}>
              FETCHING PUBLIC TELEMETRY...
            </p>
          ) : error ? (
            <p style={{ textAlign: "center", color: "#ff6b6b", fontFamily: "'Courier New',monospace", fontSize: "13px", marginTop: "40px" }}>
              {error}
            </p>
          ) : reports.length === 0 ? (
            <p style={{ textAlign: "center", color: "rgba(180,20,120,0.5)", fontFamily: "'Courier New',monospace", fontSize: "13px", marginTop: "40px" }}>
              NO SAFETY ALERTS REPORTED YET.
            </p>
          ) : (
            reports.map((r, i) => (
              <div key={r._id || i} className="feed-card" style={{ animationDelay: `${i * 60}ms` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{
                    padding: "4px 8px",
                    background: "rgba(233,30,140,0.12)",
                    border: "1px solid rgba(233,30,140,0.35)",
                    borderRadius: "4px",
                    color: "#e91e8c",
                    fontSize: "11px",
                    fontFamily: "'Orbitron',monospace",
                    letterSpacing: "1px",
                    textTransform: "uppercase"
                  }}>
                    {r.incidentType}
                  </span>
                  <span style={{
                    fontSize: "11px",
                    color: "rgba(240,168,210,0.5)",
                    fontFamily: "'Courier New',monospace"
                  }}>
                    {formatDate(r.occurredAt)}
                  </span>
                </div>

                <p style={{
                  fontSize: "14px",
                  lineHeight: "1.5",
                  color: "#f5c6e8",
                  marginBottom: "12px",
                  whiteSpace: "pre-line"
                }}>
                  {r.description}
                </p>

                {r.location?.label && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "rgba(0,208,255,0.8)",
                    fontFamily: "'Courier New',monospace"
                  }}>
                    <span>📍</span>
                    <span>{r.location.label}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
}
