import React, { useState, useEffect } from 'react';
import { Bell, X, Check, CheckCircle2, MessageSquare, AlertCircle, Clock, Building2, User } from 'lucide-react';
import { complaintApi } from '../../api/complaintApi';

export const ComplaintNotificationModal = ({ isOpen, onClose, onSelectComplaint, onActionCompleted }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadPendingComplaints();
    }
  }, [isOpen]);

  const loadPendingComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await complaintApi.getComplaints({ viewScope: 'arrived', status: 'OPEN' });
      setComplaints(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (complaintId) => {
    try {
      await complaintApi.updateStatus(complaintId, { status: 'IN_PROGRESS', notes: 'Accepted by authority' });
      loadPendingComplaints();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      alert(err.message || 'Failed to accept complaint');
    }
  };

  const handleReject = async (complaintId) => {
    const reason = window.prompt('Enter reason for rejecting this complaint:', 'Cannot accept this complaint');
    if (reason === null) return;
    try {
      await complaintApi.updateStatus(complaintId, { status: 'REJECTED', notes: reason });
      loadPendingComplaints();
      if (onActionCompleted) onActionCompleted();
    } catch (err) {
      alert(err.message || 'Failed to reject complaint');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0f172a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bell size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Arrived Complaints Notifications
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                Review, Accept or Reject incoming requests from other members
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '6px',
              display: 'flex',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              Loading notifications...
            </div>
          ) : error ? (
            <div style={{ color: '#ef4444', textAlign: 'center', padding: '1.5rem' }}>{error}</div>
          ) : complaints.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                }}
              >
                <CheckCircle2 size={26} />
              </div>
              <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1rem', marginBottom: '0.25rem' }}>
                All caught up!
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                No pending arrived complaints requiring your action right now.
              </div>
            </div>
          ) : (
            complaints.map((c) => (
              <div
                key={c._id}
                style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '10px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#818cf8' }}>{c.complaintId}</span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(59, 130, 246, 0.15)',
                          color: '#3b82f6',
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                        }}
                      >
                        {c.category}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#f8fafc' }}>{c.subject}</div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#f59e0b',
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c.priority} Priority
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '0.825rem',
                    color: '#94a3b8',
                    margin: 0,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {c.description}
                </p>

                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <span>
                    Sender: <strong style={{ color: '#cbd5e1' }}>{c.submittedBy?.name || 'User'}</strong> ({c.submittedBy?.role})
                  </span>
                  <span>
                    Dept: <strong style={{ color: '#cbd5e1' }}>{c.departmentId?.name || 'General'}</strong>
                  </span>
                </div>

                {/* Actions Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.5rem',
                    marginTop: '0.25rem',
                    borderTop: '1px solid #1e293b',
                    paddingTop: '0.75rem',
                  }}
                >
                  {/* Accept Button */}
                  <button
                    onClick={() => handleAccept(c._id)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      backgroundColor: 'rgba(34, 197, 94, 0.15)',
                      color: '#4ade80',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Check size={14} /> Accept
                  </button>

                  {/* Reject Button */}
                  <button
                    onClick={() => handleReject(c._id)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      color: '#f87171',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <X size={14} /> Reject
                  </button>

                  {/* Open details / chat */}
                  <button
                    onClick={() => {
                      onClose();
                      if (onSelectComplaint) onSelectComplaint(c._id);
                    }}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid #334155',
                      backgroundColor: '#334155',
                      color: '#f8fafc',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <MessageSquare size={14} /> Review & Chat
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
