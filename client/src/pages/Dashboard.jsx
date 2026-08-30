import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Users, Shield, Copy, LogOut, CheckCircle2, UserCheck, Settings } from 'lucide-react';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, company, logout } = useAuth();
  const [copied, setCopied] = useState(false);

  const copyCompanyCode = () => {
    if (company?.code) {
      navigator.clipboard.writeText(company.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdminOrHod = ['SUPER_ADMIN', 'ADMIN', 'HOD'].includes(user?.role);

  return (
    <div className="app-container" style={{ paddingLeft: '68px' }}>
      {/* Top Navbar */}
      <header style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building2 size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.15rem' }}>HelpDesk+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{company?.name || 'Organization Dashboard'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {isAdminOrHod && (
              <Link to="/admin/users" className="btn btn-secondary" style={{ padding: '0.4rem 0.875rem', fontSize: '0.85rem' }}>
                <Users size={16} /> User Management
              </Link>
            )}

            {/* Company Code Badge with Copy button */}
            {company?.code && (
              <button
                onClick={copyCompanyCode}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-dark)',
                  border: '1px solid var(--primary)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--border-focus)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                }}
              >
                <Copy size={14} /> Code: {company.code} {copied ? '✓' : ''}
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.name}</div>
                <span className="badge badge-admin">{user?.role}</span>
              </div>
              <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem 0.875rem', fontSize: '0.85rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1.5rem', width: '100%', flex: 1 }}>
        {/* Welcome Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <span className="badge badge-active" style={{ marginBottom: '0.75rem' }}>
              <CheckCircle2 size={12} /> ACCOUNT ACTIVE
            </span>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Welcome back, {user?.name}!
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              You are signed in to <strong style={{ color: 'var(--text-primary)' }}>{company?.name}</strong> as an <strong style={{ color: 'var(--primary)' }}>{user?.role}</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {isAdminOrHod && (
              <Link to="/admin/users" className="btn btn-primary">
                <Users size={18} /> User Management Module
              </Link>
            )}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Card 1: User Management Quick Access */}
          {isAdminOrHod && (
            <div className="card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Users size={22} color="var(--primary)" />
                <h3 style={{ fontSize: '1.1rem' }}>User Management</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Manage team accounts, assign departments, set roles, activate/suspend accounts, and reset passwords.
              </p>
              <Link to="/admin/users" className="btn btn-primary btn-full">
                Open User Directory
              </Link>
            </div>
          )}

          {/* Card 2: Organization Profile & Code */}
          <div className="card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Building2 size={22} color="var(--success)" />
              <h3 style={{ fontSize: '1.1rem' }}>Organization Details</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Company Name:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{company?.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Company Code:</span>
                <strong style={{ color: 'var(--border-focus)', fontFamily: 'monospace' }}>{company?.code}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Location:</span>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {company?.city || company?.state ? `${company.city || ''} ${company.state || ''}` : 'Primary Head Office'}
                </strong>
              </div>
            </div>
          </div>

          {/* Card 3: Admin Onboarding Controls */}
          {user?.role === 'ADMIN' && (
            <div className="card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <UserCheck size={22} color="var(--warning)" />
                <h3 style={{ fontSize: '1.1rem' }}>Join Requests</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Review incoming employee join requests and approve account access.
              </p>
              <Link to="/admin/join-requests" className="btn btn-secondary btn-full">
                Review Join Requests
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
