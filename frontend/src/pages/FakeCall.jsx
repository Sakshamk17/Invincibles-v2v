import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  
  .fakecall-container {
    min-height: 100vh;
    background: #090312;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 30px;
    position: relative;
    overflow: hidden;
  }

  .caller-info {
    text-align: center;
    margin-top: 60px;
    z-index: 10;
  }
  .caller-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e91e8c, #9b30e0);
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    box-shadow: 0 0 25px rgba(233,30,140,0.4);
  }
  .caller-name {
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .call-status {
    font-size: 16px;
    color: #a0a0a0;
    letter-spacing: 0.5px;
  }

  .controls {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 40px;
    z-index: 10;
    width: 100%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 24px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn:active {
    transform: scale(0.9);
  }

  .btn-decline {
    background: #ff3b30;
    color: white;
    box-shadow: 0 4px 15px rgba(255, 59, 48, 0.4);
  }
  .btn-accept {
    background: #34c759;
    color: white;
    box-shadow: 0 4px 15px rgba(52, 199, 89, 0.4);
  }

  .btn-label {
    text-align: center;
    font-size: 12px;
    color: #fff;
    margin-top: 8px;
  }

  .setup-panel {
    max-width: 480px;
    margin: 96px auto 0;
    background: rgba(4,18,48,0.82);
    border: 1px solid rgba(180,20,120,0.18);
    border-radius: 12px;
    padding: 24px;
    font-family: 'Rajdhani', sans-serif;
    color: #f5c6e8;
  }

  .setup-title {
    font-family: 'Orbitron', monospace;
    font-size: 20px;
    color: #f8a8d8;
    margin-bottom: 16px;
    text-align: center;
    letter-spacing: 2px;
  }

  .setup-field {
    margin-bottom: 16px;
  }
  .setup-label {
    display: block;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: rgba(0,208,255,0.87);
    margin-bottom: 6px;
  }
  .setup-input {
    background: rgba(0,25,60,0.6);
    border: 1px solid rgba(180,20,120,0.22);
    border-radius: 6px;
    color: #f5c6e8;
    padding: 10px 14px;
    width: 100%;
    outline: none;
    font-family: 'Rajdhani', sans-serif;
  }
  .setup-input:focus {
    border-color: rgba(233,30,140,0.65);
  }

  .trigger-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(90deg,rgba(120,0,180,0.55),rgba(233,30,140,0.45));
    border: 1px solid rgba(233,30,140,0.6);
    border-radius: 6px;
    color: #f8a8d8;
    font-family: 'Orbitron', monospace;
    font-weight: bold;
    letter-spacing: 2px;
    cursor: pointer;
    margin-top: 10px;
  }
`;

export default function FakeCall() {
  const navigate = useNavigate();
  const [callerName, setCallerName] = useState(() => localStorage.getItem("fakeCallerName") || "Mom");
  const [delaySecs, setDelaySecs] = useState(5);
  
  const [isCalling, setIsCalling] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const ringAudioRef = useRef(null);
  const voiceAudioRef = useRef(null);
  const timerRef = useRef(null);

  // Synthesize Ringtone & Spoken Voice responses since there are no local files
  useEffect(() => {
    // 1. Synthesize an electronic ringtone using Web Audio API
    let audioCtx;
    let ringInterval;
    
    const playSynthesizedRingtone = () => {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === "suspended") audioCtx.resume();

        const playBeep = () => {
          const osc1 = audioCtx.createOscillator();
          const osc2 = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();

          osc1.type = "sine";
          osc1.frequency.setValueAtTime(853, audioCtx.currentTime); // standard US ringback frequency
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(960, audioCtx.currentTime);

          gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

          osc1.connect(gainNode);
          osc2.connect(gainNode);
          gainNode.connect(audioCtx.destination);

          osc1.start();
          osc2.start();
          osc1.stop(audioCtx.currentTime + 2.0);
          osc2.stop(audioCtx.currentTime + 2.0);
        };

        // Ring every 3 seconds
        playBeep();
        ringInterval = setInterval(playBeep, 3000);
      } catch (e) {
        console.error(e);
      }
    };

    ringAudioRef.current = {
      play: playSynthesizedRingtone,
      stop: () => clearInterval(ringInterval)
    };

    // 2. Synthesize Synthetic Caller Voice using Web Speech API Synthesis
    const speakSyntheticResponse = () => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      
      const phrases = [
        "Hey, where are you right now?",
        "I am waiting nearby. Should I come pick you up?",
        "Okay, stay on the line, I'm heading towards your location."
      ];

      let delay = 500;
      phrases.forEach((phrase) => {
        setTimeout(() => {
          if (!window.speechSynthesis) return;
          const utterance = new SpeechSynthesisUtterance(phrase);
          // Try to make it sound slightly different/natural
          utterance.rate = 1.0;
          utterance.pitch = 1.05;
          window.speechSynthesis.speak(utterance);
        }, delay);
        delay += 4000;
      });
    };

    voiceAudioRef.current = {
      play: speakSyntheticResponse,
      stop: () => {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      }
    };

    return () => {
      clearInterval(ringInterval);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const handleTrigger = () => {
    localStorage.setItem("fakeCallerName", callerName);
    setIsTriggered(true);
    setCountdown(delaySecs);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          startRinging();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRinging = () => {
    setIsCalling(true);
    ringAudioRef.current.play();
  };

  const handleAccept = () => {
    ringAudioRef.current.stop();
    setCallActive(true);
    voiceAudioRef.current.play();
  };

  const handleDecline = () => {
    ringAudioRef.current.stop();
    voiceAudioRef.current.stop();
    setIsCalling(false);
    setIsTriggered(false);
    setCallActive(false);
  };

  // If the timer is counting down, show countdown page
  if (isTriggered && countdown > 0) {
    return (
      <>
        <style>{CSS}</style>
        <div className="fakecall-container" style={{ justifyContent: "center", alignItems: "center" }}>
          <h2 style={{ fontFamily: "'Orbitron', monospace", color: "#e91e8c", fontSize: "24px", marginBottom: "10px" }}>
            PREPARING FAKE CALL
          </h2>
          <p style={{ fontFamily: "'Courier New', monospace", color: "rgba(240,168,210,0.6)", fontSize: "14px", marginBottom: "30px" }}>
            Lock your screen or return to the dashboard. The simulation triggers in:
          </p>
          <div style={{ fontSize: "72px", fontWeight: "900", fontFamily: "'Orbitron', monospace", color: "#00c864" }}>
            {countdown}s
          </div>
          <button 
            onClick={() => {
              clearInterval(timerRef.current);
              setIsTriggered(false);
            }} 
            style={{
              marginTop: "40px",
              padding: "10px 20px",
              background: "rgba(255,59,48,0.15)",
              border: "1px solid #ff3b30",
              color: "#ff3b30",
              borderRadius: "6px",
              fontFamily: "'Courier New', monospace",
              cursor: "pointer"
            }}
          >
            CANCEL TIMER
          </button>
        </div>
      </>
    );
  }

  // If call is actively ringing or answered, show mock phone UI
  if (isCalling) {
    return (
      <>
        <style>{CSS}</style>
        <div className="fakecall-container">
          <div className="caller-info">
            <div className="caller-avatar">
              {callerName.charAt(0).toUpperCase()}
            </div>
            <div className="caller-name">{callerName}</div>
            <div className="call-status">
              {callActive ? "00:05" : "NariGuard Safe Call"}
            </div>
          </div>

          <div className="controls">
            {!callActive ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <button className="btn btn-decline" onClick={handleDecline}>
                    ✕
                  </button>
                  <div className="btn-label">Decline</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <button className="btn btn-accept" onClick={handleAccept}>
                    📞
                  </button>
                  <div className="btn-label">Accept</div>
                </div>
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button className="btn btn-decline" onClick={handleDecline}>
                  ⤄
                </button>
                <div className="btn-label">End Call</div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

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

        <main style={{ padding: "20px" }}>
          <div className="setup-panel">
            <h1 className="setup-title">FAKE CALL SIMULATION</h1>
            <p style={{ fontSize: "13px", color: "rgba(240,168,210,0.5)", textAlign: "center", marginBottom: "20px" }}>
              Simulates a native incoming call to help diffuse uncomfortable or threatening social situations.
            </p>

            <div className="setup-field">
              <label className="setup-label">Caller Name / Identifier</label>
              <input
                type="text"
                className="setup-input"
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
                placeholder="e.g. Mom, Dispatcher, Brother"
              />
            </div>

            <div className="setup-field">
              <label className="setup-label">Trigger Delay (Seconds)</label>
              <input
                type="number"
                className="setup-input"
                value={delaySecs}
                onChange={(e) => setDelaySecs(Math.max(1, parseInt(e.target.value) || 0))}
                min="1"
              />
            </div>

            <button className="trigger-btn" onClick={handleTrigger}>
              START TIMER
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
