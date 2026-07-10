import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/config";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  body{background:#0e0618;color:#f5c6e8;font-family:'Rajdhani',sans-serif;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
  @keyframes glow{0%,100%{text-shadow:0 0 18px rgba(233,30,140,0.4);}50%{text-shadow:0 0 36px rgba(233,30,140,0.75);}}
  
  .stream-card {
    background: rgba(4,18,48,0.82);
    border: 1px solid rgba(180,20,120,0.18);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: fadeUp 0.4s ease both;
  }
`;

export default function FollowMe() {
  const navigate = useNavigate();
  const [activeStreams, setActiveStreams] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPath, setSelectedPath] = useState([]);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastStatus, setBroadcastStatus] = useState("Inactive");

  const watchIdRef = useRef(null);
  const pollIntervalRef = useRef(null);
  const streamPollRef = useRef(null);

  // 1. Fetch all active live broadcasts for Guardian monitoring
  const fetchActiveStreams = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tracking/active`);
      if (res.ok) {
        const data = await res.json();
        setActiveStreams(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchActiveStreams();
    const interval = setInterval(fetchActiveStreams, 8000);
    return () => clearInterval(interval);
  }, []);

  // 2. Poll the path of a selected tracked user
  useEffect(() => {
    if (!selectedUser) {
      setSelectedPath([]);
      clearInterval(streamPollRef.current);
      return;
    }

    const fetchUserStream = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tracking/stream/${selectedUser.userId}`);
        if (res.ok) {
          const data = await res.json();
          setSelectedPath(data.routeHistory || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserStream();
    streamPollRef.current = setInterval(fetchUserStream, 4000);

    return () => clearInterval(streamPollRef.current);
  }, [selectedUser]);

  // 3. Broadcast user's live position
  const startBroadcasting = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsBroadcasting(true);
    setBroadcastStatus("Acquiring GPS Signal...");

    const sendCoords = async (lat, lng) => {
      try {
        const token = localStorage.getItem("token");
        await fetch(`${BASE_URL}/tracking/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ lat, lng, isActive: true })
        });
        setBroadcastStatus(`Broadcasting: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      } catch (err) {
        console.error("Broadcast failed:", err);
      }
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        sendCoords(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        setBroadcastStatus(`GPS Error: ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const stopBroadcasting = async () => {
    setIsBroadcasting(false);
    setBroadcastStatus("Stopped");
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/tracking/stop`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      clearInterval(pollIntervalRef.current);
      clearInterval(streamPollRef.current);
    };
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

        <main style={{ maxWidth: "800px", margin: "0 auto", padding: "96px 20px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h1 style={{
              fontFamily: "'Courier New',monospace", fontSize: "clamp(1.2rem,4vw,2rem)",
              color: "#f8a8d8", letterSpacing: "3px", animation: "glow 4s ease-in-out infinite",
              marginBottom: "8px",
            }}>
              GUARDIAN MODE
            </h1>
            <p style={{ color: "rgba(180,20,120,0.6)", fontSize: "12px", fontFamily: "'Courier New',monospace" }}>
              "Follow Me" Real-Time Walking Path & Live Guardian Stream
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            
            {/* Broadcaster Controller Panel */}
            <div style={{
              background: "rgba(4,18,48,0.82)",
              border: "1px solid rgba(180,20,120,0.18)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center"
            }}>
              <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "16px", color: "#f5c6e8", marginBottom: "12px" }}>
                BROADCAST YOUR WALK
              </h2>
              <p style={{ fontSize: "13px", color: "rgba(240,168,210,0.5)", marginBottom: "20px" }}>
                Activating this lets registered friends watch your live position update on their map dashboard.
              </p>

              <div style={{
                padding: "10px 14px",
                background: "rgba(0,25,60,0.6)",
                border: "1px solid rgba(180,20,120,0.22)",
                borderRadius: "6px",
                fontSize: "12px",
                color: isBroadcasting ? "#00c864" : "rgba(255,180,100,0.7)",
                fontFamily: "'Courier New',monospace",
                marginBottom: "20px"
              }}>
                Broadcasting Status: {broadcastStatus}
              </div>

              {!isBroadcasting ? (
                <button onClick={startBroadcasting} style={{
                  padding: "12px 24px",
                  background: "linear-gradient(90deg, #9b30e0, #e91e8c)",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: "bold",
                  cursor: "pointer",
                  letterSpacing: "1.5px"
                }}>
                  START BROADCAST
                </button>
              ) : (
                <button onClick={stopBroadcasting} style={{
                  padding: "12px 24px",
                  background: "rgba(255,59,48,0.2)",
                  border: "1px solid #ff3b30",
                  borderRadius: "6px",
                  color: "#ff3b30",
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: "bold",
                  cursor: "pointer",
                  letterSpacing: "1.5px"
                }}>
                  STOP BROADCAST
                </button>
              )}
            </div>

            {/* Monitoring Map & Active Streams Panel */}
            <div style={{
              background: "rgba(4,18,48,0.82)",
              border: "1px solid rgba(180,20,120,0.18)",
              borderRadius: "12px",
              padding: "20px"
            }}>
              <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: "16px", color: "#f5c6e8", marginBottom: "16px", textAlign: "center" }}>
                GUARDIAN VIEWER
              </h2>

              {selectedUser && selectedPath.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                    <span style={{ color: "#00d0ff" }}>Streaming: {selectedUser.userName}</span>
                    <button onClick={() => setSelectedUser(null)} style={{ background: "none", border: "none", color: "#ff6b6b", cursor: "pointer" }}>✕ Stop Viewing</button>
                  </div>
                  <div style={{ height: "300px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(180,20,120,0.3)" }}>
                    <iframe
                      title="Live Path Viewer"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "hue-rotate(60deg) invert(90%) contrast(110%)" }}
                      src={`https://maps.google.com/maps?q=${selectedPath[selectedPath.length-1].lat},${selectedPath[selectedPath.length-1].lng}&z=16&output=embed`}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h3 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(240,168,210,0.5)", marginBottom: "4px" }}>
                  Active Sanctuary Streams
                </h3>

                {activeStreams.length === 0 ? (
                  <p style={{ fontSize: "13px", color: "rgba(240,168,210,0.3)", fontStyle: "italic", textAlign: "center" }}>
                    No contacts are currently broadcasting live walks.
                  </p>
                ) : (
                  activeStreams.map((stream) => (
                    <div key={stream.userId} className="stream-card">
                      <div>
                        <div style={{ fontWeight: "bold", fontSize: "14px" }}>{stream.userName}</div>
                        <div style={{ fontSize: "11px", color: "rgba(240,168,210,0.4)", fontFamily: "'Courier New', monospace" }}>
                          Active Walk Live Route Stream
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedUser(stream)}
                        style={{
                          padding: "6px 12px",
                          background: "rgba(233,30,140,0.12)",
                          border: "1px solid rgba(233,30,140,0.4)",
                          borderRadius: "4px",
                          color: "#e91e8c",
                          fontSize: "11px",
                          cursor: "pointer"
                        }}
                      >
                        MONITOR PATH
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
