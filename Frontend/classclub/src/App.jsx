import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FreeClassDashboard from "./pages/FreeClassDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AddStudent from "./pages/AddStudent";
import AdminDashboard from "./pages/AdminDashboard";
import AddAdmin from "./pages/AddAdmin";
import LandingPageManagement from "./pages/LandingPageManagement";
import FreeClassLogin from "./pages/FreeClassLogin";
import FreeClassChangePassword from "./pages/FreeClassChangePassword";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==============================
            LANDING PAGE
        ============================== */}
        <Route path="/" element={<Home />} />

        {/* ==============================
            STUDENT
        ============================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* ==============================
    FREE CLASS
============================== */}

<Route
  path="/free-class-login"
  element={<FreeClassLogin />}
/>

<Route
  path="/free-class/change-password"
  element={<FreeClassChangePassword />}
/>

<Route
  path="/free-class-dashboard"
  element={<FreeClassDashboard />}
/>
        {/* ==============================
            ADMIN
        ============================== */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/add-student"
          element={<AddStudent />}
        />

        <Route
          path="/add-admin"
          element={<AddAdmin />}
        />

        {/* ==============================
            LANDING PAGE MANAGEMENT
        ============================== */}

        <Route
          path="/landing-page-management"
          element={<LandingPageManagement />}
        />

        {/* ==============================
            UNKNOWN URL
        ============================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;