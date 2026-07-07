import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrgAdminLogin from "./pages/OrgAdminLogin";
import OrgDashboard from "./pages/OrgDashboard";
import EndUserLogin from "./pages/EndUserLogin";
import EndUserDashboard from "./pages/EndUserDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/org-login" element={<OrgAdminLogin />} />
        <Route path="/org-dashboard" element={<OrgDashboard />} />
        <Route path="/end-login" element={<EndUserLogin />} />
        <Route path="/end-dashboard" element={<EndUserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;