import React, { useState } from 'react';
import { X, Key, RefreshCw, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const ResetPasswordModal = ({ isOpen, onClose, onSubmit, user = null }) => {
  if (!isOpen || !user) return null;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forcePasswordChange, setForcePasswordChange] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(pass);
    setConfirmPassword(pass);
  };

  // Simple password strength calculator
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = getStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(user._id, { newPassword, forcePasswordChange });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={22} color="var(--primary)" /> Reset User Password
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ backgroundColor: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TARGET USER</div>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            {user.name} ({user.email})
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
            <button
              type="button"
              onClick={generateTempPassword}
              style={{ background: 'none', border: 'none', color: 'var(--border-focus)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <RefreshCw size={14} /> Generate Temporary Password
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">New Password *</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter or generate new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div style={{ marginTop: '0.375rem' }}>
                <div style={{ display: 'flex', gap: '4px', height: 4, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ flex: 1, backgroundColor: strengthScore >= 1 ? (strengthScore >= 3 ? 'var(--success)' : 'var(--warning)') : 'var(--border-color)' }} />
                  <div style={{ flex: 1, backgroundColor: strengthScore >= 3 ? 'var(--success)' : 'var(--border-color)' }} />
                  <div style={{ flex: 1, backgroundColor: strengthScore >= 4 ? 'var(--success)' : 'var(--border-color)' }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: strengthScore >= 3 ? 'var(--success)' : 'var(--warning)', marginTop: '2px' }}>
                  Strength: {strengthScore <= 2 ? 'Weak' : strengthScore <= 4 ? 'Medium' : 'Strong'}
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <input
              id="forcePassChange"
              type="checkbox"
              checked={forcePasswordChange}
              onChange={(e) => setForcePasswordChange(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
            <label htmlFor="forcePassChange" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Force password change on next login (Recommended)
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <div className="spinner" /> : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
