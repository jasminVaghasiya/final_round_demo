import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  Plus,
  Search,
  Filter,
  MessageSquare,
  Edit2,
  Trash2,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileEdit,
  RefreshCw,
  Building2,
  User,
  Flag,
  Inbox,
  Bell,
} from 'lucide-react';
import { complaintApi } from '../api/complaintApi';
import { departmentApi } from '../api/departmentApi';
import { useAuth } from '../context/AuthContext';
import { ComplaintFormModal } from '../components/complaints/ComplaintFormModal';
import { ComplaintDetailDrawer } from '../components/complaints/ComplaintDetailDrawer';
import { ComplaintNotificationModal } from '../components/complaints/ComplaintNotificationModal';

export const MyComplaints = ({ initialScope = 'my' }) => {
  const { user } = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [scopeTab, setScopeTab] = useState(initialScope); // 'my' | 'arrived' | 'all'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  // Sync when navigating between /my-complaints and /arrived-complaints
  useEffect(() => {
    setScopeTab(initialScope);
  }, [initialScope]);

  // Modals & Drawers state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [activeDrawerComplaintId, setActiveDrawerComplaintId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  useEffect(() => {
    loadDepartments();
    loadComplaints();
  }, [scopeTab, statusFilter, priorityFilter, departmentFilter]);

  const loadDepartments = async () => {
    try {
      const res = await departmentApi.getDepartments();
      const list =
        (Array.isArray(res?.data?.departments) && res.data.departments) ||
        (Array.isArray(res?.departments) && res.departments) ||
        (Array.isArray(res?.data) && res.data) ||
        (Array.isArray(res) && res) ||
        [];
      setDepartments(list);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        viewScope: scopeTab,
        status: statusFilter !== 'ALL' ? statusFilter : undefined,
        priority: priorityFilter !== 'ALL' ? priorityFilter : undefined,
        departmentId: departmentFilter !== 'ALL' ? departmentFilter : undefined,
        search: search.trim() || undefined,
      };

      const res = await complaintApi.getComplaints(params);
      setComplaints(res.data || []);
      if (res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      setError(err.message || 'Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadComplaints();
  };

  const handleOpenCreateModal = () => {
    setEditingComplaint(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (complaint) => {
    setEditingComplaint(complaint);
    setIsFormModalOpen(true);
  };

  const handleTableStatusChange = async (complaintId, newStatus) => {
    let notes = '';
    if (newStatus === 'RESOLVED') {
      const promptVal = window.prompt('Enter resolution notes / remarks for this complaint:', 'Resolved successfully');
      if (promptVal === null) return;
      notes = promptVal;
    } else if (newStatus === 'REJECTED') {
      const promptVal = window.prompt('Enter reason for rejecting this complaint:', 'Cannot accept this complaint');
      if (promptVal === null) return;
      notes = promptVal;
    } else {
      notes = `Status changed to ${newStatus}`;
    }

    try {
      await complaintApi.updateStatus(complaintId, { status: newStatus, notes });
      loadComplaints();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleOpenDrawer = (complaintId) => {
    setActiveDrawerComplaintId(complaintId);
    setIsDrawerOpen(true);
  };

  const handleDeleteComplaint = async (complaint) => {
    if (complaint.status !== 'DRAFT' && !['ADMIN', 'SUPER_ADMIN'].includes(user?.role)) {
      alert('Only draft complaints can be deleted.');
      return;
    }

    if (window.confirm(`Are you sure you want to permanently delete draft complaint "${complaint.subject}"?`)) {
      try {
        await complaintApi.deleteComplaint(complaint._id);
        if (isDrawerOpen && activeDrawerComplaintId === complaint._id) {
          setIsDrawerOpen(false);
        }
        loadComplaints();
      } catch (err) {
        alert(err.message || 'Failed to delete complaint');
      }
    }
  };

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
      LOW: { color: '#10b981' },
      MEDIUM: { color: '#3b82f6' },
      HIGH: { color: '#f59e0b' },
      URGENT: { color: '#ef4444' },
    };
    const current = config[priority] || config.MEDIUM;
    return (
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: current.color,
          padding: '0.2rem 0.5rem',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: `${current.color}15`,
          border: `1px solid ${current.color}30`,
        }}
      >
        {priority}
      </span>
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Top Title & Action Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {scopeTab === 'arrived' ? <Inbox size={22} /> : <LifeBuoy size={22} />}
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {scopeTab === 'arrived' ? 'Arrived / Incoming Complaints' : 'My Complaints & Support Tickets'}
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: '0.375rem 0 0 0' }}>
            {scopeTab === 'arrived'
              ? 'Complaints and issues submitted by other company members to you, your department, or role.'
              : 'Manage complaints you raised, track resolution timelines, and chat with assigned authorities.'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Clickable Notifications Button (Only displayed on Arrived Complaints page) */}
          {scopeTab === 'arrived' && (
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
              }}
              title="View Arrived Complaints Notifications"
            >
              <Bell size={17} color="#ef4444" />
              <span>Notifications</span>
              {stats.open > 0 && (
                <span
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    padding: '0.1rem 0.45rem',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                  }}
                >
                  {stats.open}
                </span>
              )}
            </button>
          )}

          {scopeTab === 'my' && (
            <button
              onClick={handleOpenCreateModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.15s ease',
              }}
            >
              <Plus size={18} />
              New Complaint
            </button>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <div
          onClick={() => setStatusFilter('ALL')}
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: statusFilter === 'ALL' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Complaints</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {stats.total}
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('DRAFT')}
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: statusFilter === 'DRAFT' ? '2px solid #94a3b8' : '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Drafts</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {stats.draft}
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('OPEN')}
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: statusFilter === 'OPEN' ? '2px solid #3b82f6' : '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#3b82f6' }}>Open / Submitted</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {stats.open}
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('IN_PROGRESS')}
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: statusFilter === 'IN_PROGRESS' ? '2px solid #eab308' : '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#eab308' }}>In Progress</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {stats.inProgress}
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('RESOLVED')}
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: statusFilter === 'RESOLVED' ? '2px solid #22c55e' : '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#22c55e' }}>Resolved</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {stats.resolved}
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('REJECTED')}
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: statusFilter === 'REJECTED' ? '2px solid #ef4444' : '1px solid var(--border-color)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef4444' }}>Not Accepted / Rejected</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {stats.rejected}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <form
          onSubmit={handleSearchSubmit}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '260px' }}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, subject, or description..."
              style={{
                width: '100%',
                padding: '0.625rem 1rem 0.625rem 2.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-main)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '0.625rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Search
          </button>
        </form>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="OPEN">Open / Submitted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected / Not Accepted</option>
            <option value="CLOSED">Closed</option>
          </select>

          {/* Priority Dropdown */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="ALL">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          {/* Department Dropdown */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            style={{
              padding: '0.625rem 0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="ALL">All Departments</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>

          <button
            onClick={loadComplaints}
            style={{
              padding: '0.625rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Refresh List"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Tabular Formatted Complaints View */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading complaints...
          </div>
        ) : error ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--error)' }}>{error}</div>
        ) : complaints.length === 0 ? (
          <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
            <LifeBuoy size={42} style={{ margin: '0 auto 1rem auto', color: 'var(--text-muted)', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              No Complaints Found
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0.5rem 0 1.25rem 0' }}>
              You don't have any complaints matching the selected filters.
            </p>
            <button
              onClick={handleOpenCreateModal}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Raise a New Complaint
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: 'var(--bg-main)',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.5px',
                  }}
                >
                  <th style={{ padding: '0.875rem 1.25rem', fontWeight: 700 }}>Complaint ID</th>
                  <th style={{ padding: '0.875rem 1.25rem', fontWeight: 700 }}>Subject & Category</th>
                  <th style={{ padding: '0.875rem 1.25rem', fontWeight: 700 }}>Department</th>
                  <th style={{ padding: '0.875rem 1.25rem', fontWeight: 700 }}>Targeted Authority</th>
                  <th style={{ padding: '0.875rem 1.25rem', fontWeight: 700 }}>Priority</th>
                  <th style={{ padding: '0.875rem 1.25rem', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '0.875rem 1.25rem', fontWeight: 700 }}>Created Date</th>
                  <th style={{ padding: '0.875rem 1.25rem', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => {
                  const currentUserId = user?._id || user?.id;
                  const isSubmitter = String(c.submittedBy?._id || c.submittedBy) === String(currentUserId);
                  const isTargetedRole = c.targetedRole && (
                    user?.role === c.targetedRole ||
                    (c.targetedRole === 'MANAGER' && ['MANAGER', 'HOD', 'ADMIN', 'SUPER_ADMIN'].includes(user?.role)) ||
                    (c.targetedRole === 'HOD' && ['HOD', 'ADMIN', 'SUPER_ADMIN'].includes(user?.role)) ||
                    (c.targetedRole === 'ADMIN' && ['ADMIN', 'SUPER_ADMIN'].includes(user?.role))
                  );
                  const isAuthority =
                    ['MANAGER', 'HOD', 'ADMIN', 'SUPER_ADMIN', 'CREATOR', 'SYSTEM_SUPER_ADMIN'].includes(user?.role) ||
                    String(c.targetedPerson?._id || c.targetedPerson) === String(currentUserId) ||
                    String(c.assignedTo?._id || c.assignedTo) === String(currentUserId) ||
                    isTargetedRole;
                  const isDraft = c.status === 'DRAFT';
                  const isRejected = c.status === 'REJECTED';
                  const canEdit = isSubmitter && isDraft;
                  const canDelete = isSubmitter && isDraft;
                  const messageCount = c.messages?.length || 0;

                  return (
                    <tr
                      key={c._id}
                      style={{
                        borderBottom: '1px solid var(--border-color)',
                        transition: 'background-color 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-main)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {/* 1. ID */}
                      <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                        <button
                          onClick={() => handleOpenDrawer(c._id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 800,
                            fontSize: '0.875rem',
                            color: 'var(--primary)',
                            padding: 0,
                            textAlign: 'left',
                          }}
                        >
                          {c.complaintId}
                        </button>
                      </td>

                      {/* 2. Subject & Description */}
                      <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle', maxWidth: '280px' }}>
                        <div
                          onClick={() => handleOpenDrawer(c._id)}
                          style={{
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={c.subject}
                        >
                          {c.subject}
                        </div>
                        <div
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            gap: '0.5rem',
                            marginTop: '0.2rem',
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: 'var(--bg-secondary)',
                              padding: '0.1rem 0.4rem',
                              borderRadius: '4px',
                              fontWeight: 600,
                            }}
                          >
                            {c.category}
                          </span>
                        </div>
                      </td>

                      {/* 3. Department */}
                      <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                          <Building2 size={14} color="var(--primary)" />
                          <span>{c.departmentId?.name || 'General / None'}</span>
                        </div>
                      </td>

                      {/* 4. Targeted Authority */}
                      <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                          <User size={14} color="var(--text-muted)" />
                          <span>{c.targetedPerson?.name || `${c.targetedRole} Authority`}</span>
                        </div>
                      </td>

                      {/* 5. Priority */}
                      <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                        {getPriorityBadge(c.priority)}
                      </td>

                      {/* 6. Status (Dropdown ONLY for authorities; static badge for regular users and finalized statuses) */}
                      <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle' }}>
                        {!isAuthority || ['DRAFT', 'CLOSED', 'REJECTED'].includes(c.status) ? (
                          getStatusBadge(c.status)
                        ) : (
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <select
                              value={c.status}
                              onChange={(e) => handleTableStatusChange(c._id, e.target.value)}
                              style={{
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                padding: '0.25rem 1.75rem 0.25rem 0.625rem',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                border:
                                  c.status === 'OPEN'
                                    ? '1px solid #93c5fd'
                                    : c.status === 'IN_PROGRESS'
                                    ? '1px solid #fde047'
                                    : '1px solid #86efac',
                                backgroundColor:
                                  c.status === 'OPEN'
                                    ? 'rgba(59, 130, 246, 0.15)'
                                    : c.status === 'IN_PROGRESS'
                                    ? 'rgba(234, 179, 8, 0.15)'
                                    : 'rgba(34, 197, 94, 0.15)',
                                color:
                                  c.status === 'OPEN'
                                    ? '#3b82f6'
                                    : c.status === 'IN_PROGRESS'
                                    ? '#eab308'
                                    : '#22c55e',
                                cursor: 'pointer',
                                outline: 'none',
                              }}
                              title="Click to update status"
                            >
                              {c.status === 'OPEN' && (
                                <>
                                  <option value="OPEN" style={{ backgroundColor: '#1e293b', color: '#60a5fa' }}>Open / Pending</option>
                                  <option value="IN_PROGRESS" style={{ backgroundColor: '#1e293b', color: '#facc15' }}>Accept / In Progress</option>
                                  <option value="REJECTED" style={{ backgroundColor: '#1e293b', color: '#f87171' }}>Reject</option>
                                </>
                              )}

                              {c.status === 'IN_PROGRESS' && (
                                <>
                                  <option value="IN_PROGRESS" style={{ backgroundColor: '#1e293b', color: '#facc15' }}>In Progress (Accepted)</option>
                                  <option value="RESOLVED" style={{ backgroundColor: '#1e293b', color: '#4ade80' }}>Resolve</option>
                                  <option value="REJECTED" style={{ backgroundColor: '#1e293b', color: '#f87171' }}>Reject</option>
                                  <option value="CLOSED" style={{ backgroundColor: '#1e293b', color: '#94a3b8' }}>Close</option>
                                </>
                              )}

                              {c.status === 'RESOLVED' && (
                                <>
                                  <option value="RESOLVED" style={{ backgroundColor: '#1e293b', color: '#4ade80' }}>Resolved</option>
                                  <option value="CLOSED" style={{ backgroundColor: '#1e293b', color: '#94a3b8' }}>Close</option>
                                </>
                              )}
                            </select>
                            <span
                              style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                                fontSize: '0.65rem',
                                color: 'inherit',
                                opacity: 0.8,
                              }}
                            >
                              ▼
                            </span>
                          </div>
                        )}
                      </td>

                      {/* 7. Date */}
                      <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>

                      {/* 8. Actions (Right-hand side) */}
                      <td style={{ padding: '1rem 1.25rem', verticalAlign: 'middle', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          {/* Chat & Details Button */}
                          <button
                            onClick={() => handleOpenDrawer(c._id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.375rem',
                              padding: '0.45rem 0.75rem',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--border-color)',
                              backgroundColor: 'var(--bg-main)',
                              color: 'var(--text-primary)',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              position: 'relative',
                            }}
                            title="Open Chat & Timeline"
                          >
                            <MessageSquare size={14} color="var(--primary)" />
                            <span>Chat</span>
                            {messageCount > 0 && (
                              <span
                                style={{
                                  backgroundColor: 'var(--primary)',
                                  color: '#ffffff',
                                  borderRadius: '9999px',
                                  fontSize: '0.65rem',
                                  padding: '0.1rem 0.4rem',
                                  fontWeight: 700,
                                }}
                              >
                                {messageCount}
                              </span>
                            )}
                          </button>

                          {/* Edit & Delete: ONLY shown for original Submitter when complaint is in DRAFT */}
                          {isSubmitter && isDraft && (
                            <>
                              {/* Edit Button (Enabled only if DRAFT) */}
                              <button
                                onClick={() => handleOpenEditModal(c)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 32,
                                  height: 32,
                                  borderRadius: 'var(--radius-md)',
                                  border: '1px solid var(--border-color)',
                                  backgroundColor: 'var(--bg-main)',
                                  color: 'var(--text-primary)',
                                  cursor: 'pointer',
                                }}
                                title="Edit draft complaint"
                              >
                                <Edit2 size={14} />
                              </button>

                              {/* Delete Button (Enabled only if DRAFT) */}
                              <button
                                onClick={() => handleDeleteComplaint(c)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 32,
                                  height: 32,
                                  borderRadius: 'var(--radius-md)',
                                  border: '1px solid rgba(239, 68, 68, 0.2)',
                                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                                  color: 'var(--error)',
                                  cursor: 'pointer',
                                }}
                                title="Delete draft complaint"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <ComplaintFormModal
        isOpen={isFormModalOpen}
        initialData={editingComplaint}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={() => {
          loadComplaints();
          if (isDrawerOpen && activeDrawerComplaintId) {
            // refresh drawer if same item was edited
            setActiveDrawerComplaintId(activeDrawerComplaintId);
          }
        }}
      />

      {/* Detail & Chat Drawer */}
      <ComplaintDetailDrawer
        isOpen={isDrawerOpen}
        complaintId={activeDrawerComplaintId}
        onClose={() => setIsDrawerOpen(false)}
        onEdit={(c) => {
          setIsDrawerOpen(false);
          handleOpenEditModal(c);
        }}
        onDelete={(c) => {
          handleDeleteComplaint(c);
        }}
        onRefreshList={loadComplaints}
      />

      {/* Arrived Complaints Notifications Modal (Only opened on click) */}
      <ComplaintNotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        onSelectComplaint={(complaintId) => {
          handleOpenDrawer(complaintId);
        }}
        onActionCompleted={() => {
          loadComplaints();
        }}
      />
    </div>
  );
};
