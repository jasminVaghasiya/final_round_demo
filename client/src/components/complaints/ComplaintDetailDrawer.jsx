import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Edit2,
  Trash2,
  Clock,
  Building2,
  User,
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Check,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { complaintApi } from '../../api/complaintApi';
import { useAuth } from '../../context/AuthContext';

export const ComplaintDetailDrawer = ({
  complaintId,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onRefreshList,
}) => {
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chat message state
  const [newMessageText, setNewMessageText] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editMessageText, setEditMessageText] = useState('');
  const [editingLoading, setEditingLoading] = useState(false);

  // Active view tab: 'chat' | 'details'
  const [activeTab, setActiveTab] = useState('chat');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && complaintId) {
      fetchComplaintDetails();
    }
  }, [isOpen, complaintId]);

  useEffect(() => {
    // Scroll chat to bottom on new message
    if (activeTab === 'chat' && complaint?.messages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [complaint?.messages, activeTab]);

  const fetchComplaintDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await complaintApi.getComplaintById(complaintId);
      setComplaint(res.data);
    } catch (err) {
      setError(err.message || 'Failed to load complaint details');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMessageText.trim() || sendingMessage) return;

    try {
      setSendingMessage(true);
      const res = await complaintApi.addMessage(complaintId, newMessageText.trim());
      setComplaint(res.data);
      setNewMessageText('');
      if (onRefreshList) onRefreshList();
    } catch (err) {
      alert(err.message || 'Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const startEditMessage = (msg) => {
    setEditingMessageId(msg._id);
    setEditMessageText(msg.text);
  };

  const cancelEditMessage = () => {
    setEditingMessageId(null);
    setEditMessageText('');
  };

  const handleSaveEditMessage = async (messageId) => {
    if (!editMessageText.trim() || editingLoading) return;

    try {
      setEditingLoading(true);
      const res = await complaintApi.editMessage(complaintId, messageId, editMessageText.trim());
      setComplaint(res.data);
      setEditingMessageId(null);
      setEditMessageText('');
    } catch (err) {
      alert(err.message || 'Failed to update message');
    } finally {
      setEditingLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    let notes = '';
    if (newStatus === 'RESOLVED') {
      const promptVal = window.prompt('Enter resolution notes / remarks for this complaint:', 'Issue resolved successfully');
      if (promptVal === null) return;
      notes = promptVal;
    } else if (newStatus === 'REJECTED') {
      const promptVal = window.prompt('Enter reason for rejecting / not accepting this complaint:', 'Cannot accept this complaint');
      if (promptVal === null) return;
      notes = promptVal;
    } else {
      notes = `Status updated to ${newStatus}`;
    }

    try {
      setLoading(true);
      const res = await complaintApi.updateStatus(complaintId, { status: newStatus, notes });
      setComplaint(res.data);
      if (onRefreshList) onRefreshList();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const currentUserId = user?._id || user?.id;
  const isSubmitter = complaint && String(complaint.submittedBy?._id || complaint.submittedBy) === String(currentUserId);
  const isAdmin = ['ADMIN', 'SUPER_ADMIN', 'CREATOR', 'SYSTEM_SUPER_ADMIN'].includes(user?.role);
  const isManager = user?.role === 'MANAGER';
  const isTargetedPerson = complaint && String(complaint.targetedPerson?._id || complaint.targetedPerson) === String(currentUserId);
  const isAssigned = complaint && String(complaint.assignedTo?._id || complaint.assignedTo) === String(currentUserId);
  const isTargetedRole = complaint?.targetedRole && (
    user?.role === complaint.targetedRole ||
    (complaint.targetedRole === 'MANAGER' && ['MANAGER', 'HOD', 'ADMIN', 'SUPER_ADMIN'].includes(user?.role)) ||
    (complaint.targetedRole === 'HOD' && ['HOD', 'ADMIN', 'SUPER_ADMIN'].includes(user?.role)) ||
    (complaint.targetedRole === 'ADMIN' && ['ADMIN', 'SUPER_ADMIN'].includes(user?.role))
  );
  const isHodForDept = user?.role === 'HOD' && complaint?.departmentId && String(user?.departmentId?._id || user?.departmentId) === String(complaint.departmentId?._id || complaint.departmentId);
  const canUpdateStatus = isAdmin || isManager || isTargetedPerson || isAssigned || isTargetedRole || isHodForDept;
  // Edit & Delete are ONLY allowed for the original creator/submitter when in DRAFT status
  const canEditComplaint = isSubmitter && complaint?.status === 'DRAFT';
  const canDeleteComplaint = isSubmitter && complaint?.status === 'DRAFT';

  const getStatusBadge = (status) => {
    const config = {
      DRAFT: { label: 'Draft', bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8', border: '#cbd5e1' },
      OPEN: { label: 'Open / Pending', bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: '#93c5fd' },
      IN_PROGRESS: { label: 'In Progress', bg: 'rgba(234, 179, 8, 0.15)', color: '#eab308', border: '#fde047' },
      RESOLVED: { label: 'Resolved', bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: '#86efac' },
      REJECTED: { label: 'Rejected', bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '#fca5a5' },
      CLOSED: { label: 'Closed', bg: 'rgba(100, 116, 139, 0.15)', color: '#64748b', border: '#cbd5e1' },
    };
    const current = config[status] || config.OPEN;
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.25rem 0.625rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          backgroundColor: current.bg,
          color: current.color,
          border: `1px solid ${current.border}`,
        }}
      >
        {current.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const config = {
      LOW: { label: 'Low', color: '#10b981' },
      MEDIUM: { label: 'Medium', color: '#3b82f6' },
      HIGH: { label: 'High', color: '#f59e0b' },
      URGENT: { label: 'Urgent', color: '#ef4444' },
    };
    const current = config[priority] || config.MEDIUM;
    return (
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: current.color,
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          backgroundColor: `${current.color}15`,
        }}
      >
        {current.label} Priority
      </span>
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '840px',
          height: '100vh',
          backgroundColor: '#1e293b',
          borderLeft: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          animation: 'slideInRight 0.25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #334155',
            backgroundColor: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: '#818cf8', letterSpacing: '0.5px' }}>
                  {complaint?.complaintId || 'Complaint Details'}
                </span>
                {complaint && getStatusBadge(complaint.status)}
                {complaint && getPriorityBadge(complaint.priority)}
              </div>
              <h2
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#f8fafc',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '480px',
                }}
              >
                {complaint?.subject || 'Loading...'}
              </h2>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Complete Status Selector Dropdown (Authorities only for active complaints: OPEN, IN_PROGRESS, RESOLVED) */}
            {complaint && canUpdateStatus && !['DRAFT', 'CLOSED', 'REJECTED'].includes(complaint.status) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', backgroundColor: '#0f172a', padding: '0.2rem 0.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Status:</span>
                <select
                  value={complaint.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#f8fafc',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.3rem 0.4rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {complaint.status === 'OPEN' && (
                    <>
                      <option value="OPEN" style={{ backgroundColor: '#1e293b', color: '#60a5fa' }}>🔵 Open / Pending</option>
                      <option value="IN_PROGRESS" style={{ backgroundColor: '#1e293b', color: '#facc15' }}>🟡 Accept / In Progress</option>
                      <option value="REJECTED" style={{ backgroundColor: '#1e293b', color: '#f87171' }}>🔴 Reject</option>
                    </>
                  )}

                  {complaint.status === 'IN_PROGRESS' && (
                    <>
                      <option value="IN_PROGRESS" style={{ backgroundColor: '#1e293b', color: '#facc15' }}>🟡 In Progress (Accepted)</option>
                      <option value="RESOLVED" style={{ backgroundColor: '#1e293b', color: '#4ade80' }}>🟢 Resolve</option>
                      <option value="REJECTED" style={{ backgroundColor: '#1e293b', color: '#f87171' }}>🔴 Reject</option>
                      <option value="CLOSED" style={{ backgroundColor: '#1e293b', color: '#94a3b8' }}>⚪ Close</option>
                    </>
                  )}

                  {complaint.status === 'RESOLVED' && (
                    <>
                      <option value="RESOLVED" style={{ backgroundColor: '#1e293b', color: '#4ade80' }}>🟢 Resolved</option>
                      <option value="CLOSED" style={{ backgroundColor: '#1e293b', color: '#94a3b8' }}>⚪ Close</option>
                    </>
                  )}
                </select>
              </div>
            )}

            {/* Authority Status Quick Actions */}
            {complaint && canUpdateStatus && complaint.status !== 'DRAFT' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                {complaint.status === 'OPEN' && (
                  <button
                    onClick={() => handleUpdateStatus('IN_PROGRESS')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(234, 179, 8, 0.4)',
                      backgroundColor: 'rgba(234, 179, 8, 0.15)',
                      color: '#facc15',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    title="Accept and start working on this complaint"
                  >
                    Accept
                  </button>
                )}

                {['OPEN', 'IN_PROGRESS'].includes(complaint.status) && (
                  <button
                    onClick={() => handleUpdateStatus('RESOLVED')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      backgroundColor: 'rgba(34, 197, 94, 0.15)',
                      color: '#4ade80',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    title="Mark complaint as resolved"
                  >
                    <CheckCircle2 size={13} /> Resolve
                  </button>
                )}

                {['OPEN', 'IN_PROGRESS'].includes(complaint.status) && (
                  <button
                    onClick={() => handleUpdateStatus('REJECTED')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      backgroundColor: 'rgba(239, 68, 68, 0.15)',
                      color: '#f87171',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    title="Reject or decline this complaint"
                  >
                    Reject
                  </button>
                )}
              </div>
            )}

            {complaint && canEditComplaint && (
              <button
                onClick={() => onEdit(complaint)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#334155',
                  color: '#f8fafc',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                title="Edit draft complaint"
              >
                <Edit2 size={14} /> Edit
              </button>
            )}

            {complaint && canDeleteComplaint && (
              <button
                onClick={() => onDelete(complaint)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#fca5a5',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                title="Delete draft complaint"
              >
                <Trash2 size={14} /> Delete
              </button>
            )}

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
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #334155',
            backgroundColor: '#0f172a',
            padding: '0 1.5rem',
          }}
        >
          <button
            onClick={() => setActiveTab('chat')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: activeTab === 'chat' ? '#818cf8' : '#94a3b8',
              borderBottom: activeTab === 'chat' ? '2px solid #6366f1' : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <MessageSquare size={16} />
            Discussion & Chat ({complaint?.messages?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab('details')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: activeTab === 'details' ? '#818cf8' : '#94a3b8',
              borderBottom: activeTab === 'details' ? '2px solid #6366f1' : '2px solid transparent',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FileText size={16} />
            Overview & Status History
          </button>
        </div>

        {/* Content Body */}
        {loading ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            Loading details...
          </div>
        ) : error ? (
          <div style={{ flex: 1, padding: '2rem', textAlign: 'center', color: '#ef4444' }}>{error}</div>
        ) : complaint ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* TAB 1: Chat Discussion */}
            {activeTab === 'chat' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                {/* Summary Info Banner inside chat for quick context */}
                <div
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#1e293b',
                    borderBottom: '1px solid #334155',
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: '#f8fafc' }}>Sent by:</span>
                    <span>{complaint.submittedBy?.name || 'User'}</span>
                    <span style={{ color: '#64748b' }}>({complaint.submittedBy?.role || 'Employee'})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: '#f8fafc' }}>Target:</span>
                    <span>{complaint.targetedPerson?.name || `${complaint.targetedRole} Authority`}</span>
                    {complaint.departmentId && (
                      <span style={{ color: '#818cf8' }}>({complaint.departmentId.name})</span>
                    )}
                  </div>
                </div>

                {/* Messages Feed */}
                <div
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    backgroundColor: '#0f172a',
                  }}
                >
                  {/* Initial Complaint Description Bubble as first item */}
                  <div
                    style={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '10px',
                      padding: '1rem',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(99, 102, 241, 0.2)',
                            color: '#818cf8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        >
                          {complaint.submittedBy?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#f8fafc' }}>
                            {complaint.submittedBy?.name} (Original Request)
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '0.5rem' }}>
                            {new Date(complaint.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', backgroundColor: '#0f172a', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {complaint.category}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#f8fafc', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                      {complaint.description}
                    </div>
                  </div>

                  {/* Dynamic Chat Messages */}
                  {complaint.messages && complaint.messages.length > 0 ? (
                    complaint.messages.map((msg) => {
                      const msgSenderId = msg.sender?._id || msg.sender;
                      const isMe = String(msgSenderId) === String(currentUserId);
                      const isEditingThis = editingMessageId === msg._id;

                      return (
                        <div
                          key={msg._id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '85%',
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                          }}
                        >
                          {/* Message Header (Sender name, role, time) */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.375rem',
                              marginBottom: '0.25rem',
                              fontSize: '0.75rem',
                              color: '#94a3b8',
                            }}
                          >
                            <span style={{ fontWeight: 600, color: isMe ? '#818cf8' : '#f8fafc' }}>
                              {isMe ? 'You' : msg.sender?.name || 'User'}
                            </span>
                            {!isMe && msg.sender?.role && (
                              <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.35rem', borderRadius: '3px', backgroundColor: '#334155', color: '#cbd5e1' }}>
                                {msg.sender.role}
                              </span>
                            )}
                            <span>•</span>
                            <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

                            {/* Edited Tag */}
                            {msg.isEdited && (
                              <span
                                style={{
                                  fontSize: '0.7rem',
                                  color: '#64748b',
                                  fontStyle: 'italic',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '2px',
                                }}
                                title={`Edited by ${msg.editedBy?.name || 'author'} at ${new Date(msg.editedAt).toLocaleString()}`}
                              >
                                (edited)
                              </span>
                            )}

                            {/* Edit Action Button for Author */}
                            {(isMe || isAdmin) && !isEditingThis && (
                              <button
                                onClick={() => startEditMessage(msg)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: '#94a3b8',
                                  padding: '0 0.25rem',
                                  fontSize: '0.7rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                title="Edit this message"
                              >
                                <Edit2 size={12} />
                              </button>
                            )}
                          </div>

                          {/* Message Body or Inline Editor */}
                          {isEditingThis ? (
                            <div
                              style={{
                                width: '100%',
                                minWidth: '280px',
                                backgroundColor: '#1e293b',
                                border: '1px solid #6366f1',
                                borderRadius: '10px',
                                padding: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                              }}
                            >
                              <textarea
                                value={editMessageText}
                                onChange={(e) => setEditMessageText(e.target.value)}
                                rows={2}
                                style={{
                                  width: '100%',
                                  padding: '0.5rem',
                                  borderRadius: '6px',
                                  border: '1px solid #334155',
                                  backgroundColor: '#0f172a',
                                  color: '#f8fafc',
                                  fontSize: '0.875rem',
                                  outline: 'none',
                                  resize: 'vertical',
                                }}
                              />
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.375rem', marginTop: '0.375rem' }}>
                                <button
                                  type="button"
                                  onClick={cancelEditMessage}
                                  disabled={editingLoading}
                                  style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '6px',
                                    border: '1px solid #334155',
                                    backgroundColor: 'transparent',
                                    color: '#94a3b8',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveEditMessage(msg._id)}
                                  disabled={editingLoading}
                                  style={{
                                    padding: '0.25rem 0.625rem',
                                    borderRadius: '6px',
                                    border: 'none',
                                    backgroundColor: '#6366f1',
                                    color: '#ffffff',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                  }}
                                >
                                  <Check size={12} /> Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                padding: '0.75rem 1rem',
                                borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                backgroundColor: isMe ? '#4f46e5' : '#1e293b',
                                color: '#ffffff',
                                border: isMe ? 'none' : '1px solid #334155',
                                fontSize: '0.875rem',
                                lineHeight: 1.5,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              {msg.text}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                      <Sparkles size={24} style={{ margin: '0 auto 0.5rem auto', color: '#818cf8', opacity: 0.8 }} />
                      No conversation yet. Send a message below to start communicating.
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={handleSendMessage}
                  style={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid #334155',
                    backgroundColor: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <input
                    type="text"
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    placeholder="Type a message or update on this complaint..."
                    disabled={sendingMessage}
                    style={{
                      flex: 1,
                      padding: '0.625rem 1rem',
                      borderRadius: '9999px',
                      border: '1px solid #334155',
                      backgroundColor: '#0f172a',
                      color: '#f8fafc',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />

                  <button
                    type="submit"
                    disabled={sendingMessage || !newMessageText.trim()}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: newMessageText.trim() ? '#6366f1' : '#334155',
                      color: newMessageText.trim() ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: newMessageText.trim() && !sendingMessage ? 'pointer' : 'not-allowed',
                      transition: 'all 0.15s ease',
                      flexShrink: 0,
                    }}
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: Full Overview & Status Timeline */}
            {activeTab === 'details' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: '#0f172a' }}>
                {/* 1. Key Info Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {/* Sender Info */}
                  <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      <User size={14} color="#818cf8" /> Submitted By
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
                      {complaint.submittedBy?.name || 'N/A'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{complaint.submittedBy?.email}</div>
                    <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600, marginTop: '0.25rem' }}>
                      Role: {complaint.submittedBy?.role}
                    </div>
                  </div>

                  {/* Department Info */}
                  <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      <Building2 size={14} color="#818cf8" /> Department
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
                      {complaint.departmentId?.name || 'General / Unassigned'}
                    </div>
                    {complaint.departmentId?.code && (
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Code: {complaint.departmentId.code}
                      </div>
                    )}
                  </div>

                  {/* Targeted Authority */}
                  <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '10px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      <Shield size={14} color="#818cf8" /> Targeted Authority
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
                      {complaint.targetedPerson?.name || `${complaint.targetedRole} Authority`}
                    </div>
                    {complaint.targetedPerson?.email && (
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{complaint.targetedPerson.email}</div>
                    )}
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                      Target Role: {complaint.targetedRole}
                    </div>
                  </div>
                </div>

                {/* 2. Full Description */}
                <div style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '10px', border: '1px solid #334155' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
                    Complaint Description
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {complaint.description}
                  </div>
                </div>

                {/* 3. Resolution Notes (if any) */}
                {complaint.resolutionNotes && (
                  <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#4ade80', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <CheckCircle2 size={16} /> Official Resolution Notes
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#f8fafc', lineHeight: 1.5 }}>
                      {complaint.resolutionNotes}
                    </div>
                  </div>
                )}

                {/* 4. Complete Status History Timeline */}
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} color="#818cf8" /> Complete Status History & Audit Trail
                  </h3>

                  <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                    {/* Vertical Line */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '7px',
                        top: '10px',
                        bottom: '10px',
                        width: '2px',
                        backgroundColor: '#334155',
                      }}
                    />

                    {complaint.statusHistory && complaint.statusHistory.length > 0 ? (
                      complaint.statusHistory.map((item, idx) => (
                        <div key={idx} style={{ position: 'relative', marginBottom: '1.25rem' }}>
                          {/* Dot */}
                          <div
                            style={{
                              position: 'absolute',
                              left: '-1.5rem',
                              top: '2px',
                              width: '16px',
                              height: '16px',
                              borderRadius: '50%',
                              backgroundColor: idx === complaint.statusHistory.length - 1 ? '#6366f1' : '#1e293b',
                              border: `2px solid ${idx === complaint.statusHistory.length - 1 ? '#6366f1' : '#334155'}`,
                            }}
                          />

                          <div style={{ backgroundColor: '#1e293b', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #334155' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>
                                {item.status}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                {new Date(item.changedAt).toLocaleString()}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                              {item.notes || 'Status updated'}
                            </div>
                            {item.changedBy && (
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                By: {item.changedBy.name || 'System'} ({item.changedBy.role || 'Staff'})
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No status changes recorded yet.</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
