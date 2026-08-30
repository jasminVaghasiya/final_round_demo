import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userManagementApi } from '../api/userManagementApi';
import { useAuth } from '../context/AuthContext';
import {
  User as UserIcon,
  Mail,
  Phone,
  Building2,
  Shield,
  Calendar,
  Clock,
  Key,
  Ticket,
  Activity,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Eye,
  X,
} from 'lucide-react';

export const UserProfileView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'activity' | 'complaints'
  const [activityLogs, setActivityLogs] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch Core Profile Info
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await userManagementApi.getUserById(id);
      if (res.success && res.data?.user) {
        setUserProfile(res.data.user);
      }
    } catch (err) {
      setError(err.message || 'Failed to load user profile.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Activity Timeline
  const fetchActivity = async () => {
    try {
      setTabLoading(true);
      const res = await userManagementApi.getUserActivity(id);
      if (res.success && res.data?.activity) {
        setActivityLogs(res.data.activity);
      }
    } catch (err) {
      console.error('Failed to load activity:', err);
    } finally {
      setTabLoading(false);
    }
  };

  // Fetch Complaints List
  const fetchComplaints = async () => {
    try {
      setTabLoading(true);
      const res = await userManagementApi.getUserComplaints(id);
      if (res.success && res.data?.complaints) {
        setComplaints(res.data.complaints);
      }
    } catch (err) {
      console.error('Failed to load complaints:', err);
    } finally {
      setTabLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  useEffect(() => {
    if (activeTab === 'activity') fetchActivity();
    if (activeTab === 'complaints') fetchComplaints();
  }, [activeTab, id]);

  if (loading) {
    return (
      <div className="app-container">
        <div className="center-content">
          <div className="spinner" style={{ width: 40, height: 40 }} />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="app-container">
        <div className="center-content">
          <div className="card" style={{ textAlign: 'center' }}>
            <XCircle size={40} color="var(--error)" style={{ margin: '0 auto 1rem auto' }} />
            <h2>User Not Found</h2>
            <p className="subtitle">The requested user profile does not exist or you lack authorization.</p>
            <button className="btn btn-primary" onClick={() => navigate('/admin/users')}>
              Back to User Management
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div style={{ maxWidth: 1100, margin: '2rem auto', padding: '0 1.5rem', width: '100%', flex: 1 }}>
        <button className="btn btn-secondary" onClick={() => navigate('/admin/users')} style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          <ArrowLeft size={16} /> Back to User List
        </button>

        {/* Profile Header (Section 13 Spec) */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--border-focus)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 800,
              }}
            >
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: 0 }}>{userProfile.name}</h1>
                <span className="badge badge-admin">{userProfile.role}</span>
                {userProfile.status === 'ACTIVE' && <span className="badge badge-active">🟢 Active</span>}
                {userProfile.status === 'INACTIVE' && <span className="badge" style={{ backgroundColor: 'rgba(100,116,139,0.15)', color: '#94a3b8' }}>⚪ Inactive</span>}
                {userProfile.status === 'SUSPENDED' && <span className="badge badge-suspended">🔴 Suspended</span>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--border-focus)' }}>
                  ID: {userProfile.userId || `USR-${userProfile._id.slice(-4)}`}
                </span>
                <span>📧 {userProfile.email}</span>
                {userProfile.phone && <span>📞 {userProfile.phone}</span>}
                <span>🏢 {userProfile.departmentId?.name || 'Unassigned Department'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs (Section 14, 15, 16 Specs) */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('info')}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: 'var(--radius-md)',
              backgroundColor: activeTab === 'info' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'info' ? '#ffffff' : 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: 'var(--radius-md)',
              backgroundColor: activeTab === 'activity' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'activity' ? '#ffffff' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            <Activity size={16} /> Activity Timeline
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: 'var(--radius-md)',
              backgroundColor: activeTab === 'complaints' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'complaints' ? '#ffffff' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            <Ticket size={16} /> User Complaints
          </button>
        </div>

        {/* TAB 1: Profile Information (Section 14 Spec) */}
        {activeTab === 'info' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Personal Information Card */}
            <div className="card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Personal Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Full Name:</span>
                  <strong>{userProfile.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>User ID:</span>
                  <strong style={{ fontFamily: 'monospace' }}>{userProfile.userId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Gender:</span>
                  <strong>{userProfile.gender || 'Not specified'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Date of Birth:</span>
                  <strong>{userProfile.dob ? new Date(userProfile.dob).toLocaleDateString() : 'Not specified'}</strong>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Email Address:</span>
                  <strong>{userProfile.email}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Phone Number:</span>
                  <strong>{userProfile.phone || 'Not provided'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Alternate Phone:</span>
                  <strong>{userProfile.alternatePhone || 'None'}</strong>
                </div>
              </div>
            </div>

            {/* Organization Information Card */}
            <div className="card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Organization Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Role:</span>
                  <span className="badge badge-admin">{userProfile.role}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Department:</span>
                  <strong>{userProfile.departmentId?.name || 'Unassigned'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Designation:</span>
                  <strong>{userProfile.designation || 'Member'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Employee / Student ID:</span>
                  <strong>{userProfile.employeeStudentId || 'N/A'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Joined Date:</span>
                  <strong>{new Date(userProfile.createdAt).toLocaleDateString()}</strong>
                </div>
              </div>
            </div>

            {/* Security Information Card */}
            <div className="card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--primary)' }}>Security & Authentication</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>2FA Authentication:</span>
                  <strong>{userProfile.twoFactorEnabled ? 'Enabled' : 'Disabled'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Password Last Changed:</span>
                  <strong>{userProfile.passwordChangedAt ? new Date(userProfile.passwordChangedAt).toLocaleDateString() : 'N/A'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Failed Login Attempts:</span>
                  <strong>{userProfile.failedLoginAttempts || 0}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Account Lock Status:</span>
                  <strong style={{ color: userProfile.status === 'SUSPENDED' ? 'var(--error)' : 'var(--success)' }}>
                    {userProfile.status === 'SUSPENDED' ? 'Locked (Suspended)' : 'Unlocked'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Activity Timeline (Section 15 Spec) */}
        {activeTab === 'activity' && (
          <div className="card card-wide" style={{ maxWidth: 'none' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>User Activity Timeline</h3>
            {tabLoading ? (
              <div className="center-content" style={{ padding: '2rem' }}>
                <div className="spinner" style={{ width: 32, height: 32 }} />
              </div>
            ) : activityLogs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No activity records recorded for this user yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--border-color)' }}>
                {activityLogs.map((log) => (
                  <div key={log._id} style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '-1.95rem',
                        top: 2,
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)',
                        border: '2px solid var(--bg-card)',
                      }}
                    />
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', margin: '0.15rem 0' }}>
                      {log.action.replace('_', ' ')}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {log.description}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Performed by: {log.adminName || 'System Admin'} (IP: {log.ipAddress})
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: User Complaints (Section 16 Spec) */}
        {activeTab === 'complaints' && (
          <div className="card card-wide" style={{ maxWidth: 'none' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>Submitted Complaints</h3>
            {tabLoading ? (
              <div className="center-content" style={{ padding: '2rem' }}>
                <div className="spinner" style={{ width: 32, height: 32 }} />
              </div>
            ) : complaints.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <Ticket size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                <h4>No Complaints Found</h4>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>This user has not submitted any support complaints.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '0.75rem' }}>Complaint ID</th>
                    <th style={{ padding: '0.75rem' }}>Subject</th>
                    <th style={{ padding: '0.75rem' }}>Category</th>
                    <th style={{ padding: '0.75rem' }}>Priority</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem' }}>Submitted Date</th>
                    <th style={{ padding: '0.75rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((cmp) => (
                    <tr key={cmp._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--border-focus)' }}>
                        {cmp.complaintId}
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: 600 }}>{cmp.subject}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{cmp.category}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className="badge" style={{ backgroundColor: cmp.priority === 'High' || cmp.priority === 'Urgent' ? 'var(--error-light)' : 'var(--primary-light)', color: cmp.priority === 'High' || cmp.priority === 'Urgent' ? 'var(--error)' : 'var(--primary)' }}>
                          {cmp.priority}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className="badge badge-active">{cmp.status}</span>
                      </td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>
                        {new Date(cmp.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => setSelectedComplaint(cmp)}>
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* COMPLAINT DETAIL MODAL */}
      {selectedComplaint && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h3>Complaint Details ({selectedComplaint.complaintId})</h3>
              <button onClick={() => setSelectedComplaint(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div><strong>Subject:</strong> {selectedComplaint.subject}</div>
              <div><strong>Description:</strong> <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedComplaint.description}</p></div>
              <div><strong>Category:</strong> {selectedComplaint.category}</div>
              <div><strong>Priority:</strong> {selectedComplaint.priority}</div>
              <div><strong>Status:</strong> {selectedComplaint.status}</div>
              <div><strong>Submitted:</strong> {new Date(selectedComplaint.createdAt).toLocaleString()}</div>
            </div>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedComplaint(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
