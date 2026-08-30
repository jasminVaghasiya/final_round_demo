import React, { useState, useEffect } from 'react';
import { X, Save, Send, AlertCircle, Building2, User, Tag, Flag } from 'lucide-react';
import { complaintApi } from '../../api/complaintApi';
import { departmentApi } from '../../api/departmentApi';
import { userManagementApi } from '../../api/userManagementApi';

export const ComplaintFormModal = ({ isOpen, onClose, onSuccess, initialData = null }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    category: 'TECHNICAL',
    priority: 'MEDIUM',
    departmentId: '',
    targetedRole: 'HOD',
    targetedPerson: '',
  });

  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = Boolean(initialData && initialData._id);

  // Initialize or reset form on open
  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (initialData) {
        setFormData({
          subject: initialData.subject || '',
          description: initialData.description || '',
          category: initialData.category || 'TECHNICAL',
          priority: initialData.priority || 'MEDIUM',
          departmentId: initialData.departmentId?._id || initialData.departmentId || '',
          targetedRole: initialData.targetedRole || 'HOD',
          targetedPerson: initialData.targetedPerson?._id || initialData.targetedPerson || '',
        });
      } else {
        setFormData({
          subject: '',
          description: '',
          category: 'TECHNICAL',
          priority: 'MEDIUM',
          departmentId: '',
          targetedRole: 'HOD',
          targetedPerson: '',
        });
      }
      loadOptions();
    }
  }, [isOpen, initialData]);

  const loadOptions = async () => {
    try {
      const [deptRes, userRes] = await Promise.all([
        departmentApi.getDepartments().catch(() => null),
        userManagementApi.getUsers({ limit: 100 }).catch(() => null),
      ]);

      const deptList =
        (Array.isArray(deptRes?.data?.departments) && deptRes.data.departments) ||
        (Array.isArray(deptRes?.departments) && deptRes.departments) ||
        (Array.isArray(deptRes?.data) && deptRes.data) ||
        (Array.isArray(deptRes) && deptRes) ||
        [];

      const userList =
        (Array.isArray(userRes?.data?.users) && userRes.data.users) ||
        (Array.isArray(userRes?.users) && userRes.users) ||
        (Array.isArray(userRes?.data) && userRes.data) ||
        (Array.isArray(userRes) && userRes) ||
        [];

      setDepartments(deptList);
      setUsers(userList);
      if (!initialData && deptList.length > 0) {
        setFormData((prev) => ({
          ...prev,
          departmentId: prev.departmentId || deptList[0]._id,
        }));
      }
    } catch (err) {
      console.error('Error fetching options in modal:', err);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (isDraft, submitNow = false) => {
    if (!formData.subject.trim()) {
      setError('Please provide a subject for the complaint.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please describe your complaint in detail.');
      return;
    }
    if (!formData.departmentId) {
      setError('Please select a target department for this complaint.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        category: formData.category,
        priority: formData.priority,
        departmentId: formData.departmentId || null,
        targetedRole: formData.targetedRole,
        targetedPerson: formData.targetedPerson || null,
      };

      if (isEditMode) {
        await complaintApi.updateComplaint(initialData._id, {
          ...payload,
          submitNow: submitNow || !isDraft,
        });
      } else {
        await complaintApi.createComplaint({
          ...payload,
          isDraft,
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to process complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter users by selected department if applicable
  const availableTargetUsers = users.filter((u) => {
    if (!formData.departmentId) return true;
    const uDeptId = u.departmentId?._id || u.departmentId;
    return String(uDeptId) === String(formData.departmentId);
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #334155',
            backgroundColor: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              {isEditMode ? `Edit Complaint (${initialData.complaintId})` : 'New Complaint / Support Request'}
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
              {isEditMode
                ? 'Update draft or rejected complaint details and resubmit when ready.'
                : 'Raise an issue with the concerned department or authority. Save as a draft or submit immediately.'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              padding: '0.5rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#1e293b' }}>
          {error && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Subject */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.375rem' }}>
              Subject / Issue Summary <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Projector in Lab 3 not turning on or Salary deduction query"
              maxLength={200}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Category & Priority Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {/* Category */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.375rem' }}>
                <Tag size={15} color="#6366f1" /> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="TECHNICAL">Technical & IT</option>
                <option value="ACADEMIC">Academic & Curriculum</option>
                <option value="ADMINISTRATIVE">Administrative</option>
                <option value="INFRASTRUCTURE">Infrastructure & Maintenance</option>
                <option value="HR">HR & Payroll</option>
                <option value="FACILITY">Facility & Logistics</option>
                <option value="OTHER">Other Query</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.375rem' }}>
                <Flag size={15} color="#6366f1" /> Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="LOW">Low (Routine)</option>
                <option value="MEDIUM">Medium (Normal)</option>
                <option value="HIGH">High (Urgent Attention)</option>
                <option value="URGENT">Critical / Immediate Action</option>
              </select>
            </div>
          </div>

          {/* Department & Targeted Person Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {/* Department */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.375rem' }}>
                <Building2 size={15} color="#6366f1" /> Target Department
              </label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="" disabled>-- Select Target Department --</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Targeted Role / Person */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.375rem' }}>
                <User size={15} color="#6366f1" /> Targeted Authority / Role
              </label>
              <select
                name="targetedRole"
                value={formData.targetedRole}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              >
                <option value="HOD">Head of Department (HOD)</option>
                <option value="MANAGER">Manager / Supervisor</option>
                <option value="ADMIN">System Administrator</option>
                <option value="STAFF">Department Staff</option>
                <option value="OTHER">Other Officer</option>
              </select>
            </div>
          </div>

          {/* Specific Person Selection (Optional) */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.375rem' }}>
              Assign to Specific Person (Optional)
            </label>
            <select
              name="targetedPerson"
              value={formData.targetedPerson}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            >
              <option value="">-- Assign Automatically by Department / Role --</option>
              {availableTargetUsers.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.role} - {u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.375rem' }}>
              Complaint Description & Context <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide complete details regarding the problem, including location, steps that caused it, and any previous attempts to resolve."
              rows={5}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: '#0f172a',
                color: '#f8fafc',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            backgroundColor: '#1e293b',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: 'transparent',
              color: '#94a3b8',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {/* Save as Draft Button */}
            {(!isEditMode || initialData?.status === 'DRAFT') && (
              <button
                type="button"
                onClick={() => handleSubmit(true, false)}
                disabled={loading}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#334155',
                  color: '#f8fafc',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Save size={16} />
                {loading ? 'Saving...' : 'Save as Draft'}
              </button>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={() => handleSubmit(false, true)}
              disabled={loading}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#6366f1',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Send size={16} />
              {loading ? 'Processing...' : isEditMode ? 'Resubmit Complaint' : 'Submit Complaint'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
