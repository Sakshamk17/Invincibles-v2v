# NariGuard

## The Idea
NariGuard is an intelligent personal safety ecosystem designed specifically for women, addressing **Track 1 — SafeSphere: Tech for Women's Safety & Security Solutions**. In moments of distress, every second counts, and traditional methods of unlocking a phone or typing a message fall short. NariGuard bridges this gap by offering a comprehensive, highly responsive platform providing personal safety, emergency response, anonymous harassment reporting, safe navigation, and community-driven safety networks. By combining hands-free automation with crowd-sourced and location-aware spatial intelligence, NariGuard transforms passive smartphones into proactive safety shields.

---

## Important Links
* **Live Deployment Link:** [https://nariguard.vercel.app](https://nariguard.vercel.app)
* **Demo Video Link:** [https://youtube.com/watch?v=nariguard-demo](https://youtube.com/watch?v=nariguard-demo)

---

## Features

### 1. Hands-Free Emergency Response (Core SOS Flow)
* **Voice-Activated Trigger:** Uses the Web Speech API to continuously listen for the vocalized safe-word "HELP", executing instantly without requiring the user to open or unlock their phone.
* **One-Tap Manual Override:** Provides an instant manual activation button for silent or high-risk situations where vocalizing help isn't safe.
* **Multi-Channel Parallel Alerting:** Leverages the Twilio API to simultaneously initiate phone calls (delivering a synthetic spoken distress message) and dispatch SMS texts embedded with live Google Maps tracking links to all registered emergency contacts.
* **Proof of Dispatch:** Displays a live confirmation matrix indicating exactly which contacts were reached successfully, eliminating uncertainty during high-stress scenarios.

### 2. Proactive Geofencing Security
* **Automated Telemetry:** Utilizing `navigator.geolocation.watchPosition()`, the app continuously calculates real-time displacement from the user's pre-configured home base or predefined coordinates.
* **Automated SOS Dispatch:** If the user exits their designated "Safe Zone" radius, the application automatically initiates the multi-channel SOS sequence without manual intervention.

### 3. Anonymous Harassment Reporting
* **Incident Documentation:** A secure, multi-step intake wizard capturing the time, precise auto-captured GPS coordinates, classification of the threat, and text description.
* **Privacy Safeguards:** Incorporates an "Anonymous" toggle which scrubs any relational User ID or identifying metadata from the database collection before submission.

### 4. Nearby Safe Havens Navigation Overlay
* **Spatial Crowdsourcing:** Programmatically queries the open-source Overpass API (OpenStreetMap) dynamically relative to the user's current GPS position.
* **Geospatial Mapping:** Generates interactive markers pinpointing verified institutional sanctuaries, such as police stations and hospitals, on an embedded visual map layer.

### 5. Public Safety Feed (Community Network)
* **Anonymized Aggregation:** Exposes a read-only, geo-fenced GET endpoint compiling localized harassment data.
* **Hyper-local Awareness:** Displays contextual indicators (e.g., *"3 incidents reported near your vicinity this week"*) to mobilize community-driven safety awareness.

### 6. De-escalation Ringtone Simulation (Fake Call)
* **Frontend Execution:** Simulates a realistic native incoming phone call interface with configurable caller IDs combined with HTML5 `<audio>` ringtone playback to serve as a plausible tool for non-violent social de-escalation.

---

## Tech Stack & Tools
* **Frontend:** React 18+, Vite, React Router, Tailwind CSS / Custom Glassmorphic CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose ODM
* **APIs & Protocols:** Twilio API (Voice & SMS), OpenStreetMap Overpass API, Web Speech API, HTML5 Geolocation API
* **Deployment & Infrastructure:** Vercel (Frontend), Render (Backend)
* **AI Tools Utilized:** Claude 3.5 Sonnet & OpenAI GPT-4o (Architectural scaffolding, Twilio multi-channel parallel integration logic, and code optimization).

---

## Documentation

### Architectural Workflow & System Blueprint
NariGuard is structured around a classic decoupled client-server architecture designed to prioritize high availability and minimal latency:

1. **The Client Tier (React 18 + Vite):** Maintains background execution threads using standard Web APIs. The `Gpstracker.jsx` component implements the `SpeechRecognition` listener to intercept voice triggers, alongside `watchPosition()` to stream continuous coordinate strings.
2. **The Server Tier (Express.js on Node.js):** Coordinates authorization protocols (JWT-secured sessions, Google Identity Services) and exposed REST endpoints (`/api/sos`, `/api/reports`). 
3. **The Messaging Layer (Twilio Integration):** When the backend receives a POST request to `/api/sos`, it triggers asynchronous, parallelized non-blocking Promise pools via the Twilio SDK to fire voice calls and text alerts concurrently, mitigating the risk of structural bottlenecks.
4. **Data Layer (MongoDB):** Organizes user profiles, emergency contacts with assigned discrete priority bands (High/Medium/Low), and an indexed `Harassment Report Collection` optimized for lightweight spatial range queries.

### AI Integration & Coordination Summary
AI tooling was deeply integrated during the 36-hour hackathon execution cycle:
* **Feature Synthesis:** Used for structural drafting of the asynchronous Twilio parallel routing matrix, ensuring that a lagging or failed network request to one contact wouldn't delay the remainder of the pipeline.
* **Boilerplate Reduction:** Prompts were systematically orchestrated to rapidly scaffold Mongoose data modeling definitions for the anonymous reporting feature, significantly lowering time-to-market and freeing allocation towards robust manual edge-case verification testing.
