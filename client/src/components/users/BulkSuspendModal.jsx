import React, { useState } from 'react';
import { X, AlertOctagon, AlertCircle, Users } from 'lucide-react';

export const BulkSuspendModal = ({ isOpen, onClose, onSubmit, selectedCount = 0 }) => {
  if (!isOpen) return null;

  const [durationDays, setDurationDays] = useState(7);
  const [suspensionReason, setSuspensionReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!suspensionReason.trim()) {
      setError('Please provide a reason for bulk suspension.');
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ durationDays: Number(durationDays), suspensionReason: suspensionReason.trim() });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to bulk suspend users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--error)', fontSize: '1.2rem' }}>
            <AlertOctagon size={22} /> Bulk Suspend User Accounts
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ backgroundColor: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.15)', color: '#f87171' }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SUSPENSION RECIPIENTS</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#f87171' }}>
              {selectedCount} Selected Accounts
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
            <label className="form-label">Suspension Duration (Days) *</label>
            <select className="form-input" value={durationDays} onChange={(e) => setDurationDays(e.target.value)}>
              <option value={1}>1 Day (24 Hours)</option>
              <option value={3}>3 Days</option>
              <option value={7}>7 Days (1 Week)</option>
              <option value={14}>14 Days (2 Weeks)</option>
              <option value={30}>30 Days (1 Month)</option>
              <option value={90}>90 Days (Quarterly)</option>
              <option value={365}>Indefinite / Permanent</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Administrative Reason *</label>
            <textarea
              className="form-input"
              rows="3"
              placeholder="State the administrative or policy violation reason..."
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? <div className="spinner" /> : `Confirm Suspend ${selectedCount} Users`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
