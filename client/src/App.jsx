import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';

import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { CreateCompany } from './pages/CreateCompany';
import { JoinCompany } from './pages/JoinCompany';
import { JoinCompanyRegister } from './pages/JoinCompanyRegister';
import { JoinRequestPending } from './pages/JoinRequestPending';
import { AdminJoinRequests } from './pages/AdminJoinRequests';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication & Onboarding Routes */}
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/register/company" element={<CreateCompany />} />
          <Route path="/join-company" element={<JoinCompany />} />
          <Route path="/join-company/register" element={<JoinCompanyRegister />} />

          {/* Pending Approval Status Route */}
          <Route
            path="/join-company/pending"
            element={
              <ProtectedRoute>
                <JoinRequestPending />
              </ProtectedRoute>
            }
          />

          {/* Authenticated Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Join Request Routes */}
          <Route
            path="/admin/join-requests"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminJoinRequests />
              </ProtectedRoute>
            }
          />

          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
