import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userManagementApi } from '../api/userManagementApi';
import { departmentApi } from '../api/departmentApi';
import { useAuth } from '../context/AuthContext';
import { UserStatsCards } from '../components/users/UserStatsCards';
import { UserFilters } from '../components/users/UserFilters';
import { UserTable } from '../components/users/UserTable';
import { UserBulkToolbar } from '../components/users/UserBulkToolbar';
import { CreateUserModal } from '../components/users/CreateUserModal';
import { EditUserModal } from '../components/users/EditUserModal';
import { SuspendUserModal } from '../components/users/SuspendUserModal';
import { ChangeRoleModal } from '../components/users/ChangeRoleModal';
import { AssignDeptModal } from '../components/users/AssignDeptModal';
import { ResetPasswordModal } from '../components/users/ResetPasswordModal';
import { UserQuickActionsModal } from '../components/users/UserQuickActionsModal';
import { BulkAssignDeptModal } from '../components/users/BulkAssignDeptModal';
import { BulkChangeRoleModal } from '../components/users/BulkChangeRoleModal';
import { BulkSuspendModal } from '../components/users/BulkSuspendModal';

import { Plus, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const UserManagement = () => {
  const navigate = useNavigate();
  const { user: currentUser, company } = useAuth();

  // State: Stats & Lists
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  // State: Infinite Scroll Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // State: Search & Filters
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // State: Selections & Modals
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals visibility state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [quickActionsUser, setQuickActionsUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [suspendingUser, setSuspendingUser] = useState(null);
  const [roleChangingUser, setRoleChangingUser] = useState(null);
  const [deptAssigningUser, setDeptAssigningUser] = useState(null);
  const [passwordResettingUser, setPasswordResettingUser] = useState(null);

  // Bulk Modals state
  const [isBulkAssignDeptOpen, setIsBulkAssignDeptOpen] = useState(false);
  const [isBulkChangeRoleOpen, setIsBulkChangeRoleOpen] = useState(false);
  const [isBulkSuspendOpen, setIsBulkSuspendOpen] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchStats = async () => {
    try {
      const res = await userManagementApi.getUserStats();
      if (res.success && res.data?.stats) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch user stats:', err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await departmentApi.getDepartments();
      if (res.success && res.data?.departments) {
        setDepartments(res.data.departments);
      }
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };

  // Reset page to 1 when filters or sorting change
  useEffect(() => {
    setPage(1);
    setUsers([]);
  }, [search, roleFilter, deptFilter, statusFilter, dateFilter, sortBy, sortOrder]);

  const fetchUsers = async () => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params = {
        search,
        role: roleFilter,
        departmentId: deptFilter,
        status: statusFilter,
        dateJoined: dateFilter,
        sortBy,
        sortOrder,
        page,
        limit: 20,
      };

      const res = await userManagementApi.getUsers(params);
      if (res.success && res.data) {
        const newUsers = res.data.users || [];
        const pag = res.data.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 };

        if (page === 1) {
          setUsers(newUsers);
        } else {
          setUsers((prev) => [...prev, ...newUsers]);
        }

        setPagination(pag);
        setHasMore(page < pag.totalPages);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter, deptFilter, statusFilter, dateFilter, sortBy, sortOrder]);

  const handleLoadMore = () => {
    if (hasMore && !loadingMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  // Handle Sort Toggle
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Selection Handlers
  const handleSelectUser = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedIds(users.map((u) => u._id));
    } else {
      setSelectedIds([]);
    }
  };

  // User Single Action Handlers
  const handleCreateUser = async (formData) => {
    const res = await userManagementApi.createUser(formData);
    if (res.success) {
      showToast('🟢 User account created successfully');
      setPage(1);
      fetchUsers();
      fetchStats();
    }
  };

  const handleUpdateUser = async (id, formData) => {
    const res = await userManagementApi.updateUser(id, formData);
    if (res.success) {
      showToast('🟢 User profile updated successfully');
      setPage(1);
      fetchUsers();
    }
  };

  const handleActivateUser = async (u) => {
    try {
      const res = await userManagementApi.activateUser(u._id);
      if (res.success) {
        showToast(`🟢 User ${u.name} activated successfully`);
        setPage(1);
        fetchUsers();
        fetchStats();
      }
    } catch (err) {
      showToast(err.message || 'Failed to activate user', 'error');
    }
  };

  const handleDeactivateUser = async (u) => {
    try {
      const res = await userManagementApi.deactivateUser(u._id);
      if (res.success) {
        showToast(`🟢 User ${u.name} deactivated successfully`);
        setPage(1);
        fetchUsers();
        fetchStats();
      }
    } catch (err) {
      showToast(err.message || 'Failed to deactivate user', 'error');
    }
  };

  const handleSuspendUser = async (id, suspensionDays, reason) => {
    const res = await userManagementApi.suspendUser(id, suspensionDays, reason);
    if (res.success) {
      showToast('🔴 User account suspended');
      setPage(1);
      fetchUsers();
      fetchStats();
    }
  };

  const handleChangeRole = async (id, newRole, reason) => {
    const res = await userManagementApi.changeUserRole(id, newRole, reason);
    if (res.success) {
      showToast('🟢 User role updated');
      setPage(1);
      fetchUsers();
      fetchStats();
    }
  };

  const handleAssignDept = async (id, departmentId) => {
    const res = await userManagementApi.assignDepartment(id, departmentId);
    if (res.success) {
      showToast('🟢 Department assignment updated');
      setPage(1);
      fetchUsers();
    }
  };

  const handleResetPassword = async (id, newPassword, mustChangePassword) => {
    const res = await userManagementApi.resetUserPassword(id, newPassword, mustChangePassword);
    if (res.success) {
      showToast('🟢 Password reset successfully');
    }
  };

  // Bulk Action Execution Handler
  const handleBulkAction = async (action, options = {}) => {
    if (selectedIds.length === 0) return;
    try {
      const res = await userManagementApi.bulkAction(action, selectedIds, options);
      if (res.success) {
        showToast(`🟢 Bulk action "${action}" completed for ${selectedIds.length} users`);
        setSelectedIds([]);
        setPage(1);
        fetchUsers();
        fetchStats();
      }
    } catch (err) {
      showToast(err.message || 'Bulk operation failed', 'error');
    }
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSearch('');
    setRoleFilter('ALL');
    setDeptFilter('ALL');
    setStatusFilter('ALL');
    setDateFilter('ALL');
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
        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <button className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
              <ArrowLeft size={15} /> Dashboard
            </button>
            <h1>User Management Directory</h1>
            <p className="subtitle" style={{ marginBottom: 0 }}>Manage user accounts, roles, department assignments, and permissions for {company?.name}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
              <Plus size={18} /> Create New User
            </button>
          </div>
        </div>

        {/* 1. Summary Cards */}
        <UserStatsCards stats={stats} />

        {/* 2. Search & Advanced Filters */}
        <UserFilters
          search={search}
          setSearch={setSearch}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          deptFilter={deptFilter}
          setDeptFilter={setDeptFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          departments={departments}
          currentUser={currentUser}
          onClearFilters={handleClearFilters}
        />

        {/* 3. Bulk Action Toolbar */}
        <UserBulkToolbar
          selectedCount={selectedIds.length}
          onClearSelection={() => setSelectedIds([])}
          onBulkActivate={() => handleBulkAction('ACTIVATE')}
          onBulkDeactivate={() => handleBulkAction('DEACTIVATE')}
          onBulkSuspend={() => setIsBulkSuspendOpen(true)}
          onBulkChangeRole={() => setIsBulkChangeRoleOpen(true)}
          onBulkAssignDept={() => setIsBulkAssignDeptOpen(true)}
          isAdmin={['SUPER_ADMIN', 'ADMIN'].includes(currentUser?.role)}
        />

        {/* 4. Users Table with Infinite Scroll & Lazy Loading Skeleton */}
        {loading && page === 1 ? (
          <div className="center-content" style={{ padding: '4rem 0' }}>
            <div className="spinner" style={{ width: 40, height: 40 }} />
          </div>
        ) : (
          <UserTable
            users={users}
            selectedIds={selectedIds}
            onSelectUser={handleSelectUser}
            onSelectAll={handleSelectAll}
            onOpenQuickActions={(u) => setQuickActionsUser(u)}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            pagination={pagination}
            hasMore={hasMore}
            loadingMore={loadingMore}
            onLoadMore={handleLoadMore}
          />
        )}
      </div>

      {/* Quick Actions Window Modal */}
      <UserQuickActionsModal
        isOpen={Boolean(quickActionsUser)}
        onClose={() => setQuickActionsUser(null)}
        user={quickActionsUser}
        currentUser={currentUser}
        onViewProfile={(u) => navigate(`/admin/users/${u._id}`)}
        onEditUser={(u) => setEditingUser(u)}
        onChangeRole={(u) => setRoleChangingUser(u)}
        onAssignDept={(u) => setDeptAssigningUser(u)}
        onActivateUser={handleActivateUser}
        onDeactivateUser={handleDeactivateUser}
        onSuspendUser={(u) => setSuspendingUser(u)}
        onResetPassword={(u) => setPasswordResettingUser(u)}
      />

      {/* Single User Action Modals */}
      <CreateUserModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSubmit={handleCreateUser} departments={departments} currentUser={currentUser} />
      <EditUserModal isOpen={Boolean(editingUser)} onClose={() => setEditingUser(null)} onSubmit={handleUpdateUser} user={editingUser} departments={departments} currentUser={currentUser} />
      <SuspendUserModal isOpen={Boolean(suspendingUser)} onClose={() => setSuspendingUser(null)} onSubmit={handleSuspendUser} user={suspendingUser} />
      <ChangeRoleModal isOpen={Boolean(roleChangingUser)} onClose={() => setRoleChangingUser(null)} onSubmit={handleChangeRole} user={roleChangingUser} currentUser={currentUser} />
      <AssignDeptModal isOpen={Boolean(deptAssigningUser)} onClose={() => setDeptAssigningUser(null)} onSubmit={handleAssignDept} user={deptAssigningUser} departments={departments} />
      <ResetPasswordModal isOpen={Boolean(passwordResettingUser)} onClose={() => setPasswordResettingUser(null)} onSubmit={handleResetPassword} user={passwordResettingUser} />

      {/* Sleek Floating Bulk Action Modals */}
      <BulkAssignDeptModal
        isOpen={isBulkAssignDeptOpen}
        onClose={() => setIsBulkAssignDeptOpen(false)}
        onSubmit={(deptId) => handleBulkAction('ASSIGN_DEPARTMENT', { departmentId: deptId })}
        selectedCount={selectedIds.length}
        departments={departments}
      />

      <BulkChangeRoleModal
        isOpen={isBulkChangeRoleOpen}
        onClose={() => setIsBulkChangeRoleOpen(false)}
        onSubmit={(role) => handleBulkAction('CHANGE_ROLE', { role })}
        selectedCount={selectedIds.length}
        currentUser={currentUser}
      />

      <BulkSuspendModal
        isOpen={isBulkSuspendOpen}
        onClose={() => setIsBulkSuspendOpen(false)}
        onSubmit={(payload) => handleBulkAction('SUSPEND', payload)}
        selectedCount={selectedIds.length}
      />
    </div>
  );
};
