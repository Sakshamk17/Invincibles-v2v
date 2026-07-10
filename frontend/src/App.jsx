import { BrowserRouter, Routes, Route } from "react-router-dom";
import NariGuardLoader from "./pages/NariGuardLoader";
import AuthPages from "./pages/AuthPages";
import { Home } from "./pages/Home";
import PersonalDetailsPage from "./pages/PersonalDetailsPage";
import SOSConfirmation from "./pages/sosConfirmation";
import HomePage from "./pages/HomePage";
import NariGuardFlipbook from "./pages/NariGuardFlipbook";
import Dashboard from "./pages/Dashboard";
import HarassmentReport from "./pages/HarassmentReport";
import PublicSafetyFeed from "./pages/PublicSafetyFeed";
import SafeHavens from "./pages/SafeHavens";
import FakeCall from "./pages/FakeCall";
import FollowMe from "./pages/FollowMe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NariGuardLoader />} />

        <Route path="/auth" element={<AuthPages />} />

        <Route path="/home" element={<HomePage  />} />

        <Route path="/details" element={<PersonalDetailsPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sos-confirmation" element={<SOSConfirmation />} />
        <Route path="/report" element={<HarassmentReport />} />
        <Route path="/feed" element={<PublicSafetyFeed />} />
        <Route path="/safe-havens" element={<SafeHavens />} />
        <Route path="/fake-call" element={<FakeCall />} />
        <Route path="/follow-me" element={<FollowMe />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
