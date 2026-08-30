import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import { Eye, EyeOff, Building2, UserPlus, LogIn, AlertCircle } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { saveAuthData } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await authApi.login(email, password);
      if (res.success && res.data?.token) {
        saveAuthData(res.data.token, res.data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      // Handle status-specific errors (PENDING, REJECTED, SUSPENDED)
      if (err.data && err.data.status) {
        const { status, data, message } = err.data;
        if (status === 'PENDING' && data?.token) {
          saveAuthData(data.token, data.user);
          navigate('/join-company/pending');
          return;
        }
        setError(message || 'Authentication error');
      } else {
        setError(err.message || 'Invalid credentials or login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="center-content">
        <div className="card">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)',
              }}
            >
              <Building2 size={28} color="#ffffff" />
            </div>
            <h1>HelpDesk+</h1>
            <p className="subtitle">Welcome Back</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} style={{ shrink: 0, marginTop: 2 }} />
              <div>{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password *
              </label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: '40px' }}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: 'var(--primary)' }}
                />
                Remember me
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset functionality requested. Please contact your company administrator.'); }} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? <div className="spinner" /> : <><LogIn size={18} /> Login</>}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              margin: '2rem 0 1.5rem 0',
              textAlign: 'center',
              borderTop: '1px solid var(--border-color)',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'var(--bg-card)',
                padding: '0 0.75rem',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
              }}
            >
              Don't have an account?
            </span>
          </div>

          {/* Onboarding Action Buttons (Section 3 spec) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/register/company" className="btn btn-secondary btn-full">
              <Building2 size={18} style={{ color: 'var(--primary)' }} /> Create New Company
            </Link>

            <Link to="/join-company" className="btn btn-secondary btn-full">
              <UserPlus size={18} style={{ color: 'var(--success)' }} /> Join Existing Company
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
