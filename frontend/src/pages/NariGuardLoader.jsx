// // import { useEffect, useRef, useState } from "react";
// // import AuthPages from "./AuthPages";
// // // ─── Easing ───────────────────────────────────────────────────
// // const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
// // const easeOutBack = (x) => {
// //   const c1 = 1.70158,
// //     c3 = c1 + 1;
// //   return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
// // };
// // const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// // const lerp = (a, b, t) => a + (b - a) * t;
// // const norm = (s, e, t) => clamp((t - s) / (e - s), 0, 1);

// // function glowStroke(ctx, color, blur, lw, sc, fn) {
// //   ctx.save();
// //   ctx.strokeStyle = color;
// //   ctx.lineWidth = lw * sc;
// //   ctx.shadowColor = color;
// //   ctx.shadowBlur = blur * sc;
// //   ctx.lineCap = "round";
// //   ctx.lineJoin = "round";
// //   fn();
// //   ctx.restore();
// // }
// // function glowFill(ctx, color, blur, sc, fn) {
// //   ctx.save();
// //   ctx.fillStyle = color;
// //   ctx.shadowColor = color;
// //   ctx.shadowBlur = blur * sc;
// //   fn();
// //   ctx.restore();
// // }

// // function drawShield(ctx, alpha, tx, ty, sc, pulse, cx, cy) {
// //   ctx.save();
// //   ctx.translate(cx + tx, cy + ty);
// //   ctx.scale(sc, sc);
// //   ctx.globalAlpha = alpha;
// //   const R = 155 * sc;
// //   const grd = ctx.createLinearGradient(0, -R, 0, R);
// //   grd.addColorStop(0, "rgba(220,20,130,0.20)");
// //   grd.addColorStop(1, "rgba(0,80,180,0.32)");
// //   function shieldPath() {
// //     ctx.beginPath();
// //     ctx.moveTo(0, -R);
// //     ctx.bezierCurveTo(R * 0.85, -R * 0.5, R, R * 0.1, 0, R);
// //     ctx.bezierCurveTo(-R, R * 0.1, -R * 0.85, -R * 0.5, 0, -R);
// //     ctx.closePath();
// //   }
// //   ctx.save();
// //   ctx.shadowColor = "#dd1a85";
// //   ctx.shadowBlur = (30 + pulse * 22) * sc;
// //   shieldPath();
// //   ctx.fillStyle = grd;
// //   ctx.fill();
// //   ctx.restore();
// //   glowStroke(ctx, "#f8a8d8", 18, 2.5, sc, () => {
// //     shieldPath();
// //     ctx.stroke();
// //   });
// //   ctx.save();
// //   ctx.scale(0.84, 0.84);
// //   glowStroke(ctx, "rgba(210,100,230,0.5)", 10, 1.2, sc, () => {
// //     shieldPath();
// //     ctx.stroke();
// //   });
// //   ctx.restore();
// //   ctx.save();
// //   ctx.translate(0, R * 0.05);
// //   glowStroke(ctx, "#f5c6e8", 12, 1.8, sc, () => {
// //     ctx.beginPath();
// //     ctx.moveTo(-16 * sc, -80 * sc);
// //     ctx.lineTo(-12 * sc, -30 * sc);
// //     ctx.lineTo(-20 * sc, 30 * sc);
// //     ctx.moveTo(16 * sc, -80 * sc);
// //     ctx.lineTo(12 * sc, -30 * sc);
// //     ctx.lineTo(20 * sc, 30 * sc);
// //     ctx.moveTo(-20 * sc, 30 * sc);
// //     ctx.quadraticCurveTo(-30 * sc, 80 * sc, -10 * sc, 100 * sc);
// //     ctx.moveTo(20 * sc, 30 * sc);
// //     ctx.quadraticCurveTo(30 * sc, 80 * sc, 10 * sc, 100 * sc);
// //     ctx.stroke();
// //   });
// //   glowStroke(ctx, "#f5c6e8", 10, 1.8, sc, () => {
// //     ctx.beginPath();
// //     ctx.arc(0, -95 * sc, 14 * sc, 0, Math.PI * 2);
// //     ctx.stroke();
// //   });
// //   glowStroke(ctx, "rgba(200,100,220,0.7)", 8, 1.2, sc, () => {
// //     ctx.beginPath();
// //     ctx.moveTo(10 * sc, -100 * sc);
// //     ctx.bezierCurveTo(40 * sc, -80 * sc, 50 * sc, -20 * sc, 30 * sc, 40 * sc);
// //     ctx.stroke();
// //   });
// //   glowStroke(ctx, "#ffccee", 16, 2, sc, () => {
// //     ctx.beginPath();
// //     ctx.moveTo(-8 * sc, -130 * sc);
// //     ctx.lineTo(-8 * sc, 110 * sc);
// //     ctx.stroke();
// //   });
// //   glowFill(ctx, "#ffffff", 20, sc, () => {
// //     ctx.beginPath();
// //     ctx.moveTo(-8 * sc, -130 * sc);
// //     ctx.lineTo(-2 * sc, -115 * sc);
// //     ctx.lineTo(-14 * sc, -115 * sc);
// //     ctx.closePath();
// //     ctx.fill();
// //   });
// //   ctx.restore();
// //   ctx.restore();
// // }

// // function drawFrame(ctx, alpha, tx, ty, sc, cx, cy) {
// //   ctx.save();
// //   ctx.translate(cx + tx, cy + ty);
// //   ctx.scale(sc, sc);
// //   ctx.globalAlpha = alpha;
// //   const S = 290 * sc,
// //     r = 36 * sc;
// //   function rRect(s) {
// //     ctx.beginPath();
// //     ctx.moveTo(-s + r, -s);
// //     ctx.lineTo(s - r, -s);
// //     ctx.arcTo(s, -s, s, -s + r, r);
// //     ctx.lineTo(s, s - r);
// //     ctx.arcTo(s, s, s - r, s, r);
// //     ctx.lineTo(-s + r, s);
// //     ctx.arcTo(-s, s, -s, s - r, r);
// //     ctx.lineTo(-s, -s + r);
// //     ctx.arcTo(-s, -s, -s + r, -s, r);
// //     ctx.closePath();
// //   }
// //   glowStroke(ctx, "#e91e8c", 22, 3, sc, () => {
// //     rRect(S);
// //     ctx.stroke();
// //   });
// //   glowStroke(ctx, "rgba(220,20,130,0.4)", 10, 1.2, sc, () => {
// //     rRect(S * 0.92);
// //     ctx.stroke();
// //   });
// //   glowStroke(ctx, "rgba(215,100,235,0.6)", 8, 1, sc, () => {
// //     ctx.beginPath();
// //     ctx.moveTo(-S * 0.45, -S);
// //     ctx.lineTo(S * 0.45, -S);
// //     ctx.moveTo(-S * 0.45, S);
// //     ctx.lineTo(S * 0.45, S);
// //     ctx.stroke();
// //   });
// //   [
// //     [-S, -S],
// //     [S, -S],
// //     [S, S],
// //     [-S, S],
// //   ].forEach(([cx2, cy2]) => {
// //     const sign = [cx2 > 0 ? 1 : -1, cy2 > 0 ? 1 : -1];
// //     glowStroke(ctx, "#f8a8d8", 12, 1.5, sc, () => {
// //       for (let i = 1; i <= 3; i++) {
// //         const off = i * 8 * sc;
// //         ctx.beginPath();
// //         ctx.moveTo(cx2 + sign[0] * off * 0.6, cy2 + sign[1] * (r + off));
// //         ctx.lineTo(cx2 + sign[0] * (r + off), cy2 + sign[1] * off * 0.6);
// //         ctx.stroke();
// //       }
// //     });
// //   });
// //   glowStroke(ctx, "rgba(220,20,130,0.5)", 6, 1, sc, () => {
// //     [-S * 0.3, -S * 0.6, S * 0.3, S * 0.6].forEach((x) => {
// //       ctx.beginPath();
// //       ctx.moveTo(x, -S - 10 * sc);
// //       ctx.lineTo(x, -S + 10 * sc);
// //       ctx.moveTo(x, S - 10 * sc);
// //       ctx.lineTo(x, S + 10 * sc);
// //       ctx.stroke();
// //     });
// //     [-S * 0.3, -S * 0.6, S * 0.3, S * 0.6].forEach((y) => {
// //       ctx.beginPath();
// //       ctx.moveTo(-S - 10 * sc, y);
// //       ctx.lineTo(-S + 10 * sc, y);
// //       ctx.moveTo(S - 10 * sc, y);
// //       ctx.lineTo(S + 10 * sc, y);
// //       ctx.stroke();
// //     });
// //   });
// //   ctx.restore();
// // }

// // function drawCompass(ctx, alpha, tx, ty, sc, rot, cx, cy) {
// //   ctx.save();
// //   ctx.translate(cx + tx, cy + ty);
// //   ctx.scale(sc, sc);
// //   ctx.rotate(rot);
// //   ctx.globalAlpha = alpha;
// //   const R1 = 295 * sc,
// //     R2 = 228 * sc;
// //   glowStroke(ctx, "#e91e8c", 28, 4, sc, () => {
// //     ctx.beginPath();
// //     ctx.arc(0, 0, R1, 0, Math.PI * 2);
// //     ctx.stroke();
// //   });
// //   ctx.save();
// //   ctx.beginPath();
// //   ctx.arc(0, 0, R1, 0, Math.PI * 2);
// //   ctx.arc(0, 0, R2, 0, Math.PI * 2, true);
// //   ctx.fillStyle = "rgba(70,0,120,0.35)";
// //   ctx.fill();
// //   ctx.restore();
// //   glowStroke(ctx, "rgba(180,20,120,0.5)", 10, 1.5, sc, () => {
// //     ctx.beginPath();
// //     ctx.arc(0, 0, R2, 0, Math.PI * 2);
// //     ctx.stroke();
// //   });
// //   glowStroke(ctx, "rgba(180,20,120,0.3)", 6, 1, sc, () => {
// //     ctx.beginPath();
// //     ctx.arc(0, 0, (R1 + R2) / 2, 0, Math.PI * 2);
// //     ctx.stroke();
// //   });
// //   for (let i = 0; i < 72; i++) {
// //     const a = (i / 72) * Math.PI * 2;
// //     const isMaj = i % 9 === 0,
// //       isMed = i % 3 === 0;
// //     const inner = isMaj ? R2 + 8 * sc : isMed ? R2 + 5 * sc : R2 + 2 * sc;
// //     const outer = isMaj ? R1 - 8 * sc : isMed ? R1 - 12 * sc : R1 - 18 * sc;
// //     glowStroke(
// //       ctx,
// //       isMaj ? "rgba(215,100,235,0.9)" : "rgba(180,20,120,0.5)",
// //       isMaj ? 8 : 4,
// //       isMaj ? 2 : 0.8,
// //       sc,
// //       () => {
// //         ctx.beginPath();
// //         ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
// //         ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
// //         ctx.stroke();
// //       },
// //     );
// //   }
// //   [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].forEach((a) => {
// //     glowStroke(ctx, "#f8a8d8", 14, 2, sc, () => {
// //       ctx.beginPath();
// //       ctx.moveTo(Math.cos(a) * R2, Math.sin(a) * R2);
// //       ctx.lineTo(Math.cos(a) * (R1 + 20 * sc), Math.sin(a) * (R1 + 20 * sc));
// //       ctx.stroke();
// //     });
// //   });
// //   ctx.restore();
// // }

// // function drawCircuit(ctx, alpha, tx, ty, sc, rot, cx, cy) {
// //   ctx.save();
// //   ctx.translate(cx + tx, cy + ty);
// //   ctx.scale(sc, sc);
// //   ctx.rotate(rot);
// //   ctx.globalAlpha = alpha;
// //   const R = 300 * sc;
// //   glowStroke(ctx, "rgba(180,20,120,0.6)", 14, 2, sc, () => {
// //     ctx.beginPath();
// //     ctx.arc(0, 0, R, 0, Math.PI * 2);
// //     ctx.stroke();
// //   });
// //   for (let c = 0; c < 10; c++) {
// //     const base = (c / 10) * Math.PI * 2,
// //       span = ((Math.PI * 2) / 10) * 0.72;
// //     ctx.save();
// //     ctx.rotate(base);
// //     const arcR = R * 0.82;
// //     glowStroke(ctx, "rgba(220,20,130,0.7)", 10, 1.8, sc, () => {
// //       ctx.beginPath();
// //       ctx.arc(0, 0, arcR, -span / 2, span / 2);
// //       ctx.stroke();
// //     });
// //     glowStroke(ctx, "rgba(155,48,224,0.5)", 6, 1.2, sc, () => {
// //       ctx.beginPath();
// //       ctx.arc(0, 0, arcR * 0.88, -span * 0.5, span * 0.5);
// //       ctx.stroke();
// //     });
// //     for (let i = 0; i < 6; i++) {
// //       const frac = (i / 5) * span - span / 2;
// //       const x1 = Math.cos(frac) * arcR,
// //         y1 = Math.sin(frac) * arcR;
// //       const x2 = Math.cos(frac) * (arcR * 0.55),
// //         y2 = Math.sin(frac) * (arcR * 0.55);
// //       glowStroke(ctx, "rgba(220,20,130,0.55)", 5, 1, sc, () => {
// //         ctx.beginPath();
// //         ctx.moveTo(x1, y1);
// //         ctx.lineTo(lerp(x1, x2, 0.5), y1);
// //         ctx.lineTo(x2, y2);
// //         ctx.stroke();
// //       });
// //       glowFill(ctx, "rgba(215,100,235,0.9)", 8, sc, () => {
// //         ctx.beginPath();
// //         ctx.arc(x2, y2, 3.5 * sc, 0, Math.PI * 2);
// //         ctx.fill();
// //       });
// //     }
// //     ctx.restore();
// //   }
// //   ctx.restore();
// // }
// // function drawBranding(ctx, alpha, sc, cx, cy, t) {
// //   ctx.save();
// //   ctx.globalAlpha = alpha;
// //   ctx.translate(cx, cy);
// //   ctx.textAlign = "center";
// //   ctx.font = `bold ${Math.round(42 * sc)}px 'Courier New', monospace`;

// //   const text = "NARIGUARD";

// //   const speed = 0.12; // typing speed

// //   const lettersToShow = Math.max(
// //     0,
// //     Math.floor((t - 5.2) / speed)
// //   );

// //   const visibleText = text.substring(0, lettersToShow);

// //   ctx.fillStyle = "rgba(255,200,240,0.95)";
// //   ctx.shadowColor = "#e91e8c";
// //   ctx.shadowBlur = 28 * sc;

// //   ctx.fillText(visibleText, 0, 290 * sc);

// //   ctx.restore();
// // }
// // function drawBackground(ctx, W, H, cx, cy, sc, pulse) {
// //   const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
// //   grd.addColorStop(0, "rgba(14,4,28,1)");
// //   grd.addColorStop(0.5, "rgba(10,3,20,1)");
// //   grd.addColorStop(1, "rgba(7,2,14,1)");
// //   ctx.fillStyle = grd;
// //   ctx.fillRect(0, 0, W, H);

// //   const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 340 * sc);
// //   cg.addColorStop(0, `rgba(100,0,160,${0.12 + pulse * 0.06})`);
// //   cg.addColorStop(1, "rgba(0,0,0,0)");
// //   ctx.fillStyle = cg;
// //   ctx.fillRect(0, 0, W, H);
// // }

// // const TOTAL = 8.5;
// // const STATUSES = [
// //   [0, "INITIALIZING SYSTEMS"],
// //   [1.0, "LOADING CIRCUIT MATRIX"],
// //   [1.9, "CALIBRATING COMPASS"],
// //   [2.8, "DEPLOYING FRAME PROTOCOL"],
// //   [3.7, "ACTIVATING GUARD CORE"],
// //   [4.5, "SYNCHRONIZING COMPONENTS"],
// //   [5.5, "SYSTEM ONLINE"],
// // ];

// // // ── Main Export ───────────────────────────────────────────────
// // export default function NariGuardLoader() {
// //   const canvasRef = useRef(null);
// //   const rafRef = useRef(null);
// //   const tRef = useRef(0);
// //   const lastRef = useRef(null);
// //   const burstRef = useRef(false);
// //   const particlesRef = useRef([]);

// //   const [loadPct, setLoadPct] = useState(0);
// //   const [statusText, setStatusText] = useState("INITIALIZING SYSTEMS");
// //   const [fadeOut, setFadeOut] = useState(false); // loader fades out
// //   const [showLogin, setShowLogin] = useState(false); // login fades in
// //   const [hideLoader, setHideLoader] = useState(false); // fully remove loader

// //   function spawnBurst(sc) {
// //     for (let i = 0; i < 90; i++) {
// //       const angle = Math.random() * Math.PI * 2;
// //       const spd = (60 + Math.random() * 220) * sc;
// //       particlesRef.current.push({
// //         x: 0,
// //         y: 0,
// //         vx: Math.cos(angle) * spd,
// //         vy: Math.sin(angle) * spd,
// //         life: 1,
// //         size: (1.5 + Math.random() * 3) * sc,
// //         hue: 295 + Math.random() * 35,
// //       });
// //     }
// //   }

// //   useEffect(() => {

    
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     function resize() {
// //       canvas.width = window.innerWidth;
// //       canvas.height = window.innerHeight;
// //     }
// //     resize();
// //     window.addEventListener("resize", resize);

// //     function render(now) {
// //     const W = canvas.width;
// // const H = canvas.height;
// //       const cx = W / 2,
// //         cy = H / 2;
// //      const baseScale = Math.min(W, H) / 900;
// // const sc = Math.max(baseScale, 0.6); 
// //       const dt = Math.min(now - (lastRef.current || now), 50) / 1000;
// //       lastRef.current = now;
// //       tRef.current += dt;
// //       const t = tRef.current;
// //       const pulse = (Math.sin(t * 3) + 1) / 2;

// //       setLoadPct(Math.round(clamp(t / TOTAL, 0, 1) * 100));
// //       for (let i = STATUSES.length - 1; i >= 0; i--) {
// //         if (t >= STATUSES[i][0]) {
// //           setStatusText(STATUSES[i][1]);
// //           break;
// //         }
// //       }

// //       drawBackground(ctx, W, H, cx, cy, sc, pulse);

// //       {
// //         const p0 = norm(0.2, 1.8, t),
// //           ep = easeOutBack(p0);
// //         drawCircuit(
// //           ctx,
// //           clamp(p0 * 2, 0, 1),
// //           lerp(700 * sc, 0, ep),
// //           lerp(700 * sc, 0, ep),
// //           sc,
// //           lerp(0.8, 0, easeOutCubic(p0)),
// //           cx,
// //           cy,
// //         );
// //       }
// //       {
// //         const p0 = norm(1.0, 2.6, t),
// //           ep = easeOutBack(p0);
// //         drawCompass(
// //           ctx,
// //           clamp(p0 * 2, 0, 1),
// //           lerp(-700 * sc, 0, ep),
// //           lerp(700 * sc, 0, ep),
// //           sc,
// //           lerp(-0.8, 0, easeOutCubic(p0)),
// //           cx,
// //           cy,
// //         );
// //       }
// //       {
// //         const p0 = norm(1.9, 3.5, t),
// //           ep = easeOutBack(p0);
// //         drawFrame(
// //           ctx,
// //           clamp(p0 * 2, 0, 1),
// //           lerp(700 * sc, 0, ep),
// //           lerp(-700 * sc, 0, ep),
// //           sc,
// //           cx,
// //           cy,
// //         );
// //       }
// //       {
// //         const p0 = norm(2.8, 4.4, t),
// //           ep = easeOutBack(p0);
// //         drawShield(
// //           ctx,
// //           clamp(p0 * 2, 0, 1),
// //           lerp(-700 * sc, 0, ep),
// //           lerp(-700 * sc, 0, ep),
// //           sc,
// //           pulse,
// //           cx,
// //           cy,
// //         );
// //       }

// //       if (t >= 4.5 && !burstRef.current) {
// //         burstRef.current = true;
// //         spawnBurst(sc);
// //       }
// //       if (t >= 4.5) {
// //         const lp = easeOutCubic(norm(4.5, 5.2, t));
// //         drawCircuit(ctx, lp, 0, 0, sc, 0, cx, cy);
// //         drawCompass(ctx, lp, 0, 0, sc, 0, cx, cy);
// //         drawFrame(ctx, lp, 0, 0, sc, cx, cy);
// //         drawShield(ctx, lp, 0, 0, sc, pulse, cx, cy);
// //       }
// //       if (t > 5.5) drawCompass(ctx, 0.1, 0, 0, sc, (t - 5.5) * 0.06, cx, cy);

// //       const pArr = particlesRef.current;
// //       pArr.forEach((p) => {
// //         p.x += p.vx * dt;
// //         p.y += p.vy * dt;
// //         p.vx *= 0.94;
// //         p.vy *= 0.94;
// //         p.life -= dt * 1.2;
// //       });
// //       particlesRef.current = pArr.filter((p) => p.life > 0);
// //       ctx.save();
// //       ctx.translate(cx, cy);
// //       pArr.forEach((p) => {
// //         ctx.save();
// //         ctx.globalAlpha = p.life * 0.85;
// //         ctx.fillStyle = `hsl(${p.hue},100%,70%)`;
// //         ctx.shadowColor = `hsl(${p.hue},100%,80%)`;
// //         ctx.shadowBlur = 8 * sc;
// //         ctx.beginPath();
// //         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
// //         ctx.fill();
// //         ctx.restore();
// //       });
// //       ctx.restore();

// //     drawBranding(ctx, easeOutCubic(norm(5.2,6.2,t)), sc, cx, cy, t);

// //       if (t >= TOTAL) {
// //         setFadeOut(true); // start loader fade-out
// //         setTimeout(() => {
// //           setShowLogin(true);
// //         }, 400); // login starts fading in at 400ms
// //         setTimeout(() => {
// //           setHideLoader(true);
// //         }, 1200); // fully unmount loader at 1.2s
// //         return;
// //       }
// //       rafRef.current = requestAnimationFrame(render);
// //     }

// //     rafRef.current = requestAnimationFrame(render);
// //     return () => {
// //       cancelAnimationFrame(rafRef.current);
// //       window.removeEventListener("resize", resize);
// //     };
// //   }, []);

// //   return (
// //     <>
// //       {/* Login always mounted underneath, fades in when showLogin=true
// //       <LoginPage visible={showLogin} /> */}
// //       {showLogin && <AuthPages />}

// //       {/* Loader sits on top, fades out, then unmounts */}
// //       {!hideLoader && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             inset: 0,
// //             background: "#0e0618",
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontFamily: "'Courier New', monospace",
// //             overflow: "hidden",
// //             opacity: fadeOut ? 0 : 1,
// //             transition: "opacity 0.9s ease",
// //             zIndex: 9999,
// //           }}
// //         >
// //           <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

// //           {/* Top label */}
// //           <div
// //             style={{
// //               position: "absolute",
// //              top: "4vh",
// //               left: "50%",
// //               transform: "translateX(-50%)",
// //               zIndex: 10,
// //               pointerEvents: "none",
// //               opacity: loadPct > 5 ? 1 : 0,
// //               transition: "opacity 1s",
// //             fontSize: "clamp(9px, 2.5vw, 11px)",
// // letterSpacing: "clamp(2px, 1vw, 4px)",
// //               color: "rgba(125,232,255,0.55)",
// //               textTransform: "uppercase",
// //               whiteSpace: "nowrap",
// //             }}
// //           >
// //             NARIGUARD · SYSTEM INITIALIZING
// //           </div>

// //           {/* Bottom HUD */}
// //           <div
// //             style={{
// //               position: "absolute",
// //              bottom: "6vh",
// //               left: "50%",
// //               transform: "translateX(-50%)",
// //               zIndex: 10,
// //               pointerEvents: "none",
// //               display: "flex",
// //               flexDirection: "column",
// //               alignItems: "center",
// //               gap: "16px",
// //               width: "90vw",
// // maxWidth: "340px",
// // padding: "0 12px",
// //             }}
// //           >
// //             <div style={{ width: "100%", position: "relative" }}>
// //               <div
// //                 style={{
// //                   height: "2px",
// //                   background: "rgba(180,20,120,0.15)",
// //                   borderRadius: "2px",
// //                   overflow: "hidden",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     height: "100%",
// //                     width: `${loadPct}%`,
// //                     background:
// //                       "linear-gradient(90deg,#0060c0,#e91e8c,#f8a8d8)",
// //                     boxShadow: "0 0 12px #e91e8c, 0 0 28px rgba(233,30,140,0.4)",
// //                     borderRadius: "2px",
// //                     transition: "width 0.15s linear",
// //                   }}
// //                 />
// //               </div>
// //               {[
// //                 [-1, -1],
// //                 [1, -1],
// //                 [1, 1],
// //                 [-1, 1],
// //               ].map(([sx, sy], i) => (
// //                 <div
// //                   key={i}
// //                   style={{
// //                     position: "absolute",
// //                     width: "6px",
// //                     height: "6px",
// //                     borderTop:
// //                       sy < 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
// //                     borderBottom:
// //                       sy > 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
// //                     borderLeft:
// //                       sx < 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
// //                     borderRight:
// //                       sx > 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
// //                     top: sy < 0 ? "-4px" : "calc(100% - 2px)",
// //                     left: sx < 0 ? "-4px" : "calc(100% - 2px)",
// //                   }}
// //                 />
// //               ))}
// //             </div>

// //             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
// //               <span
// //                 style={{
// //                   display: "inline-block",
// //                   width: "6px",
// //                   height: "6px",
// //                   borderRadius: "50%",
// //                   background: "#e91e8c",
// //                   boxShadow: "0 0 8px #e91e8c",
// //                   animation: "pulse-dot 1.2s ease-in-out infinite",
// //                 }}
// //               />
// //               <span
// //                 style={{
// //                  fontSize: "clamp(10px, 2.8vw, 12px)",
// //                   letterSpacing: "2.5px",
// //                   color: "rgba(210,100,230,0.75)",
// //                   textTransform: "uppercase",
// //                 }}
// //               >
// //                 {statusText}
// //               </span>
// //               <span
// //                 style={{
// //                   fontSize: "clamp(10px, 2.8vw, 12px)",
// //                   letterSpacing: "1px",
// //                   color: "rgba(233,30,140,0.45)",
// //                 }}
// //               >
// //                 {loadPct}%
// //               </span>
// //             </div>
// //           </div>

// //           {/* Corner HUD marks */}
// //           {[
// //             {
// //               top: 16,
// //               left: 16,
// //               borderTop: "1px solid",
// //               borderLeft: "1px solid",
// //             },
// //             {
// //               top: 16,
// //               right: 16,
// //               borderTop: "1px solid",
// //               borderRight: "1px solid",
// //             },
// //             {
// //               bottom: 16,
// //               left: 16,
// //               borderBottom: "1px solid",
// //               borderLeft: "1px solid",
// //             },
// //             {
// //               bottom: 16,
// //               right: 16,
// //               borderBottom: "1px solid",
// //               borderRight: "1px solid",
// //             },
// //           ].map((s, i) => (
// //             <div
// //               key={i}
// //               style={{
// //                 position: "absolute",
// //                 width: "22px",
// //                 height: "22px",
// //                 borderColor: "rgba(180,20,120,0.3)",
// //                 ...s,
// //                 zIndex: 10,
// //                 pointerEvents: "none",
// //               }}
// //             />
// //           ))}
// //         </div>
// //       )}

// //       <style>{`
// //         @keyframes pulse-dot {
// //           0%,100% { opacity:1; transform:scale(1); }
// //           50%      { opacity:0.3; transform:scale(0.6); }
// //         }
// //         * { box-sizing:border-box; }
// //         body { margin:0; }
// //       `}</style>
// //     </>
// //   );
// // }

// import { useEffect, useRef, useState } from "react";
// import AuthPages from "./AuthPages";
// // ─── Easing ───────────────────────────────────────────────────
// const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
// const easeOutBack = (x) => {
//   const c1 = 1.70158,
//     c3 = c1 + 1;
//   return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
// };
// const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// const lerp = (a, b, t) => a + (b - a) * t;
// const norm = (s, e, t) => clamp((t - s) / (e - s), 0, 1);

// function glowStroke(ctx, color, blur, lw, sc, fn) {
//   ctx.save();
//   ctx.strokeStyle = color;
//   ctx.lineWidth = lw * sc;
//   ctx.shadowColor = color;
//   ctx.shadowBlur = blur * sc;
//   ctx.lineCap = "round";
//   ctx.lineJoin = "round";
//   fn();
//   ctx.restore();
// }
// function glowFill(ctx, color, blur, sc, fn) {
//   ctx.save();
//   ctx.fillStyle = color;
//   ctx.shadowColor = color;
//   ctx.shadowBlur = blur * sc;
//   fn();
//   ctx.restore();
// }

// function drawShield(ctx, alpha, tx, ty, sc, pulse, cx, cy) {
//   ctx.save();
//   ctx.translate(cx + tx, cy + ty);
//   ctx.scale(sc, sc);
//   ctx.globalAlpha = alpha;
//   const R = 155 * sc;
//   const grd = ctx.createLinearGradient(0, -R, 0, R);
//   grd.addColorStop(0, "rgba(233,30,140,0.28)");
//   grd.addColorStop(1, "rgba(123,32,224,0.34)");
//   function shieldPath() {
//     ctx.beginPath();
//     ctx.moveTo(0, -R);
//     ctx.bezierCurveTo(R * 0.85, -R * 0.5, R, R * 0.1, 0, R);
//     ctx.bezierCurveTo(-R, R * 0.1, -R * 0.85, -R * 0.5, 0, -R);
//     ctx.closePath();
//   }
//   ctx.save();
//   ctx.shadowColor = "#e91e8c";
//   ctx.shadowBlur = (30 + pulse * 22) * sc;
//   shieldPath();
//   ctx.fillStyle = grd;
//   ctx.fill();
//   ctx.restore();
//   glowStroke(ctx, "#f8a8d8", 18, 2.5, sc, () => {
//     shieldPath();
//     ctx.stroke();
//   });
//   ctx.save();
//   ctx.scale(0.84, 0.84);
//   glowStroke(ctx, "rgba(155,48,224,0.55)", 10, 1.2, sc, () => {
//     shieldPath();
//     ctx.stroke();
//   });
//   ctx.restore();
//   ctx.save();
//   ctx.translate(0, R * 0.05);
//   glowStroke(ctx, "#f5c6e8", 12, 1.8, sc, () => {
//     ctx.beginPath();
//     ctx.moveTo(-16 * sc, -80 * sc);
//     ctx.lineTo(-12 * sc, -30 * sc);
//     ctx.lineTo(-20 * sc, 30 * sc);
//     ctx.moveTo(16 * sc, -80 * sc);
//     ctx.lineTo(12 * sc, -30 * sc);
//     ctx.lineTo(20 * sc, 30 * sc);
//     ctx.moveTo(-20 * sc, 30 * sc);
//     ctx.quadraticCurveTo(-30 * sc, 80 * sc, -10 * sc, 100 * sc);
//     ctx.moveTo(20 * sc, 30 * sc);
//     ctx.quadraticCurveTo(30 * sc, 80 * sc, 10 * sc, 100 * sc);
//     ctx.stroke();
//   });
//   glowStroke(ctx, "#f5c6e8", 10, 1.8, sc, () => {
//     ctx.beginPath();
//     ctx.arc(0, -95 * sc, 14 * sc, 0, Math.PI * 2);
//     ctx.stroke();
//   });
//   glowStroke(ctx, "rgba(155,48,224,0.75)", 8, 1.2, sc, () => {
//     ctx.beginPath();
//     ctx.moveTo(10 * sc, -100 * sc);
//     ctx.bezierCurveTo(40 * sc, -80 * sc, 50 * sc, -20 * sc, 30 * sc, 40 * sc);
//     ctx.stroke();
//   });
//   glowStroke(ctx, "#ffccee", 16, 2, sc, () => {
//     ctx.beginPath();
//     ctx.moveTo(-8 * sc, -130 * sc);
//     ctx.lineTo(-8 * sc, 110 * sc);
//     ctx.stroke();
//   });
//   glowFill(ctx, "#ffffff", 20, sc, () => {
//     ctx.beginPath();
//     ctx.moveTo(-8 * sc, -130 * sc);
//     ctx.lineTo(-2 * sc, -115 * sc);
//     ctx.lineTo(-14 * sc, -115 * sc);
//     ctx.closePath();
//     ctx.fill();
//   });
//   ctx.restore();
//   ctx.restore();
// }

// function drawFrame(ctx, alpha, tx, ty, sc, cx, cy) {
//   ctx.save();
//   ctx.translate(cx + tx, cy + ty);
//   ctx.scale(sc, sc);
//   ctx.globalAlpha = alpha;
//   const S = 290 * sc,
//     r = 36 * sc;
//   function rRect(s) {
//     ctx.beginPath();
//     ctx.moveTo(-s + r, -s);
//     ctx.lineTo(s - r, -s);
//     ctx.arcTo(s, -s, s, -s + r, r);
//     ctx.lineTo(s, s - r);
//     ctx.arcTo(s, s, s - r, s, r);
//     ctx.lineTo(-s + r, s);
//     ctx.arcTo(-s, s, -s, s - r, r);
//     ctx.lineTo(-s, -s + r);
//     ctx.arcTo(-s, -s, -s + r, -s, r);
//     ctx.closePath();
//   }
//   glowStroke(ctx, "#e91e8c", 22, 3, sc, () => {
//     rRect(S);
//     ctx.stroke();
//   });
//   glowStroke(ctx, "rgba(220,20,130,0.4)", 10, 1.2, sc, () => {
//     rRect(S * 0.92);
//     ctx.stroke();
//   });
//   glowStroke(ctx, "rgba(155,48,224,0.6)", 8, 1, sc, () => {
//     ctx.beginPath();
//     ctx.moveTo(-S * 0.45, -S);
//     ctx.lineTo(S * 0.45, -S);
//     ctx.moveTo(-S * 0.45, S);
//     ctx.lineTo(S * 0.45, S);
//     ctx.stroke();
//   });
//   [
//     [-S, -S],
//     [S, -S],
//     [S, S],
//     [-S, S],
//   ].forEach(([cx2, cy2]) => {
//     const sign = [cx2 > 0 ? 1 : -1, cy2 > 0 ? 1 : -1];
//     glowStroke(ctx, "#f8a8d8", 12, 1.5, sc, () => {
//       for (let i = 1; i <= 3; i++) {
//         const off = i * 8 * sc;
//         ctx.beginPath();
//         ctx.moveTo(cx2 + sign[0] * off * 0.6, cy2 + sign[1] * (r + off));
//         ctx.lineTo(cx2 + sign[0] * (r + off), cy2 + sign[1] * off * 0.6);
//         ctx.stroke();
//       }
//     });
//   });
//   glowStroke(ctx, "rgba(220,20,130,0.5)", 6, 1, sc, () => {
//     [-S * 0.3, -S * 0.6, S * 0.3, S * 0.6].forEach((x) => {
//       ctx.beginPath();
//       ctx.moveTo(x, -S - 10 * sc);
//       ctx.lineTo(x, -S + 10 * sc);
//       ctx.moveTo(x, S - 10 * sc);
//       ctx.lineTo(x, S + 10 * sc);
//       ctx.stroke();
//     });
//     [-S * 0.3, -S * 0.6, S * 0.3, S * 0.6].forEach((y) => {
//       ctx.beginPath();
//       ctx.moveTo(-S - 10 * sc, y);
//       ctx.lineTo(-S + 10 * sc, y);
//       ctx.moveTo(S - 10 * sc, y);
//       ctx.lineTo(S + 10 * sc, y);
//       ctx.stroke();
//     });
//   });
//   ctx.restore();
// }

// function drawCompass(ctx, alpha, tx, ty, sc, rot, cx, cy) {
//   ctx.save();
//   ctx.translate(cx + tx, cy + ty);
//   ctx.scale(sc, sc);
//   ctx.rotate(rot);
//   ctx.globalAlpha = alpha;
//   const R1 = 295 * sc,
//     R2 = 228 * sc;
//   glowStroke(ctx, "#e91e8c", 28, 4, sc, () => {
//     ctx.beginPath();
//     ctx.arc(0, 0, R1, 0, Math.PI * 2);
//     ctx.stroke();
//   });
//   ctx.save();
//   ctx.beginPath();
//   ctx.arc(0, 0, R1, 0, Math.PI * 2);
//   ctx.arc(0, 0, R2, 0, Math.PI * 2, true);
//   ctx.fillStyle = "rgba(90,20,150,0.35)";
//   ctx.fill();
//   ctx.restore();
//   glowStroke(ctx, "rgba(180,20,120,0.5)", 10, 1.5, sc, () => {
//     ctx.beginPath();
//     ctx.arc(0, 0, R2, 0, Math.PI * 2);
//     ctx.stroke();
//   });
//   glowStroke(ctx, "rgba(180,20,120,0.3)", 6, 1, sc, () => {
//     ctx.beginPath();
//     ctx.arc(0, 0, (R1 + R2) / 2, 0, Math.PI * 2);
//     ctx.stroke();
//   });
//   for (let i = 0; i < 72; i++) {
//     const a = (i / 72) * Math.PI * 2;
//     const isMaj = i % 9 === 0,
//       isMed = i % 3 === 0;
//     const inner = isMaj ? R2 + 8 * sc : isMed ? R2 + 5 * sc : R2 + 2 * sc;
//     const outer = isMaj ? R1 - 8 * sc : isMed ? R1 - 12 * sc : R1 - 18 * sc;
//     glowStroke(
//       ctx,
//       isMaj ? "rgba(215,100,235,0.9)" : "rgba(180,20,120,0.5)",
//       isMaj ? 8 : 4,
//       isMaj ? 2 : 0.8,
//       sc,
//       () => {
//         ctx.beginPath();
//         ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
//         ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer);
//         ctx.stroke();
//       },
//     );
//   }
//   [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].forEach((a) => {
//     glowStroke(ctx, "#f8a8d8", 14, 2, sc, () => {
//       ctx.beginPath();
//       ctx.moveTo(Math.cos(a) * R2, Math.sin(a) * R2);
//       ctx.lineTo(Math.cos(a) * (R1 + 20 * sc), Math.sin(a) * (R1 + 20 * sc));
//       ctx.stroke();
//     });
//   });
//   ctx.restore();
// }

// function drawCircuit(ctx, alpha, tx, ty, sc, rot, cx, cy) {
//   ctx.save();
//   ctx.translate(cx + tx, cy + ty);
//   ctx.scale(sc, sc);
//   ctx.rotate(rot);
//   ctx.globalAlpha = alpha;
//   const R = 300 * sc;
//   glowStroke(ctx, "rgba(180,20,120,0.6)", 14, 2, sc, () => {
//     ctx.beginPath();
//     ctx.arc(0, 0, R, 0, Math.PI * 2);
//     ctx.stroke();
//   });
//   for (let c = 0; c < 10; c++) {
//     const base = (c / 10) * Math.PI * 2,
//       span = ((Math.PI * 2) / 10) * 0.72;
//     ctx.save();
//     ctx.rotate(base);
//     const arcR = R * 0.82;
//     glowStroke(ctx, "rgba(220,20,130,0.7)", 10, 1.8, sc, () => {
//       ctx.beginPath();
//       ctx.arc(0, 0, arcR, -span / 2, span / 2);
//       ctx.stroke();
//     });
//     glowStroke(ctx, "rgba(155,48,224,0.5)", 6, 1.2, sc, () => {
//       ctx.beginPath();
//       ctx.arc(0, 0, arcR * 0.88, -span * 0.5, span * 0.5);
//       ctx.stroke();
//     });
//     for (let i = 0; i < 6; i++) {
//       const frac = (i / 5) * span - span / 2;
//       const x1 = Math.cos(frac) * arcR,
//         y1 = Math.sin(frac) * arcR;
//       const x2 = Math.cos(frac) * (arcR * 0.55),
//         y2 = Math.sin(frac) * (arcR * 0.55);
//       glowStroke(ctx, "rgba(220,20,130,0.55)", 5, 1, sc, () => {
//         ctx.beginPath();
//         ctx.moveTo(x1, y1);
//         ctx.lineTo(lerp(x1, x2, 0.5), y1);
//         ctx.lineTo(x2, y2);
//         ctx.stroke();
//       });
//       glowFill(ctx, "rgba(215,100,235,0.9)", 8, sc, () => {
//         ctx.beginPath();
//         ctx.arc(x2, y2, 3.5 * sc, 0, Math.PI * 2);
//         ctx.fill();
//       });
//     }
//     ctx.restore();
//   }
//   ctx.restore();
// }
// function drawBranding(ctx, alpha, sc, cx, cy, t) {
//   ctx.save();
//   ctx.globalAlpha = alpha;
//   ctx.translate(cx, cy);
//   ctx.textAlign = "center";
//   ctx.font = `bold ${Math.round(42 * sc)}px 'Courier New', monospace`;

//   const text = "NARIGUARD";

//   const speed = 0.12; // typing speed

//   const lettersToShow = Math.max(
//     0,
//     Math.floor((t - 5.2) / speed)
//   );

//   const visibleText = text.substring(0, lettersToShow);

//   const grd = ctx.createLinearGradient(-140 * sc, 0, 140 * sc, 0);
//   grd.addColorStop(0, "#f45fa8");
//   grd.addColorStop(1, "#7b2ff7");
//   ctx.fillStyle = grd;
//   ctx.shadowColor = "#e91e8c";
//   ctx.shadowBlur = 28 * sc;

//   ctx.fillText(visibleText, 0, 290 * sc);

//   if (lettersToShow >= text.length) {
//     const tagAlpha = easeOutCubic(norm(6.6, 7.1, t));
//     ctx.save();
//     ctx.globalAlpha = alpha * tagAlpha;
//     ctx.font = `${Math.round(13 * sc)}px 'Courier New', monospace`;
//     ctx.fillStyle = "rgba(255,255,255,0.85)";
//     ctx.shadowColor = "rgba(233,30,140,0.6)";
//     ctx.shadowBlur = 10 * sc;
//     ctx.letterSpacing = `${3 * sc}px`;
//     ctx.fillText("YOUR SAFETY. OUR MISSION.", 0, 325 * sc);
//     ctx.restore();
//   }

//   ctx.restore();
// }
// function drawBackground(ctx, W, H, cx, cy, sc, pulse) {
//   const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
//   grd.addColorStop(0, "rgba(14,4,28,1)");
//   grd.addColorStop(0.5, "rgba(10,3,20,1)");
//   grd.addColorStop(1, "rgba(7,2,14,1)");
//   ctx.fillStyle = grd;
//   ctx.fillRect(0, 0, W, H);

//   const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 340 * sc);
//   cg.addColorStop(0, `rgba(120,20,190,${0.12 + pulse * 0.06})`);
//   cg.addColorStop(1, "rgba(0,0,0,0)");
//   ctx.fillStyle = cg;
//   ctx.fillRect(0, 0, W, H);
// }

// const TOTAL = 8.5;
// const STATUSES = [
//   [0, "INITIALIZING SYSTEMS"],
//   [1.0, "LOADING CIRCUIT MATRIX"],
//   [1.9, "CALIBRATING COMPASS"],
//   [2.8, "DEPLOYING FRAME PROTOCOL"],
//   [3.7, "ACTIVATING GUARD CORE"],
//   [4.5, "SYNCHRONIZING COMPONENTS"],
//   [5.5, "SYSTEM ONLINE"],
// ];

// // ── Main Export ───────────────────────────────────────────────
// export default function NariGuardLoader() {
//   const canvasRef = useRef(null);
//   const rafRef = useRef(null);
//   const tRef = useRef(0);
//   const lastRef = useRef(null);
//   const burstRef = useRef(false);
//   const particlesRef = useRef([]);

//   const [loadPct, setLoadPct] = useState(0);
//   const [statusText, setStatusText] = useState("INITIALIZING SYSTEMS");
//   const [fadeOut, setFadeOut] = useState(false); // loader fades out
//   const [showLogin, setShowLogin] = useState(false); // login fades in
//   const [hideLoader, setHideLoader] = useState(false); // fully remove loader

//   function spawnBurst(sc) {
//     for (let i = 0; i < 90; i++) {
//       const angle = Math.random() * Math.PI * 2;
//       const spd = (60 + Math.random() * 220) * sc;
//       particlesRef.current.push({
//         x: 0,
//         y: 0,
//         vx: Math.cos(angle) * spd,
//         vy: Math.sin(angle) * spd,
//         life: 1,
//         size: (1.5 + Math.random() * 3) * sc,
//         hue: 295 + Math.random() * 35,
//       });
//     }
//   }

//   useEffect(() => {

    
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     function resize() {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     }
//     resize();
//     window.addEventListener("resize", resize);

//     function render(now) {
//     const W = canvas.width;
// const H = canvas.height;
//       const cx = W / 2,
//         cy = H / 2;
//      const baseScale = Math.min(W, H) / 900;
// const sc = Math.max(baseScale, 0.6); 
//       const dt = Math.min(now - (lastRef.current || now), 50) / 1000;
//       lastRef.current = now;
//       tRef.current += dt;
//       const t = tRef.current;
//       const pulse = (Math.sin(t * 3) + 1) / 2;

//       setLoadPct(Math.round(clamp(t / TOTAL, 0, 1) * 100));
//       for (let i = STATUSES.length - 1; i >= 0; i--) {
//         if (t >= STATUSES[i][0]) {
//           setStatusText(STATUSES[i][1]);
//           break;
//         }
//       }

//       drawBackground(ctx, W, H, cx, cy, sc, pulse);

//       {
//         const p0 = norm(0.2, 1.8, t),
//           ep = easeOutBack(p0);
//         drawCircuit(
//           ctx,
//           clamp(p0 * 2, 0, 1),
//           lerp(700 * sc, 0, ep),
//           lerp(700 * sc, 0, ep),
//           sc,
//           lerp(0.8, 0, easeOutCubic(p0)),
//           cx,
//           cy,
//         );
//       }
//       {
//         const p0 = norm(1.0, 2.6, t),
//           ep = easeOutBack(p0);
//         drawCompass(
//           ctx,
//           clamp(p0 * 2, 0, 1),
//           lerp(-700 * sc, 0, ep),
//           lerp(700 * sc, 0, ep),
//           sc,
//           lerp(-0.8, 0, easeOutCubic(p0)),
//           cx,
//           cy,
//         );
//       }
//       {
//         const p0 = norm(1.9, 3.5, t),
//           ep = easeOutBack(p0);
//         drawFrame(
//           ctx,
//           clamp(p0 * 2, 0, 1),
//           lerp(700 * sc, 0, ep),
//           lerp(-700 * sc, 0, ep),
//           sc,
//           cx,
//           cy,
//         );
//       }
//       {
//         const p0 = norm(2.8, 4.4, t),
//           ep = easeOutBack(p0);
//         drawShield(
//           ctx,
//           clamp(p0 * 2, 0, 1),
//           lerp(-700 * sc, 0, ep),
//           lerp(-700 * sc, 0, ep),
//           sc,
//           pulse,
//           cx,
//           cy,
//         );
//       }

//       if (t >= 4.5 && !burstRef.current) {
//         burstRef.current = true;
//         spawnBurst(sc);
//       }
//       if (t >= 4.5) {
//         const lp = easeOutCubic(norm(4.5, 5.2, t));
//         drawCircuit(ctx, lp, 0, 0, sc, 0, cx, cy);
//         drawCompass(ctx, lp, 0, 0, sc, 0, cx, cy);
//         drawFrame(ctx, lp, 0, 0, sc, cx, cy);
//         drawShield(ctx, lp, 0, 0, sc, pulse, cx, cy);
//       }
//       if (t > 5.5) drawCompass(ctx, 0.1, 0, 0, sc, (t - 5.5) * 0.06, cx, cy);

//       const pArr = particlesRef.current;
//       pArr.forEach((p) => {
//         p.x += p.vx * dt;
//         p.y += p.vy * dt;
//         p.vx *= 0.94;
//         p.vy *= 0.94;
//         p.life -= dt * 1.2;
//       });
//       particlesRef.current = pArr.filter((p) => p.life > 0);
//       ctx.save();
//       ctx.translate(cx, cy);
//       pArr.forEach((p) => {
//         ctx.save();
//         ctx.globalAlpha = p.life * 0.85;
//         ctx.fillStyle = `hsl(${p.hue},100%,70%)`;
//         ctx.shadowColor = `hsl(${p.hue},100%,80%)`;
//         ctx.shadowBlur = 8 * sc;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.restore();
//       });
//       ctx.restore();

//     drawBranding(ctx, easeOutCubic(norm(5.2,6.2,t)), sc, cx, cy, t);

//       if (t >= TOTAL) {
//         setFadeOut(true); // start loader fade-out
//         setTimeout(() => {
//           setShowLogin(true);
//         }, 400); // login starts fading in at 400ms
//         setTimeout(() => {
//           setHideLoader(true);
//         }, 1200); // fully unmount loader at 1.2s
//         return;
//       }
//       rafRef.current = requestAnimationFrame(render);
//     }

//     rafRef.current = requestAnimationFrame(render);
//     return () => {
//       cancelAnimationFrame(rafRef.current);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return (
//     <>
//       {/* Login always mounted underneath, fades in when showLogin=true
//       <LoginPage visible={showLogin} /> */}
//       {showLogin && <AuthPages />}

//       {/* Loader sits on top, fades out, then unmounts */}
//       {!hideLoader && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "#0e0618",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             fontFamily: "'Courier New', monospace",
//             overflow: "hidden",
//             opacity: fadeOut ? 0 : 1,
//             transition: "opacity 0.9s ease",
//             zIndex: 9999,
//           }}
//         >
//           <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

//           {/* Top label */}
//           <div
//             style={{
//               position: "absolute",
//              top: "4vh",
//               left: "50%",
//               transform: "translateX(-50%)",
//               zIndex: 10,
//               pointerEvents: "none",
//               opacity: loadPct > 5 ? 1 : 0,
//               transition: "opacity 1s",
//             fontSize: "clamp(9px, 2.5vw, 11px)",
// letterSpacing: "clamp(2px, 1vw, 4px)",
//               color: "rgba(216,140,235,0.65)",
//               textTransform: "uppercase",
//               whiteSpace: "nowrap",
//             }}
//           >
//             NARIGUARD · SYSTEM INITIALIZING
//           </div>

//           {/* Bottom HUD */}
//           <div
//             style={{
//               position: "absolute",
//              bottom: "6vh",
//               left: "50%",
//               transform: "translateX(-50%)",
//               zIndex: 10,
//               pointerEvents: "none",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "16px",
//               width: "90vw",
// maxWidth: "340px",
// padding: "0 12px",
//             }}
//           >
//             <div style={{ width: "100%", position: "relative" }}>
//               <div
//                 style={{
//                   height: "2px",
//                   background: "rgba(180,20,120,0.15)",
//                   borderRadius: "2px",
//                   overflow: "hidden",
//                 }}
//               >
//                 <div
//                   style={{
//                     height: "100%",
//                     width: `${loadPct}%`,
//                     background:
//                       "linear-gradient(90deg,#7b2ff7,#e91e8c,#f8a8d8)",
//                     boxShadow: "0 0 12px #e91e8c, 0 0 28px rgba(233,30,140,0.4)",
//                     borderRadius: "2px",
//                     transition: "width 0.15s linear",
//                   }}
//                 />
//               </div>
//               {[
//                 [-1, -1],
//                 [1, -1],
//                 [1, 1],
//                 [-1, 1],
//               ].map(([sx, sy], i) => (
//                 <div
//                   key={i}
//                   style={{
//                     position: "absolute",
//                     width: "6px",
//                     height: "6px",
//                     borderTop:
//                       sy < 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
//                     borderBottom:
//                       sy > 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
//                     borderLeft:
//                       sx < 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
//                     borderRight:
//                       sx > 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
//                     top: sy < 0 ? "-4px" : "calc(100% - 2px)",
//                     left: sx < 0 ? "-4px" : "calc(100% - 2px)",
//                   }}
//                 />
//               ))}
//             </div>

//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "6px",
//                   height: "6px",
//                   borderRadius: "50%",
//                   background: "#e91e8c",
//                   boxShadow: "0 0 8px #e91e8c",
//                   animation: "pulse-dot 1.2s ease-in-out infinite",
//                 }}
//               />
//               <span
//                 style={{
//                  fontSize: "clamp(10px, 2.8vw, 12px)",
//                   letterSpacing: "2.5px",
//                   color: "rgba(210,100,230,0.75)",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 {statusText}
//               </span>
//               <span
//                 style={{
//                   fontSize: "clamp(10px, 2.8vw, 12px)",
//                   letterSpacing: "1px",
//                   color: "rgba(233,30,140,0.45)",
//                 }}
//               >
//                 {loadPct}%
//               </span>
//             </div>
//           </div>

//           {/* Corner HUD marks */}
//           {[
//             {
//               top: 16,
//               left: 16,
//               borderTop: "1px solid",
//               borderLeft: "1px solid",
//             },
//             {
//               top: 16,
//               right: 16,
//               borderTop: "1px solid",
//               borderRight: "1px solid",
//             },
//             {
//               bottom: 16,
//               left: 16,
//               borderBottom: "1px solid",
//               borderLeft: "1px solid",
//             },
//             {
//               bottom: 16,
//               right: 16,
//               borderBottom: "1px solid",
//               borderRight: "1px solid",
//             },
//           ].map((s, i) => (
//             <div
//               key={i}
//               style={{
//                 position: "absolute",
//                 width: "22px",
//                 height: "22px",
//                 borderColor: "rgba(155,48,224,0.35)",
//                 ...s,
//                 zIndex: 10,
//                 pointerEvents: "none",
//               }}
//             />
//           ))}
//         </div>
//       )}

//       <style>{`
//         @keyframes pulse-dot {
//           0%,100% { opacity:1; transform:scale(1); }
//           50%      { opacity:0.3; transform:scale(0.6); }
//         }
//         * { box-sizing:border-box; }
//         body { margin:0; }
//       `}</style>
//     </>
//   );
// }
import { useEffect, useRef, useState } from "react";
import AuthPages from "./AuthPages";

// ─── Easing ───────────────────────────────────────────────────
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeOutBack = (x) => {
  const c1 = 1.70158,
    c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const norm = (s, e, t) => clamp((t - s) / (e - s), 0, 1);

function glowStroke(ctx, color, blur, lw, sc, fn) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw * sc;
  ctx.shadowColor = color;
  ctx.shadowBlur = blur * sc;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  fn();
  ctx.restore();
}
function glowFill(ctx, color, blur, sc, fn) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = blur * sc;
  fn();
  ctx.restore();
}

// ─── Shared shield outline (used for main crest + small badge) ─
const SHIELD_R = 190;
function shieldPath(ctx, R) {
  ctx.beginPath();
  ctx.moveTo(0, -R);
  ctx.bezierCurveTo(R * 0.55, -R * 0.95, R * 0.95, -R * 0.55, R * 0.98, -R * 0.05);
  ctx.bezierCurveTo(R * 1.0, R * 0.35, R * 0.55, R * 0.78, 0, R);
  ctx.bezierCurveTo(-R * 0.55, R * 0.78, -R * 1.0, R * 0.35, -R * 0.98, -R * 0.05);
  ctx.bezierCurveTo(-R * 0.95, -R * 0.55, -R * 0.55, -R * 0.95, 0, -R);
  ctx.closePath();
}

function drawShieldFrame(ctx, alpha, pop, pulse, sc, cx, cy) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(sc * pop, sc * pop);
  ctx.globalAlpha = alpha;
  glowStroke(ctx, "#e91e8c", 24 + pulse * 10, 3.5, 1, () => {
    shieldPath(ctx, SHIELD_R);
    ctx.stroke();
  });
  glowStroke(ctx, "rgba(123,32,224,0.55)", 12, 1.4, 1, () => {
    shieldPath(ctx, SHIELD_R * 0.94);
    ctx.stroke();
  });
  ctx.restore();
}

// ─── Woman profile silhouette (face + flowing hair) ────────────
function silhouettePath(ctx) {
  ctx.beginPath();
  ctx.moveTo(-8, -152);
  ctx.bezierCurveTo(30, -150, 55, -125, 52, -90);
  ctx.bezierCurveTo(50, -78, 46, -68, 50, -58);
  ctx.bezierCurveTo(54, -46, 50, -36, 62, -28);
  ctx.bezierCurveTo(70, -22, 50, -16, 54, -8);
  ctx.bezierCurveTo(58, -2, 50, 2, 54, 8);
  ctx.bezierCurveTo(56, 14, 46, 10, 42, 20);
  ctx.bezierCurveTo(36, 30, 26, 34, 22, 48);
  ctx.bezierCurveTo(18, 62, 26, 74, 34, 88);
  ctx.bezierCurveTo(46, 104, 62, 112, 58, 132);
  ctx.bezierCurveTo(54, 148, 20, 156, -20, 152);
  ctx.bezierCurveTo(-70, 148, -110, 138, -128, 110);
  ctx.bezierCurveTo(-146, 82, -148, 45, -142, 10);
  ctx.bezierCurveTo(-136, -28, -118, -62, -100, -90);
  ctx.bezierCurveTo(-82, -118, -55, -140, -22, -150);
  ctx.bezierCurveTo(-16, -151, -12, -152, -8, -152);
  ctx.closePath();
}

function drawSilhouette(ctx, alpha, pop, sc, cx, cy) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(sc * pop, sc * pop);
  ctx.globalAlpha = alpha;
  ctx.save();
  shieldPath(ctx, SHIELD_R * 0.92);
  ctx.clip();

  const grd = ctx.createLinearGradient(0, -160, 0, 160);
  grd.addColorStop(0, "#f45fa8");
  grd.addColorStop(1, "#7b2ff7");
  ctx.save();
  ctx.shadowColor = "#c026d3";
  ctx.shadowBlur = 26 * sc;
  ctx.fillStyle = grd;
  silhouettePath(ctx);
  ctx.fill();
  ctx.restore();

  // hair strand accents
  glowStroke(ctx, "rgba(18,4,32,0.5)", 4, 2, 1, () => {
    ctx.beginPath();
    ctx.moveTo(20, -140);
    ctx.bezierCurveTo(-10, -90, -40, -20, -60, 60);
    ctx.stroke();
  });
  glowStroke(ctx, "rgba(18,4,32,0.35)", 3, 1.5, 1, () => {
    ctx.beginPath();
    ctx.moveTo(45, -130);
    ctx.bezierCurveTo(30, -70, 10, 10, -10, 90);
    ctx.stroke();
  });
  // closed eye accent
  glowStroke(ctx, "rgba(255,255,255,0.7)", 6, 1.4, 1, () => {
    ctx.beginPath();
    ctx.moveTo(36, -74);
    ctx.quadraticCurveTo(46, -70, 53, -76);
    ctx.stroke();
  });
  ctx.restore();
  ctx.restore();
}

// ─── Facial-recognition network mesh ───────────────────────────
const NETWORK_NODES = [
  { x: 150, y: -90 },
  { x: 172, y: -42 },
  { x: 150, y: 8 },
  { x: 165, y: 55 },
  { x: 118, y: -58 },
  { x: 108, y: -8 },
  { x: 124, y: 40 },
  { x: 95, y: -25 },
];
const NETWORK_EDGES = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [1, 5],
  [2, 5], [2, 6], [3, 6], [4, 5], [5, 6], [4, 7], [5, 7],
];

function drawNetwork(ctx, progress, sc, cx, cy) {
  if (progress <= 0) return;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(sc, sc);
  const n = NETWORK_NODES.length;
  const nodeProg = NETWORK_NODES.map((_, i) => clamp(progress * n - i, 0, 1));

  glowStroke(ctx, "rgba(215,100,235,0.6)", 6, 1.1, 1, () => {
    NETWORK_EDGES.forEach(([a, b]) => {
      const ea = Math.min(nodeProg[a], nodeProg[b]);
      if (ea <= 0) return;
      ctx.globalAlpha = ea;
      ctx.beginPath();
      ctx.moveTo(NETWORK_NODES[a].x, NETWORK_NODES[a].y);
      ctx.lineTo(NETWORK_NODES[b].x, NETWORK_NODES[b].y);
      ctx.stroke();
    });
  });

  NETWORK_NODES.forEach((node, i) => {
    const p = nodeProg[i];
    if (p <= 0) return;
    ctx.globalAlpha = p;
    const r = lerp(0.5, 4.5, easeOutBack(p));
    glowFill(ctx, "#f8a8d8", 10, 1, () => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, Math.max(r, 0.5), 0, Math.PI * 2);
      ctx.fill();
    });
  });
  ctx.restore();
}

// ─── Small lock-shield badge on the chest ──────────────────────
function drawBadge(ctx, alpha, pop, sc, cx, cy) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(sc, sc);
  ctx.translate(8, 122);
  ctx.scale(Math.max(pop, 0.001), Math.max(pop, 0.001));
  ctx.globalAlpha = alpha;

  const R = 40;
  glowStroke(ctx, "#e91e8c", 14, 2, 1, () => {
    shieldPath(ctx, R);
    ctx.stroke();
  });
  ctx.save();
  ctx.fillStyle = "rgba(90,20,150,0.6)";
  shieldPath(ctx, R * 0.9);
  ctx.fill();
  ctx.restore();

  glowFill(ctx, "#ffe6f5", 10, 1, () => {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(-11, -4, 22, 20, 4);
    else ctx.rect(-11, -4, 22, 20);
    ctx.fill();
  });
  glowStroke(ctx, "#ffe6f5", 8, 4, 1, () => {
    ctx.beginPath();
    ctx.arc(0, -8, 10, Math.PI, 0);
    ctx.stroke();
  });
  ctx.restore();
}

// ─── Wordmark, tagline, footer lockup ───────────────────────────
const TYPE_START = 4.8;
const TYPE_SPEED = 0.12;
const TAG_START = 6.1;
const TAG_END = 6.6;
const FOOT_START = 6.8;
const FOOT_END = 7.3;

function drawBranding(ctx, sc, cx, cy, t) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(sc, sc);
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  const text = "NariGuard";
  const lettersToShow = Math.max(0, Math.floor((t - TYPE_START) / TYPE_SPEED));
  const visibleText = text.substring(0, Math.min(lettersToShow, text.length));

  if (visibleText.length > 0) {
    ctx.font = "bold 46px Arial, sans-serif";
    const grd = ctx.createLinearGradient(-140, 0, 140, 0);
    grd.addColorStop(0, "#f45fa8");
    grd.addColorStop(1, "#7b2ff7");
    ctx.fillStyle = grd;
    ctx.shadowColor = "#e91e8c";
    ctx.shadowBlur = 26;
    ctx.fillText(visibleText, 0, 250);
  }

  const tagAlpha = easeOutCubic(norm(TAG_START, TAG_END, t));
  if (tagAlpha > 0) {
    ctx.save();
    ctx.globalAlpha = tagAlpha;
    ctx.font = "14px 'Courier New', monospace";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.shadowColor = "rgba(233,30,140,0.6)";
    ctx.shadowBlur = 10;
    const tagText = "YOUR SAFETY. OUR MISSION.";
    ctx.fillText(tagText, 0, 285);
    const tw = ctx.measureText(tagText).width;
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(233,30,140,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-tw / 2 - 50, 281);
    ctx.lineTo(-tw / 2 - 12, 281);
    ctx.moveTo(tw / 2 + 12, 281);
    ctx.lineTo(tw / 2 + 50, 281);
    ctx.stroke();
    ctx.restore();
  }

  const footAlpha = easeOutCubic(norm(FOOT_START, FOOT_END, t));
  if (footAlpha > 0) {
    ctx.save();
    ctx.globalAlpha = footAlpha;
    ctx.strokeStyle = "rgba(180,80,220,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-140, 315);
    ctx.lineTo(-26, 315);
    ctx.moveTo(26, 315);
    ctx.lineTo(140, 315);
    ctx.stroke();

    ctx.save();
    ctx.translate(0, 315);
    ctx.scale(0.6, 0.6);
    glowStroke(ctx, "#c084e0", 8, 1.4, 1, () => {
      shieldPath(ctx, 20);
      ctx.stroke();
    });
    glowFill(ctx, "#e91e8c", 6, 1, () => {
      ctx.beginPath();
      ctx.arc(0, -7, 3.2, 0, Math.PI * 2);
      ctx.fill();
    });
    glowStroke(ctx, "#e91e8c", 6, 2, 1, () => {
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(0, 8);
      ctx.moveTo(0, -1);
      ctx.lineTo(-8, -10);
      ctx.moveTo(0, -1);
      ctx.lineTo(8, -10);
      ctx.moveTo(0, 8);
      ctx.lineTo(-6, 16);
      ctx.moveTo(0, 8);
      ctx.lineTo(6, 16);
      ctx.stroke();
    });
    ctx.restore();
    ctx.restore();
  }

  ctx.restore();
}

function drawBackground(ctx, W, H, cx, cy, sc, pulse) {
  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
  grd.addColorStop(0, "rgba(14,4,28,1)");
  grd.addColorStop(0.5, "rgba(10,3,20,1)");
  grd.addColorStop(1, "rgba(7,2,14,1)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 340 * sc);
  cg.addColorStop(0, `rgba(120,20,190,${0.12 + pulse * 0.06})`);
  cg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = cg;
  ctx.fillRect(0, 0, W, H);
}

const TOTAL = 8.6;
const STATUSES = [
  [0, "INITIALIZING SYSTEMS"],
  [0.3, "RENDERING SHIELD MATRIX"],
  [1.3, "MAPPING FACIAL CONTOURS"],
  [2.4, "ACTIVATING NEURAL MESH"],
  [3.4, "SECURING GUARD CORE"],
  [4.3, "SYSTEM ONLINE"],
];

// ── Main Export ───────────────────────────────────────────────
export default function NariGuardLoader() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const lastRef = useRef(null);
  const burstRef = useRef(false);
  const particlesRef = useRef([]);

  const [loadPct, setLoadPct] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEMS");
  const [fadeOut, setFadeOut] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);

  function spawnBurst(sc) {
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = (60 + Math.random() * 220) * sc;
      particlesRef.current.push({
        x: 0,
        y: 0,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life: 1,
        size: (1.5 + Math.random() * 3) * sc,
        hue: 295 + Math.random() * 35,
      });
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function render(now) {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2,
        cy = H / 2;
      const baseScale = Math.min(W, H) / 900;
      const sc = Math.max(baseScale, 0.6);
      const dt = Math.min(now - (lastRef.current || now), 50) / 1000;
      lastRef.current = now;
      tRef.current += dt;
      const t = tRef.current;
      const pulse = (Math.sin(t * 3) + 1) / 2;

      setLoadPct(Math.round(clamp(t / TOTAL, 0, 1) * 100));
      for (let i = STATUSES.length - 1; i >= 0; i--) {
        if (t >= STATUSES[i][0]) {
          setStatusText(STATUSES[i][1]);
          break;
        }
      }

      drawBackground(ctx, W, H, cx, cy, sc, pulse);

      // shield crest
      const p0 = norm(0.3, 1.6, t);
      drawShieldFrame(
        ctx,
        clamp(p0 * 2, 0, 1),
        lerp(0.6, 1, easeOutBack(p0)),
        pulse,
        sc,
        cx,
        cy,
      );

      // woman silhouette
      const p1 = norm(1.3, 2.7, t);
      drawSilhouette(
        ctx,
        clamp(p1 * 1.6, 0, 1),
        lerp(0.85, 1, easeOutCubic(p1)),
        sc,
        cx,
        cy,
      );

      // neural network mesh
      const p2 = norm(2.4, 3.6, t);
      drawNetwork(ctx, p2, sc, cx, cy);

      // lock badge
      const p3 = norm(3.4, 4.2, t);
      drawBadge(ctx, clamp(p3 * 2, 0, 1), easeOutBack(p3), sc, cx, cy);

      if (t >= 4.2 && !burstRef.current) {
        burstRef.current = true;
        spawnBurst(sc);
      }

      const pArr = particlesRef.current;
      pArr.forEach((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life -= dt * 1.2;
      });
      particlesRef.current = pArr.filter((p) => p.life > 0);
      ctx.save();
      ctx.translate(cx, cy);
      pArr.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.life * 0.85;
        ctx.fillStyle = `hsl(${p.hue},100%,70%)`;
        ctx.shadowColor = `hsl(${p.hue},100%,80%)`;
        ctx.shadowBlur = 8 * sc;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      ctx.restore();

      drawBranding(ctx, sc, cx, cy, t);

      if (t >= TOTAL) {
        setFadeOut(true);
        setTimeout(() => {
          setShowLogin(true);
        }, 400);
        setTimeout(() => {
          setHideLoader(true);
        }, 1200);
        return;
      }
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {showLogin && <AuthPages />}

      {!hideLoader && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#0e0618",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Courier New', monospace",
            overflow: "hidden",
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 0.9s ease",
            zIndex: 9999,
          }}
        >
          <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />

          <div
            style={{
              position: "absolute",
              top: "4vh",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              pointerEvents: "none",
              opacity: loadPct > 5 ? 1 : 0,
              transition: "opacity 1s",
              fontSize: "clamp(9px, 2.5vw, 11px)",
              letterSpacing: "clamp(2px, 1vw, 4px)",
              color: "rgba(216,140,235,0.65)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            NARIGUARD · SYSTEM INITIALIZING
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "6vh",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              width: "90vw",
              maxWidth: "340px",
              padding: "0 12px",
            }}
          >
            <div style={{ width: "100%", position: "relative" }}>
              <div
                style={{
                  height: "2px",
                  background: "rgba(180,20,120,0.15)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${loadPct}%`,
                    background: "linear-gradient(90deg,#7b2ff7,#e91e8c,#f8a8d8)",
                    boxShadow: "0 0 12px #e91e8c, 0 0 28px rgba(233,30,140,0.4)",
                    borderRadius: "2px",
                    transition: "width 0.15s linear",
                  }}
                />
              </div>
              {[
                [-1, -1],
                [1, -1],
                [1, 1],
                [-1, 1],
              ].map(([sx, sy], i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "6px",
                    height: "6px",
                    borderTop: sy < 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
                    borderBottom: sy > 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
                    borderLeft: sx < 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
                    borderRight: sx > 0 ? "1px solid rgba(233,30,140,0.6)" : "none",
                    top: sy < 0 ? "-4px" : "calc(100% - 2px)",
                    left: sx < 0 ? "-4px" : "calc(100% - 2px)",
                  }}
                />
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#e91e8c",
                  boxShadow: "0 0 8px #e91e8c",
                  animation: "pulse-dot 1.2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "clamp(10px, 2.8vw, 12px)",
                  letterSpacing: "2.5px",
                  color: "rgba(210,100,230,0.75)",
                  textTransform: "uppercase",
                }}
              >
                {statusText}
              </span>
              <span
                style={{
                  fontSize: "clamp(10px, 2.8vw, 12px)",
                  letterSpacing: "1px",
                  color: "rgba(233,30,140,0.45)",
                }}
              >
                {loadPct}%
              </span>
            </div>
          </div>

          {[
            { top: 16, left: 16, borderTop: "1px solid", borderLeft: "1px solid" },
            { top: 16, right: 16, borderTop: "1px solid", borderRight: "1px solid" },
            { bottom: 16, left: 16, borderBottom: "1px solid", borderLeft: "1px solid" },
            { bottom: 16, right: 16, borderBottom: "1px solid", borderRight: "1px solid" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "22px",
                height: "22px",
                borderColor: "rgba(155,48,224,0.35)",
                ...s,
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.3; transform:scale(0.6); }
        }
        * { box-sizing:border-box; }
        body { margin:0; }
      `}</style>
    </>
  );
}