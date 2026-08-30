import React, { useState } from 'react';
import { X, Building2, AlertCircle, Users } from 'lucide-react';

export const BulkAssignDeptModal = ({ isOpen, onClose, onSubmit, selectedCount = 0, departments = [] }) => {
  if (!isOpen) return null;

  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await onSubmit(selectedDeptId || null);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to bulk assign department.');
    } finally {
      setLoading(false);
    }
  };

  const deptsList = Array.isArray(departments) ? departments : [];

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
            <Building2 size={22} color="var(--primary)" /> Bulk Assign Department
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
            <label className="form-label">Target Department Dropdown *</label>
            <select className="form-input" value={selectedDeptId} onChange={(e) => setSelectedDeptId(e.target.value)}>
              <option value="">Unassigned (Remove Department)</option>
              {deptsList.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name} {d.code ? `(${d.code})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <div className="spinner" /> : `Assign to ${selectedCount} Users`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
