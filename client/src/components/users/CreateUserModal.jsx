import React, { useState } from 'react';
import { X, RefreshCw, Eye, EyeOff, AlertCircle, Camera, User as UserIcon } from 'lucide-react';
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

export const CreateUserModal = ({ isOpen, onClose, onSubmit, departments = [], currentUser = null }) => {
  if (!isOpen) return null;

  const assignableRoles = getAssignableRoles(currentUser);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    username: '',
    password: '',
    role: assignableRoles[0]?.code || 'EMPLOYEE',
    departmentId: currentUser?.role === 'HOD' ? (currentUser.departmentId?._id || currentUser.departmentId || '') : '',
    designation: '',
    employeeStudentId: '',
    profileImage: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password: pass }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields (First Name, Last Name, Email, Password).');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create user account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card card-wide" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <h2>+ Create New User Account</h2>
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
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Profile Photo (Optional)</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Upload optional profile picture</div>
              <label className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Camera size={14} /> Select Photo
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

          {/* Section 1: Basic Identity Info */}
          <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>Personal & Contact Details</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                placeholder="john.doe@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Primary Phone</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+1 555-0192"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Section 2: Account Credentials */}
          <div style={{ fontWeight: 600, color: 'var(--primary)', margin: '1rem 0 0.75rem 0', fontSize: '0.9rem' }}>Account Credentials</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Username (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="johndoe"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Initial Password *</label>
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  style={{ background: 'none', border: 'none', color: 'var(--border-focus)', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <RefreshCw size={12} /> Auto-Generate
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Min 6 characters..."
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Role & Department Assignment */}
          <div style={{ fontWeight: 600, color: 'var(--primary)', margin: '1rem 0 0.75rem 0', fontSize: '0.9rem' }}>Organization Assignment</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Assignable System Role *</label>
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
              <label className="form-label">Job Title / Designation</label>
              <input
                type="text"
                className="form-input"
                placeholder="Senior Operations Lead"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Employee / Member ID</label>
              <input
                type="text"
                className="form-input"
                placeholder="EMP-9021"
                value={formData.employeeStudentId}
                onChange={(e) => setFormData({ ...formData, employeeStudentId: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <div className="spinner" /> : 'Create User Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
