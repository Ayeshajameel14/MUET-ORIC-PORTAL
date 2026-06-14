import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import GrantsPage from './pages/GrantsPage';
import CPDPage from './pages/CPDPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import SettingsPage from './pages/SettingsPage';
import { TermsOfUse, PrivacyPolicy } from './pages/LegalPage';
import PlaceholderPage from './pages/PlaceholderPage';

import {
  FlaskConical, BookOpen, Lightbulb, Link2,
  Building2, TrendingUp, Users, FileText
} from 'lucide-react';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="grants" element={<GrantsPage />} />
            <Route path="cpd" element={<CPDPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />

            <Route path="research" element={
              <PlaceholderPage
                title="Research Projects"
                icon={FlaskConical}
                description="Submit new research proposals, track active projects, manage milestones and deliverables, and collaborate with team members across departments."
              />
            } />
            <Route path="publications" element={
              <PlaceholderPage
                title="Publications"
                icon={BookOpen}
                description="Manage your research publications, track citations and impact factor, add new papers, and view department-wise publication statistics."
              />
            } />
            <Route path="innovation" element={
              <PlaceholderPage
                title="Innovation and IP Management"
                icon={Lightbulb}
                description="File patent applications, register intellectual property, track IP status, and get guidance on technology transfer and commercialization."
              />
            } />
            <Route path="linkages" element={
              <PlaceholderPage
                title="University Linkages and Technology Transfer (ULTT)"
                icon={Link2}
                description="Connect with industry partners, arrange internships, manage MoUs, and coordinate joint research and development activities."
              />
            } />
            <Route path="basr" element={
              <PlaceholderPage
                title="Board of Advanced Studies and Research (BASR)"
                icon={Building2}
                description="Manage postgraduate research oversight, PhD committee assignments, thesis submissions, research degree approvals, and graduate academic governance."
              />
            } />
            <Route path="udu" element={
              <PlaceholderPage
                title="University Development Unit (UDU)"
                icon={TrendingUp}
                description="Manage external development funding proposals, donor relations, institutional capacity building projects, and infrastructure development activities."
              />
            } />
            <Route path="siren" element={
              <PlaceholderPage
                title="Sindh Innovation Research Education Network (SIREN)"
                icon={Users}
                description="The provincial research network connecting universities across Sindh. Access collaborative projects, joint research opportunities, and network events."
              />
            } />
            <Route path="reports" element={
              <PlaceholderPage
                title="Reports"
                icon={FileText}
                description="Generate and download reports on research output, grant utilization, publication counts, CPD participation, and ORIC activity summaries."
              />
            } />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
