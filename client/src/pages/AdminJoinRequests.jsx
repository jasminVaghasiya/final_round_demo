import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { joinRequestApi } from '../api/joinRequestApi';
import { useAuth } from '../context/AuthContext';
import { Users, CheckCircle2, XCircle, Clock, Filter, ArrowLeft, AlertCircle, Building2, Shield } from 'lucide-react';

export const AdminJoinRequests = () => {
  const navigate = useNavigate();
  const { user, company } = useAuth();

  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Selected Modal States
  const [approveModalReq, setApproveModalReq] = useState(null);
  const [selectedRole, setSelectedRole] = useState('EMPLOYEE');
  const [actionLoading, setActionLoading] = useState(false);

  const [rejectModalReq, setRejectModalReq] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await joinRequestApi.getAdminRequests(filter);
      if (res.success && res.data?.requests) {
        setRequests(res.data.requests);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch join requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  // Handle Approve Submission
  const handleApprove = async () => {
    if (!approveModalReq) return;
    try {
      setActionLoading(true);
      const res = await joinRequestApi.approveRequest(approveModalReq._id, selectedRole);
      if (res.success) {
        setApproveModalReq(null);
        fetchRequests();
      }
    } catch (err) {
      alert(err.message || 'Approval failed');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Reject Submission
  const handleReject = async () => {
    if (!rejectModalReq) return;
    try {
      setActionLoading(true);
      const res = await joinRequestApi.rejectRequest(rejectModalReq._id, rejectionReason);
      if (res.success) {
        setRejectModalReq(null);
        setRejectionReason('');
        fetchRequests();
      }
    } catch (err) {
      alert(err.message || 'Rejection failed');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <header style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Building2 size={24} color="var(--primary)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{company?.name || 'HelpDesk+'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin Governance Console</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.4rem 0.875rem', fontSize: '0.85rem' }}>
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1000, margin: '2rem auto', padding: '0 1rem', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>Join Requests Management</h1>
            <p className="subtitle" style={{ marginBottom: 0 }}>Review and manage pending employee access requests for your company</p>
          </div>

          {/* Status Filter Tabs (Section 14 Spec) */}
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-card)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: '0.4rem 0.875rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: filter === tab ? 'var(--primary)' : 'transparent',
                  color: filter === tab ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <div>{error}</div>
          </div>
        )}

        {/* Requests List */}
        {loading ? (
          <div className="center-content" style={{ padding: '4rem 0' }}>
            <div className="spinner" style={{ width: 36, height: 36 }} />
          </div>
        ) : requests.length === 0 ? (
          <div className="card card-wide" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <Users size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
            <h3>No Join Requests Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              There are currently no {filter !== 'ALL' ? filter.toLowerCase() : ''} requests for your company.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {requests.map((req) => (
              <div
                key={req._id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      {req.userId?.name || 'Applicant User'}
                    </div>
                    <span
                      className={
                        req.status === 'APPROVED'
                          ? 'badge badge-approved'
                          : req.status === 'REJECTED'
                          ? 'badge badge-rejected'
                          : 'badge badge-pending'
                      }
                    >
                      {req.status}
                    </span>
                  </div>

                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div>📧 {req.userId?.email}</div>
                    {req.userId?.phone && <div>📞 {req.userId.phone}</div>}
                    <div>Requested Role: <strong style={{ color: 'var(--text-primary)' }}>{req.requestedRole}</strong></div>
                    {req.message && (
                      <div style={{ fontStyle: 'italic', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                        "{req.message}"
                      </div>
                    )}
                    {req.rejectionReason && (
                      <div style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                        Rejection Reason: {req.rejectionReason}
                      </div>
                    )}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.375rem' }}>
                      Requested: {new Date(req.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {req.status === 'PENDING' && (
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setApproveModalReq(req);
                        setSelectedRole('EMPLOYEE');
                      }}
                    >
                      <CheckCircle2 size={16} /> Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setRejectModalReq(req);
                        setRejectionReason('');
                      }}
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* APPROVE MODAL (Section 15 Spec) */}
      {approveModalReq && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 style={{ marginBottom: '0.5rem' }}>Approve Join Request?</h2>
            <p className="subtitle">Select the user's role and permissions within {company?.name}</p>

            <div style={{ backgroundColor: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>APPLICANT</div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {approveModalReq.userId?.name} ({approveModalReq.userId?.email})
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="roleSelect">Assign Role *</label>
              <select
                id="roleSelect"
                className="form-input"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="EMPLOYEE">Employee (Standard Access)</option>
                <option value="MANAGER">Manager (Team Management)</option>
                <option value="HOD">Head of Department (HOD)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setApproveModalReq(null)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={handleApprove}
                disabled={actionLoading}
              >
                {actionLoading ? <div className="spinner" /> : <><CheckCircle2 size={18} /> Confirm Approve</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL (Section 16 Spec) */}
      {rejectModalReq && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 style={{ marginBottom: '0.5rem', color: 'var(--error)' }}>Reject Join Request</h2>
            <p className="subtitle">Provide a reason for rejecting this access request</p>

            <div style={{ backgroundColor: 'var(--bg-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>APPLICANT</div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {rejectModalReq.userId?.name} ({rejectModalReq.userId?.email})
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rejectionReason">Reason for Rejection</label>
              <textarea
                id="rejectionReason"
                className="form-input"
                rows="3"
                placeholder="e.g. Not an active employee in our registry..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
              <button
                className="btn btn-secondary"
                onClick={() => setRejectModalReq(null)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleReject}
                disabled={actionLoading}
              >
                {actionLoading ? <div className="spinner" /> : <><XCircle size={18} /> Confirm Reject</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
