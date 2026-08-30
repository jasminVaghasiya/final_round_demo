import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Users, ArrowRight, ArrowLeft } from 'lucide-react';

export const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="center-content">
        <div className="card card-wide">
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.9rem' }}>
              <ArrowLeft size={16} /> Back to Login
            </Link>
            <h1>How do you want to get started?</h1>
            <p className="subtitle">Select an onboarding option below to continue with HelpDesk+</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Create Company Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, border-color 0.15s ease',
              }}
            >
              <div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    backgroundColor: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Building2 size={24} color="var(--primary)" />
                </div>
                <h2>Create New Company</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem 0' }}>
                  Create your organization and automatically become its administrator to manage tickets and team members.
                </p>
              </div>

              <button
                className="btn btn-primary btn-full"
                onClick={() => navigate('/register/company')}
              >
                Create Company <ArrowRight size={18} />
              </button>
            </div>

            {/* Join Company Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, border-color 0.15s ease',
              }}
            >
              <div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    backgroundColor: 'var(--success-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Users size={24} color="var(--success)" />
                </div>
                <h2>Join Existing Company</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem 0' }}>
                  Request access to an existing company using the unique company code provided by your administrator.
                </p>
              </div>

              <button
                className="btn btn-secondary btn-full"
                onClick={() => navigate('/join-company')}
              >
                Join Company <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
