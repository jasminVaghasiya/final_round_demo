import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Camera, User as UserIcon } from 'lucide-react';
import { getAssignableRoles } from '../../utils/roleUtils';

const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 300;
        const maxHeight = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export const EditUserModal = ({ isOpen, onClose, onSubmit, user = null, departments = [], currentUser = null }) => {
  if (!isOpen || !user) return null;

  const assignableRoles = getAssignableRoles(currentUser);

  const [formData, setFormData] = useState({
    name: user.name || '',
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
    alternatePhone: user.alternatePhone || '',
    username: user.username || '',
    role: user.role || 'EMPLOYEE',
    departmentId: user.departmentId?._id || user.departmentId || '',
    designation: user.designation || '',
    employeeStudentId: user.employeeStudentId || '',
    status: user.status || 'ACTIVE',
    profileImage: user.profileImage || user.avatar || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        alternatePhone: user.alternatePhone || '',
        username: user.username || '',
        role: user.role || 'EMPLOYEE',
        departmentId: user.departmentId?._id || user.departmentId || '',
        designation: user.designation || '',
        employeeStudentId: user.employeeStudentId || '',
        status: user.status || 'ACTIVE',
        profileImage: user.profileImage || user.avatar || '',
      });
    }
  }, [user]);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedBase64 = await compressImage(file);
        setFormData((prev) => ({ ...prev, profileImage: compressedBase64 }));
      } catch (err) {
        setError('Failed to process uploaded image.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await onSubmit(user._id, formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card card-wide" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2>Edit User — {user.name} ({user.userId})</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Optional Profile Photo Upload */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem', padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ position: 'relative', width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--primary-light)', color: 'var(--border-focus)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border-focus)' }}>
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="User Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <UserIcon size={32} />
              )}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Profile Photo</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Update profile picture or avatar image</div>
              <label className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Camera size={14} /> Change Photo
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
              </label>
              {formData.profileImage && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, profileImage: '' })}
                  style={{ marginLeft: '0.5rem', background: 'none', border: 'none', color: 'var(--error)', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Assignable System Role</label>
              <select className="form-input" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                {assignableRoles.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.name} ({r.code})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select
                className="form-input"
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                disabled={currentUser?.role === 'HOD'}
              >
                <option value="">Unassigned</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Designation</label>
              <input
                type="text"
                className="form-input"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Employee / Member ID</label>
              <input
                type="text"
                className="form-input"
                value={formData.employeeStudentId}
                onChange={(e) => setFormData({ ...formData, employeeStudentId: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Account Status</label>
            <select className="form-input" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <div className="spinner" /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
