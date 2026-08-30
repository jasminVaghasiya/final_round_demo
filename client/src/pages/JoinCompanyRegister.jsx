import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { joinRequestApi } from '../api/joinRequestApi';
import { useAuth } from '../context/AuthContext';
import { Building2, Send, ArrowLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const JoinCompanyRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveAuthData } = useAuth();

  const company = location.state?.company;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    message: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!company) {
    return (
      <div className="app-container">
        <div className="center-content">
          <div className="card" style={{ textAlign: 'center' }}>
            <AlertCircle size={40} color="var(--error)" style={{ margin: '0 auto 1rem auto' }} />
            <h2>No Company Selected</h2>
            <p className="subtitle">Please search and select a valid company code first.</p>
            <Link to="/join-company" className="btn btn-primary btn-full">
              Find Company
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Full Name, Email, and Password are required.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        companyCode: company.code,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        message: formData.message,
      };

      const res = await joinRequestApi.submitRequest(payload);

      if (res.success && res.data?.token) {
        saveAuthData(res.data.token, res.data.user);
        navigate('/join-company/pending');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit join request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="center-content">
        <div className="card card-wide">
          <Link to="/join-company" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Search
          </Link>

          <h2>Create Your Account</h2>
          <p className="subtitle">Request access to join your company's HelpDesk+ environment</p>

          {/* Selected Company Banner */}
          <div
            style={{
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--bg-dark)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.75rem',
            }}
          >
            <Building2 size={20} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Company</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{company.name} ({company.code})</div>
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} style={{ shrink: 0, marginTop: 2 }} />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="Rahul Shah"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password *</label>
                <div className="password-input-container">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Optional Message to Admin</label>
              <textarea
                id="message"
                className="form-input"
                rows="3"
                placeholder="Specify your department, designation, or employee ID for quick approval..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? <div className="spinner" /> : <><Send size={18} /> Send Join Request</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
