import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  body{background:#0e0618;color:#f5c6e8;font-family:'Rajdhani',sans-serif;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
  @keyframes glow{0%,100%{text-shadow:0 0 18px rgba(233,30,140,0.4);}50%{text-shadow:0 0 36px rgba(233,30,140,0.75);}}
  
  .haven-card {
    background: rgba(4,18,48,0.82);
    border: 1px solid rgba(180,20,120,0.18);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: fadeUp 0.4s ease both;
    transition: border-color 0.2s, transform 0.2s;
  }
  .haven-card:hover {
    border-color: rgba(233,30,140,0.45);
    transform: translateY(-1px);
  }
`;

export default function SafeHavens() {
  const navigate = useNavigate();
  const [havens, setHavens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLoc, setUserLoc] = useState(null);
  const [statusText, setStatusText] = useState("Acquiring high-accuracy telemetry...");

  const fetchNearbyHavens = async ({ lat, lng }) => {
    setLoading(true);
    setStatusText("Querying OSM Overpass API sanctuaries...");
    try {
      // Query police stations and hospitals within a ~3000 meter bounding circle
      const radius = 3000;
      const query = `[out:json][timeout:25];
        (
          node["amenity"="police"](around:${radius},${lat},${lng});
          way["amenity"="police"](around:${radius},${lat},${lng});
          node["amenity"="hospital"](around:${radius},${lat},${lng});
          way["amenity"="hospital"](around:${radius},${lat},${lng});
        );
        out body center;`;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query
      });

      if (!response.ok) throw new Error("Overpass query failed");
      const data = await response.json();
      
      const elements = (data.elements || []).map(item => {
        const itemLat = item.lat || (item.center && item.center.lat);
        const itemLng = item.lon || (item.center && item.center.lon);
        const name = item.tags?.name || `${item.tags?.amenity === "police" ? "Police Station" : "Hospital / Medical Center"}`;
        
        // Calculate distance
        const R = 6371; // km
        const dLat = (itemLat - lat) * Math.PI / 180;
        const dLon = (itemLng - lng) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat * Math.PI / 180) * Math.cos(itemLat * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c; // in km

        return {
          id: item.id,
          name,
          type: item.tags?.amenity,
          lat: itemLat,
          lng: itemLng,
          distance,
          address: item.tags?.["addr:street"] || item.tags?.["addr:suburb"] || ""
        };
      });

      // Sort by closest distance
      elements.sort((a, b) => a.distance - b.distance);
      setHavens(elements);
      setStatusText(`✓ Successfully mapped ${elements.length} nearby sanctuaries.`);
    } catch (err) {
      console.error(err);
      setStatusText("⚠ Failed to query Overpass server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLoc(coords);
        fetchNearbyHavens(coords);
      },
      (err) => {
        setStatusText(`⚠ Error: ${err.message}. Please enable GPS permissions.`);
      },
      { enableHighAccuracy: true }
    );
  }, []);

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
              NEARBY SAFE HAVENS
            </h1>
            <p style={{ color: "rgba(180,20,120,0.6)", fontSize: "12px", fontFamily: "'Courier New',monospace" }}>
              Dynamic sanctuary routing (Police Stations & Emergency Medical Centers within 3km)
            </p>
          </div>

          <div style={{
            padding: "12px 16px",
            background: "rgba(0,25,60,0.6)",
            border: "1px solid rgba(180,20,120,0.22)",
            borderRadius: "8px",
            fontSize: "13px",
            color: userLoc ? "#00c864" : "rgba(255,180,100,0.7)",
            fontFamily: "'Courier New',monospace",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <span>🧭</span>
            <span>{statusText}</span>
          </div>

          {userLoc && havens.length > 0 && (
            <div style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(180,20,120,0.22)",
              marginBottom: "24px",
              height: "280px",
              background: "rgba(4,10,32,0.85)"
            }}>
              <iframe
                title="Sanctuaries Map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "hue-rotate(60deg) invert(90%) contrast(110%)" }}
                src={`https://maps.google.com/maps?q=${userLoc.lat},${userLoc.lng}&z=14&output=embed`}
              />
            </div>
          )}

          {loading ? (
            <p style={{ textAlign: "center", color: "rgba(180,20,120,0.5)", fontFamily: "'Courier New',monospace", fontSize: "13px", marginTop: "30px" }}>
              POLLING GEOSPATIAL SANCTUARIES...
            </p>
          ) : havens.length === 0 && userLoc ? (
            <p style={{ textAlign: "center", color: "rgba(180,20,120,0.5)", fontFamily: "'Courier New',monospace", fontSize: "13px", marginTop: "30px" }}>
              NO SAFE HAVENS LOCATED WITHIN 3KM.
            </p>
          ) : (
            havens.map((h, i) => (
              <div key={h.id || i} className="haven-card" style={{ animationDelay: `${i * 50}ms` }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>{h.type === "police" ? "👮" : "🏥"}</span>
                    <h3 style={{
                      fontSize: "15px",
                      color: "#f5c6e8",
                      fontFamily: "'Orbitron',monospace",
                      fontWeight: 600
                    }}>
                      {h.name}
                    </h3>
                  </div>
                  {h.address && (
                    <p style={{ fontSize: "12px", color: "rgba(240,168,210,0.5)", paddingLeft: "24px" }}>
                      {h.address}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                  <span style={{
                    fontSize: "13px",
                    fontFamily: "'Courier New',monospace",
                    color: "rgba(0,208,255,0.9)",
                    fontWeight: "bold"
                  }}>
                    {h.distance.toFixed(2)} km
                  </span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      padding: "5px 10px",
                      background: "rgba(233,30,140,0.12)",
                      border: "1px solid rgba(233,30,140,0.4)",
                      borderRadius: "4px",
                      color: "#e91e8c",
                      fontSize: "11px",
                      fontFamily: "'Courier New',monospace",
                      cursor: "pointer"
                    }}
                  >
                    ROUTE →
                  </a>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
}
