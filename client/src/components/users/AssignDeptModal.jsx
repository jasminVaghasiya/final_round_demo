import React, { useState } from 'react';
import { X, Building2, AlertCircle } from 'lucide-react';

export const AssignDeptModal = ({ isOpen, onClose, onSubmit, user = null, departments = [] }) => {
  if (!isOpen || !user) return null;

  const deptsList = Array.isArray(departments) ? departments : [];
  const currentDeptId = user.departmentId?._id || user.departmentId || '';
  const currentDeptObj = deptsList.find((d) => d && d._id === currentDeptId);

  const [selectedDeptId, setSelectedDeptId] = useState(currentDeptId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await onSubmit(user._id, selectedDeptId);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to assign department.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={22} color="var(--primary)" /> Assign Department
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ backgroundColor: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TARGET USER</div>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            {user.name} ({user.userId})
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Current Department: <strong style={{ color: 'var(--border-focus)' }}>{currentDeptObj ? currentDeptObj.name : 'Unassigned'}</strong>
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
            <label className="form-label">New Department Assignment *</label>
            <select className="form-input" value={selectedDeptId} onChange={(e) => setSelectedDeptId(e.target.value)}>
              <option value="">Unassigned (No Department)</option>
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
              {loading ? <div className="spinner" /> : 'Confirm Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
