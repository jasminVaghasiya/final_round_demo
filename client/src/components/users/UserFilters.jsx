import React from 'react';
import { Search, X, RotateCcw, Building2 } from 'lucide-react';

const SYSTEM_ROLES = [
  { code: 'ADMIN', name: 'Administrator' },
  { code: 'HOD', name: 'Head of Department' },
  { code: 'MANAGER', name: 'Manager' },
  { code: 'EMPLOYEE', name: 'Employee' },
];

export const UserFilters = ({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  deptFilter,
  setDeptFilter,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  departments = [],
  currentUser = null,
  onClearFilters,
}) => {
  const isHOD = currentUser?.role === 'HOD';
  const deptsList = Array.isArray(departments) ? departments : [];
  const activeChips = [];

  if (roleFilter !== 'ALL') activeChips.push({ key: 'role', label: `Role: ${roleFilter}`, clear: () => setRoleFilter('ALL') });
  if (!isHOD && deptFilter !== 'ALL') {
    const deptObj = deptsList.find((d) => d && d._id === deptFilter);
    activeChips.push({ key: 'dept', label: `Dept: ${deptObj ? deptObj.name : 'Selected'}`, clear: () => setDeptFilter('ALL') });
  }
  if (statusFilter !== 'ALL') activeChips.push({ key: 'status', label: `Status: ${statusFilter}`, clear: () => setStatusFilter('ALL') });
  if (dateFilter !== 'ALL') activeChips.push({ key: 'date', label: `Joined: ${dateFilter.replace('_', ' ')}`, clear: () => setDateFilter('ALL') });

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.5rem' }}>
      {/* Top Search & Filter Control Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 2fr) repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', alignItems: 'center' }}>
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search users by name, email, ID, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '42px', paddingRight: search ? '40px' : '14px' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Role Filter Dropdown */}
        <select className="form-input" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="ALL">All Roles</option>
          {SYSTEM_ROLES.map((r) => (
            <option key={r.code} value={r.code}>
              {r.name} ({r.code})
            </option>
          ))}
        </select>

        {/* Department Filter Dropdown (Hidden for HOD since HOD is strictly scoped to their own department) */}
        {!isHOD ? (
          <select className="form-input" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            <option value="ALL">All Departments</option>
            {deptsList.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        ) : (
          <div
            style={{
              padding: '0.625rem 0.875rem',
              backgroundColor: 'var(--bg-dark)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: 'var(--border-focus)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Building2 size={16} /> My Dept Only (HOD)
          </div>
        )}

        {/* Status Filter */}
        <select className="form-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SUSPENDED">Suspended</option>
        </select>

        {/* Date Joined Filter */}
        <select className="form-input" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
          <option value="ALL">All Time</option>
          <option value="TODAY">Joined Today</option>
          <option value="THIS_WEEK">This Week</option>
          <option value="THIS_MONTH">This Month</option>
          <option value="LAST_3_MONTHS">Last 3 Months</option>
          <option value="LAST_6_MONTHS">Last 6 Months</option>
        </select>
      </div>

      {/* Active Filter Chips */}
      {(activeChips.length > 0 || search) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Filters:</span>
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--border-focus)',
                padding: '0.25rem 0.625rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              {chip.label}
              <X size={14} style={{ cursor: 'pointer' }} onClick={chip.clear} />
            </span>
          ))}

          <button
            onClick={onClearFilters}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              background: 'none',
              border: 'none',
              color: 'var(--error)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            <RotateCcw size={14} /> Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
