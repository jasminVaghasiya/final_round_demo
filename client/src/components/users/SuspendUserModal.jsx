import React, { useState } from 'react';
import { X, AlertOctagon, AlertCircle } from 'lucide-react';

export const SuspendUserModal = ({ isOpen, onClose, onSubmit, user = null }) => {
  if (!isOpen || !user) return null;

  const [suspensionReason, setSuspensionReason] = useState('');
  const [durationOption, setDurationOption] = useState('7_DAYS');
  const [customEndDate, setCustomEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!suspensionReason.trim()) {
      setError('Suspension reason is required.');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(user._id, {
        suspensionReason: suspensionReason.trim(),
        durationOption,
        customEndDate: durationOption === 'CUSTOM' ? customEndDate : null,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to suspend user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2 style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertOctagon size={22} /> Suspend User Account
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
          <div className="form-group">
            <label className="form-label">Suspension Reason *</label>
            <textarea
              className="form-input"
              rows="3"
              placeholder="Specify clear rationale for temporary access restriction..."
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Suspension Duration *</label>
            <select className="form-input" value={durationOption} onChange={(e) => setDurationOption(e.target.value)}>
              <option value="1_DAY">1 Day</option>
              <option value="3_DAYS">3 Days</option>
              <option value="7_DAYS">7 Days (Default)</option>
              <option value="30_DAYS">30 Days</option>
              <option value="INDEFINITE">Indefinite (Until manual reactivation)</option>
              <option value="CUSTOM">Custom End Date</option>
            </select>
          </div>

          {durationOption === 'CUSTOM' && (
            <div className="form-group">
              <label className="form-label">Custom End Date *</label>
              <input
                type="date"
                className="form-input"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                required
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? <div className="spinner" /> : 'Confirm Suspend User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
