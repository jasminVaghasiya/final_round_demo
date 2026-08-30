import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { companyApi } from '../api/companyApi';
import { useAuth } from '../context/AuthContext';
import { Building2, UserCheck, CheckCircle2, Copy, ArrowRight, ArrowLeft, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const CreateCompany = () => {
  const navigate = useNavigate();
  const { saveAuthData } = useAuth();

  const [step, setStep] = useState(1);

  // Step 1 State: Company Details
  const [companyData, setCompanyData] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    city: '',
    state: '',
    country: '',
  });

  // Step 2 State: Admin Account Details
  const [adminData, setAdminData] = useState({
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminPassword: '',
    confirmPassword: '',
  });

  // Step 3 State: Created Result
  const [createdResult, setCreatedResult] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Step 1 submission -> Move to Step 2
  const handleStep1Next = (e) => {
    e.preventDefault();
    setError('');

    if (!companyData.companyName || !companyData.companyEmail) {
      setError('Company Name and Company Email are required.');
      return;
    }

    setStep(2);
  };

  // Handle Step 2 submission -> Call Backend API
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!adminData.adminName || !adminData.adminEmail || !adminData.adminPassword) {
      setError('Full Name, Email, and Password are required.');
      return;
    }

    if (adminData.adminPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (adminData.adminPassword !== adminData.confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...companyData,
        ...adminData,
      };

      const res = await companyApi.registerCompany(payload);

      if (res.success && res.data) {
        setCreatedResult(res.data);
        saveAuthData(res.data.token, res.data.user);
        setStep(3);
      }
    } catch (err) {
      setError(err.message || 'Failed to create company. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const copyCodeToClipboard = () => {
    if (createdResult?.company?.code) {
      navigator.clipboard.writeText(createdResult.company.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="app-container">
      <div className="center-content">
        <div className="card card-wide">
          {/* Progress Indicator */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 1 ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid', borderColor: step >= 1 ? 'var(--primary)' : 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                  1
                </div>
                Company Info
              </div>
              <div style={{ flex: 1, height: 2, backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--border-color)', margin: '0 1rem' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 2 ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid', borderColor: step >= 2 ? 'var(--primary)' : 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                  2
                </div>
                Admin Account
              </div>
              <div style={{ flex: 1, height: 2, backgroundColor: step === 3 ? 'var(--success)' : 'var(--border-color)', margin: '0 1rem' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step === 3 ? 'var(--success)' : 'var(--text-muted)', fontWeight: 600 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid', borderColor: step === 3 ? 'var(--success)' : 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                  3
                </div>
                Finish
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} style={{ shrink: 0, marginTop: 2 }} />
              <div>{error}</div>
            </div>
          )}

          {/* STEP 1: Company Information Form */}
          {step === 1 && (
            <div>
              <h2>Step 1 — Company Information</h2>
              <p className="subtitle">Enter your organization details to initialize your HelpDesk+ environment</p>

              <form onSubmit={handleStep1Next}>
                <div className="form-group">
                  <label className="form-label" htmlFor="companyName">Company Name *</label>
                  <input
                    id="companyName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Acme Technologies Inc."
                    value={companyData.companyName}
                    onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="companyEmail">Company Email *</label>
                    <input
                      id="companyEmail"
                      type="email"
                      className="form-input"
                      placeholder="contact@acme.com"
                      value={companyData.companyEmail}
                      onChange={(e) => setCompanyData({ ...companyData, companyEmail: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="companyPhone">Company Phone</label>
                    <input
                      id="companyPhone"
                      type="tel"
                      className="form-input"
                      placeholder="+1 (555) 000-0000"
                      value={companyData.companyPhone}
                      onChange={(e) => setCompanyData({ ...companyData, companyPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="companyAddress">Company Address</label>
                  <input
                    id="companyAddress"
                    type="text"
                    className="form-input"
                    placeholder="123 Corporate Blvd, Suite 400"
                    value={companyData.companyAddress}
                    onChange={(e) => setCompanyData({ ...companyData, companyAddress: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      className="form-input"
                      placeholder="New York"
                      value={companyData.city}
                      onChange={(e) => setCompanyData({ ...companyData, city: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="state">State / Province</label>
                    <input
                      id="state"
                      type="text"
                      className="form-input"
                      placeholder="NY"
                      value={companyData.state}
                      onChange={(e) => setCompanyData({ ...companyData, state: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="country">Country</label>
                  <input
                    id="country"
                    type="text"
                    className="form-input"
                    placeholder="United States"
                    value={companyData.country}
                    onChange={(e) => setCompanyData({ ...companyData, country: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                  <Link to="/onboarding" className="btn btn-secondary">
                    <ArrowLeft size={18} /> Cancel
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Next: Admin Account <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: Admin Account Form */}
          {step === 2 && (
            <div>
              <h2>Step 2 — Admin Account</h2>
              <p className="subtitle">Create the primary administrator profile for {companyData.companyName}</p>

              <form onSubmit={handleFinalSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="adminName">Full Name *</label>
                  <input
                    id="adminName"
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    value={adminData.adminName}
                    onChange={(e) => setAdminData({ ...adminData, adminName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="adminEmail">Email Address *</label>
                    <input
                      id="adminEmail"
                      type="email"
                      className="form-input"
                      placeholder="john@acme.com"
                      value={adminData.adminEmail}
                      onChange={(e) => setAdminData({ ...adminData, adminEmail: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="adminPhone">Phone Number</label>
                    <input
                      id="adminPhone"
                      type="tel"
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                      value={adminData.adminPhone}
                      onChange={(e) => setAdminData({ ...adminData, adminPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="adminPassword">Password *</label>
                    <div className="password-input-container">
                      <input
                        id="adminPassword"
                        type={showPassword ? 'text' : 'password'}
                        className="form-input"
                        placeholder="Min 6 characters"
                        value={adminData.adminPassword}
                        onChange={(e) => setAdminData({ ...adminData, adminPassword: e.target.value })}
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
                      value={adminData.confirmPassword}
                      onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? <div className="spinner" /> : <><CheckCircle2 size={18} /> Create Company & Admin</>}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Success Screen matching Section 9 spec */}
          {step === 3 && createdResult && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'var(--success-light)',
                  color: 'var(--success)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h1>🎉 Company Created Successfully!</h1>
              <p className="subtitle">Welcome to HelpDesk+</p>

              <div style={{ backgroundColor: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>COMPANY NAME</p>
                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {createdResult.company.name}
                </p>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your Unique Company Code:</p>

              <div className="code-box">
                <div className="code-text">{createdResult.company.code}</div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Share this unique code with employees who want to request access to join your company.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={copyCodeToClipboard}>
                  <Copy size={18} /> {copied ? 'Copied!' : 'Copy Company Code'}
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
