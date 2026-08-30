import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AbilityProvider } from './casl/AbilityContext';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';
import { Sidebar } from './components/layout/Sidebar';

import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { CreateCompany } from './pages/CreateCompany';
import { JoinCompany } from './pages/JoinCompany';
import { JoinCompanyRegister } from './pages/JoinCompanyRegister';
import { JoinRequestPending } from './pages/JoinRequestPending';
import { AdminJoinRequests } from './pages/AdminJoinRequests';
import { Dashboard } from './pages/Dashboard';
import { UserManagement } from './pages/UserManagement';
import { UserProfileView } from './pages/UserProfileView';
import { Settings } from './pages/Settings';

// Layout wrapper for authenticated pages featuring the Collapsible Hover Sidebar
const AuthenticatedLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AbilityProvider>
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

            {/* Authenticated Pages Wrapped in Sidebar Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />

              <Route
                path="/admin/join-requests"
                element={
                  <ProtectedRoute>
                    <AdminJoinRequests />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'HOD', 'EMPLOYEE', 'FACULTY', 'STAFF', 'STUDENT']}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users/:id"
                element={
                  <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'HOD', 'EMPLOYEE', 'FACULTY', 'STAFF', 'STUDENT']}>
                    <UserProfileView />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AbilityProvider>
    </AuthProvider>
  );
}
