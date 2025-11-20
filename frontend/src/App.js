import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import ReferralForm from "./components/ReferralForm";
import CaseManagement from "./components/CaseManagement";
import './App.css'; // <-- important

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Clean and Seal</h1>

        {/* Menu */}
        <div className="flex justify-center gap-4 mb-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded bg-blue-600 text-white font-medium transition"
                : "px-4 py-2 rounded border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
            }
          >
            Communication
          </NavLink>

          <NavLink
            to="/case-management"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded bg-blue-600 text-white font-medium transition"
                : "px-4 py-2 rounded border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
            }
          >
            Case Management
          </NavLink>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ReferralForm />} />
          <Route path="/case-management" element={<CaseManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
