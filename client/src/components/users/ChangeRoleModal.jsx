import React, { useState } from 'react';
import { X, Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import { getAssignableRoles } from '../../utils/roleUtils';

export const ChangeRoleModal = ({ isOpen, onClose, onSubmit, user = null, currentUser = null }) => {
  if (!isOpen || !user) return null;

  const assignableRoles = getAssignableRoles(currentUser);

  const [role, setRole] = useState(assignableRoles[0]?.code || 'EMPLOYEE');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isPrivilegedRole = ['ADMIN', 'SUPER_ADMIN', 'HOD'].includes(role);
  const wasNotPrivileged = !['ADMIN', 'SUPER_ADMIN', 'HOD'].includes(user.role);
  const showPrivilegeWarning = isPrivilegedRole && wasNotPrivileged;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await onSubmit(user._id, role, reason);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to change user role.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={22} color="var(--primary)" /> Change User Role
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ backgroundColor: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TARGET USER</div>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            {user.name} ({user.role})
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <div>{error}</div>
          </div>
        )}

        {showPrivilegeWarning && (
          <div className="alert alert-warning">
            <AlertTriangle size={18} style={{ shrink: 0 }} />
            <div>
              <strong>Privilege Escalation Warning:</strong> Changing this user to {role} will grant administrative control over system data and settings. Continue?
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Current Role: <strong style={{ color: 'var(--text-primary)' }}>{user.role}</strong></label>
            <label className="form-label" style={{ marginTop: '0.5rem' }}>Assignable New Role *</label>
            <select className="form-input" value={role} onChange={(e) => setRole(e.target.value)}>
              {assignableRoles.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Reason for Role Change (Optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Promoted to Department Head..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <div className="spinner" /> : 'Confirm Role Change'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
