import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import LawyerDashboard from './pages/LawyerDashboard';
import JudgeDashboard from './pages/JudgeDashboard';
import PetitionerDashboard from './pages/PetitionerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ManageLawyers from './pages/ManageLawyers';
import ManageJudges from './pages/ManageJudges';
import ViewUsers from './pages/ViewUsers';
import FileCase from './pages/FileCase';
import MyCases from './pages/MyCases';
import JudgeVideoForm from './pages/JudgeVideoForm';
import AdminVideoForm from './pages/AdminVideoForm';
import LawyerVideoForm from './pages/LawyerVideoForm';
import PetitionerVideoForm from './pages/PetitionerVideoForm';
import VideoConference from './pages/VideoConference';
import CaseManagement from './pages/CaseManagement';
import SystemAnalytics from './pages/SystemAnalytics';
import AdminSettings from './pages/Settings';
import Chatbot from './pages/Chatbot';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboards */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="Admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/lawyers"
            element={
              <ProtectedRoute role="Admin">
                <ManageLawyers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/judges"
            element={
              <ProtectedRoute role="Admin">
                <ManageJudges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="Admin">
                <ViewUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cases"
            element={
              <ProtectedRoute role="Admin">
                <CaseManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute role="Admin">
                <SystemAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute role="Admin">
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* Lawyer Dashboard */}
          <Route
            path="/lawyer-dashboard"
            element={
              <ProtectedRoute role="Lawyer">
                <LawyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/judge-dashboard"
            element={
              <ProtectedRoute role="Judge">
                <JudgeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/petitioner-dashboard"
            element={
              <ProtectedRoute role="Petitioner">
                <PetitionerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Petitioner */}
          <Route
            path="/file-case"
            element={
              <ProtectedRoute role="Petitioner">
                <FileCase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cases"
            element={
              <ProtectedRoute role="Petitioner">
                <MyCases />
              </ProtectedRoute>
            }
          />

          {/* Video Conference */}
          <Route
            path="/judge-video-form"
            element={
              <ProtectedRoute role="Judge">
                <JudgeVideoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-video-form"
            element={
              <ProtectedRoute role="Admin">
                <AdminVideoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/petitioner-video-form"
            element={
              <ProtectedRoute role="Petitioner">
                <PetitionerVideoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lawyer-video-form"
            element={
              <ProtectedRoute role="Lawyer">
                <LawyerVideoForm />
              </ProtectedRoute>
            }
          />
          <Route path="/video-conference/:caseNumber" element={<VideoConference />} />

          {/* Optional: if you also want chatbot on its own route */}
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>

        {/* ✅ Floating chatbot on all pages */}
        <Chatbot />

        <Footer />
      </div>
    </Router>
  );
};

export default App;
