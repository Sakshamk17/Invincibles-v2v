import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { submitReport } from "../services/harassmentService";

const G = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  body{background:#0e0618;color:#f5c6e8;font-family:'Rajdhani',sans-serif;}
  input,select,textarea{
    background:rgba(0,25,60,0.6);border:1px solid rgba(180,20,120,0.22);
    border-radius:6px;color:#f5c6e8;font-family:'Rajdhani',sans-serif;
    font-size:15px;padding:11px 14px;width:100%;outline:none;
  }
  input:focus,select:focus,textarea:focus{
    border-color:rgba(233,30,140,0.65);background:rgba(50,0,90,0.75);
  }
  select option{background:#0e0618;color:#f5c6e8;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
  @keyframes glow{0%,100%{text-shadow:0 0 18px rgba(233,30,140,0.4);}50%{text-shadow:0 0 36px rgba(233,30,140,0.75);}}
`;

function Field({ label, required, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{
        fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase",
        color: "rgba(0,208,255,0.87)", fontFamily: "'Courier New',monospace",
      }}>
        {label}{required && <span style={{ color: "#e91e8c", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function HarassmentReport() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    incidentType: "",
    description: "",
    occurredAt: new Date().toISOString().slice(0, 16), // datetime-local format
    isAnonymous: true,
  });
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locStatus, setLocStatus] = useState("Fetching your location…");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocStatus("✓ Location captured");
      },
      (err) => setLocStatus("⚠ Couldn't get location: " + err.message)
    );
  }, []);
  
  const ok = form.incidentType && form.description.trim().length >= 10 && location.lat;
//   const ok = form.incidentType && form.description.trim().length >= 10;

  const handleSubmit = async () => {
    if (!ok || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await submitReport({
        incidentType: form.incidentType,
        description: form.description.trim(),
        occurredAt: new Date(form.occurredAt).toISOString(),
        isAnonymous: form.isAnonymous,
        location,
      });
      setSubmitted(true);
      setTimeout(() => navigate("/home"), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <style>{G}</style>
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "16px", textAlign: "center", padding: "20px",
        }}>
          <div style={{ fontSize: "48px" }}>✓</div>
          <h1 style={{
            fontFamily: "'Orbitron',monospace", color: "#00c864", letterSpacing: "3px",
            fontSize: "clamp(18px,4vw,26px)",
          }}>
            REPORT SUBMITTED SECURELY
          </h1>
          <p style={{ color: "rgba(240,168,210,0.6)", fontFamily: "'Courier New',monospace", fontSize: "13px" }}>
            Thank you for helping keep others safe. Redirecting…
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{G}</style>
      <div style={{ minHeight: "100vh", background: "#0e0618" }}>
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: "64px",
          padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(14,6,24,0.94)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(180,20,120,0.14)",
        }}>
          <span style={{
            fontFamily: "'Orbitron',monospace", fontWeight: 700, color: "#e91e8c",
            letterSpacing: "3px", fontSize: "15px",
          }}>NARIGUARD</span>
          <button onClick={() => navigate(-1)} style={{
            background: "transparent", border: "1px solid rgba(180,20,120,0.3)",
            borderRadius: "6px", color: "rgba(233,30,140,0.6)", padding: "6px 14px",
            fontFamily: "'Courier New',monospace", fontSize: "11px", cursor: "pointer",
          }}>← BACK</button>
        </nav>

        <main style={{ maxWidth: "640px", margin: "0 auto", padding: "96px 20px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px", animation: "fadeUp .5s ease both" }}>
            <h1 style={{
              fontFamily: "'Courier New',monospace", fontSize: "clamp(1.2rem,4vw,2rem)",
              color: "#f8a8d8", letterSpacing: "3px", animation: "glow 4s ease-in-out infinite",
              marginBottom: "8px",
            }}>
              REPORT AN INCIDENT
            </h1>
            <p style={{ color: "rgba(180,20,120,0.5)", fontSize: "12px", fontFamily: "'Courier New',monospace" }}>
              Your report helps warn others nearby. Anonymous by default.
            </p>
          </div>

          <div style={{
            background: "rgba(4,18,48,0.82)", border: "1px solid rgba(180,20,120,0.18)",
            borderRadius: "12px", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "18px",
            animation: "fadeUp .4s ease both",
          }}>
            <Field label="Incident Type" required>
              <select
                value={form.incidentType}
                onChange={(e) => setForm(f => ({ ...f, incidentType: e.target.value }))}
              >
                <option value="">Select type</option>
                {["Harassment", "Stalking", "Verbal Abuse", "Physical Assault", "Unsafe Area", "Other"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>

            <Field label="What happened" required>
              <textarea
                rows={5}
                placeholder="Describe the incident — what happened, any identifying details about the area or situation that might help others stay safe…"
                value={form.description}
                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                style={{ resize: "vertical", minHeight: "110px" }}
              />
            </Field>

            <Field label="When did this happen">
              <input
                type="datetime-local"
                value={form.occurredAt}
                onChange={(e) => setForm(f => ({ ...f, occurredAt: e.target.value }))}
                style={{ colorScheme: "dark" }}
              />
            </Field>

            <Field label="Location">
              <div style={{
                padding: "11px 14px", background: "rgba(0,25,60,0.6)",
                border: "1px solid rgba(180,20,120,0.22)", borderRadius: "6px",
                fontSize: "13px", color: location.lat ? "#00c864" : "rgba(255,180,100,0.7)",
                fontFamily: "'Courier New',monospace",
              }}>
                {locStatus}
              </div>
            </Field>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                id="anon"
                checked={form.isAnonymous}
                onChange={(e) => setForm(f => ({ ...f, isAnonymous: e.target.checked }))}
                style={{ width: "auto" }}
              />
              <label htmlFor="anon" style={{ fontSize: "13px", color: "rgba(240,168,210,0.7)" }}>
                Report anonymously (your identity will not be attached to this report)
              </label>
            </div>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "12px", fontFamily: "'Courier New',monospace" }}>
                ⚠ {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={!ok || submitting}
              style={{
                padding: "15px",
                background: ok ? "linear-gradient(90deg,rgba(120,0,180,0.55),rgba(233,30,140,0.45))" : "rgba(180,20,120,0.06)",
                border: `1px solid ${ok ? "rgba(233,30,140,0.6)" : "rgba(180,20,120,0.15)"}`,
                borderRadius: "6px", color: ok ? "#f8a8d8" : "rgba(180,20,120,0.3)",
                fontSize: "13px", letterSpacing: "2.5px", fontFamily: "'Courier New',monospace",
                fontWeight: 700, cursor: ok && !submitting ? "pointer" : "not-allowed",
              }}
            >
              {submitting ? "SUBMITTING…" : "SUBMIT REPORT"}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}