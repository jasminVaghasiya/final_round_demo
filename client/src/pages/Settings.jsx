import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { departmentApi } from '../api/departmentApi';
import { useAuth } from '../context/AuthContext';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Users,
  ArrowLeft,
  X,
} from 'lucide-react';

export const Settings = () => {
  const navigate = useNavigate();
  const { company } = useAuth();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [error, setError] = useState('');

  // Department Modals State
  const [isDeptCreateOpen, setIsDeptCreateOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [deletingDept, setDeletingDept] = useState(null);
  const [deptForm, setDeptForm] = useState({ name: '', code: '', description: '' });

  const [modalLoading, setModalLoading] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await departmentApi.getDepartments();
      if (res.success && res.data?.departments) {
        setDepartments(res.data.departments);
      }
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Department Handlers
  const handleCreateDept = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setModalLoading(true);
      const res = await departmentApi.createDepartment(deptForm);
      if (res.success) {
        showToast('🟢 Department created successfully');
        setIsDeptCreateOpen(false);
        setDeptForm({ name: '', code: '', description: '' });
        fetchDepartments();
      }
    } catch (err) {
      setError(err.message || 'Failed to create department.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleEditDept = async (e) => {
    e.preventDefault();
    if (!editingDept) return;
    setError('');
    try {
      setModalLoading(true);
      const res = await departmentApi.updateDepartment(editingDept._id, deptForm);
      if (res.success) {
        showToast('🟢 Department updated successfully');
        setEditingDept(null);
        fetchDepartments();
      }
    } catch (err) {
      setError(err.message || 'Failed to update department.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteDept = async () => {
    if (!deletingDept) return;
    try {
      setModalLoading(true);
      const res = await departmentApi.deleteDepartment(deletingDept._id);
      if (res.success) {
        showToast('🔴 Department deleted');
        setDeletingDept(null);
        fetchDepartments();
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete department.', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ paddingLeft: '68px' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            backgroundColor: toastMessage.type === 'error' ? 'var(--error)' : 'var(--success)',
            color: '#ffffff',
            padding: '0.875rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {toastMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {toastMessage.text}
        </div>
      )}

      <div style={{ maxWidth: 1250, margin: '2rem auto', padding: '0 1.5rem', width: '100%', flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              <ArrowLeft size={15} /> Dashboard
            </button>
            <h1>Department Settings</h1>
            <p className="subtitle" style={{ marginBottom: 0 }}>Manage organizational departments and member routing for {company?.name}</p>
          </div>
        </div>

        {/* DEPARTMENT MANAGEMENT CARD */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Organization internal departments ({departments.length})</div>
            <button className="btn btn-primary" onClick={() => { setDeptForm({ name: '', code: '', description: '' }); setError(''); setIsDeptCreateOpen(true); }}>
              <Plus size={18} /> Add New Department
            </button>
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {loading ? (
              <div className="center-content" style={{ padding: '4rem 0' }}><div className="spinner" style={{ width: 40, height: 40 }} /></div>
            ) : departments.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Building2 size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                <h3>No Departments Configured</h3>
                <p style={{ marginTop: '0.25rem', marginBottom: '1.5rem' }}>Add your first department to assign users and route tickets.</p>
                <button className="btn btn-primary" onClick={() => setIsDeptCreateOpen(true)}>
                  <Plus size={18} /> Create First Department
                </button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-dark)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '0.875rem 1.25rem' }}>Department Name</th>
                      <th style={{ padding: '0.875rem 1.25rem' }}>Dept Code</th>
                      <th style={{ padding: '0.875rem 1.25rem' }}>Description</th>
                      <th style={{ padding: '0.875rem 1.25rem' }}>Active Members</th>
                      <th style={{ padding: '0.875rem 1.25rem', width: 120 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept) => (
                      <tr key={dept._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                            <Building2 size={18} color="var(--primary)" /> {dept.name}
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--border-focus)' }}>{dept.code}</td>
                        <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>{dept.description || '—'}</td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <span className="badge badge-active"><Users size={12} /> {dept.memberCount || 0} Members</span>
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }} onClick={() => { setEditingDept(dept); setDeptForm({ name: dept.name, code: dept.code, description: dept.description || '' }); setError(''); }}>
                              <Edit2 size={14} /> Edit
                            </button>
                            <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', color: 'var(--error)' }} onClick={() => setDeletingDept(dept)}>
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CREATE DEPARTMENT MODAL */}
      {isDeptCreateOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <h2>+ Add New Department</h2>
              <button onClick={() => setIsDeptCreateOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            {error && <div className="alert alert-error"><AlertCircle size={18} /><div>{error}</div></div>}
            <form onSubmit={handleCreateDept}>
              <div className="form-group">
                <label className="form-label">Department Name *</label>
                <input type="text" className="form-input" placeholder="Computer Science Engineering" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Department Code (Optional)</label>
                <input type="text" className="form-input" placeholder="CSE" value={deptForm.code} onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <textarea className="form-input" rows="3" placeholder="Department purpose..." value={deptForm.description} onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsDeptCreateOpen(false)} disabled={modalLoading}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={modalLoading}>{modalLoading ? <div className="spinner" /> : 'Create Department'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT DEPARTMENT MODAL */}
      {editingDept && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <h2>Edit & Save Department</h2>
              <button onClick={() => setEditingDept(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            {error && <div className="alert alert-error"><AlertCircle size={18} /><div>{error}</div></div>}
            <form onSubmit={handleEditDept}>
              <div className="form-group">
                <label className="form-label">Department Name *</label>
                <input type="text" className="form-input" value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Department Code *</label>
                <input type="text" className="form-input" value={deptForm.code} onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input" rows="3" value={deptForm.description} onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingDept(null)} disabled={modalLoading}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={modalLoading}>{modalLoading ? <div className="spinner" /> : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE DEPARTMENT MODAL */}
      {deletingDept && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <h2 style={{ color: 'var(--error)' }}>Delete Department?</h2>
              <button onClick={() => setDeletingDept(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Are you sure you want to delete department <strong>{deletingDept.name}</strong>?</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setDeletingDept(null)} disabled={modalLoading}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDeleteDept} disabled={modalLoading}>{modalLoading ? <div className="spinner" /> : 'Confirm Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
