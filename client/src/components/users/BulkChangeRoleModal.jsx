import React, { useState } from 'react';
import { X, Shield, AlertCircle, Users } from 'lucide-react';
import { getAssignableRoles } from '../../utils/roleUtils';

export const BulkChangeRoleModal = ({ isOpen, onClose, onSubmit, selectedCount = 0, currentUser = null }) => {
  if (!isOpen) return null;

  const assignableRoles = getAssignableRoles(currentUser);

  const [selectedRole, setSelectedRole] = useState(assignableRoles[0]?.code || 'EMPLOYEE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await onSubmit(selectedRole);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to bulk change role.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
            <Shield size={22} color="var(--primary)" /> Bulk Change User Roles
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ backgroundColor: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--border-focus)' }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SELECTED RECIPIENTS</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              {selectedCount} Selected Users
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Assignable System Role *</label>
            <select className="form-input" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              {assignableRoles.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name} ({r.code})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <div className="spinner" /> : `Update Role for ${selectedCount} Users`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
