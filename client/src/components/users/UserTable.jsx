import React, { useEffect, useRef } from 'react';
import {
  MoreVertical,
  ArrowUpDown,
  Sparkles,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { UserAvatarWithHover } from './UserAvatarWithHover';

export const UserTable = ({
  users = [],
  selectedIds = [],
  onSelectUser,
  onSelectAll,
  onOpenQuickActions,
  sortBy,
  sortOrder,
  onSort,
  pagination = {},
  hasMore = false,
  loadingMore = false,
  onLoadMore,
}) => {
  const sentinelRef = useRef(null);

  const isAllSelected = users.length > 0 && users.every((u) => selectedIds.includes(u._id));

  // IntersectionObserver for Infinite Scrolling
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loadingMore) {
          onLoadMore();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [hasMore, loadingMore, onLoadMore]);

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-dark)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '0.875rem 1rem', width: 40 }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  style={{ cursor: 'pointer', accentColor: 'var(--primary)' }}
                />
              </th>
              <th style={{ padding: '0.875rem 1rem', cursor: 'pointer' }} onClick={() => onSort('name')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  User {sortBy === 'name' && <ArrowUpDown size={14} color="var(--primary)" />}
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', cursor: 'pointer' }} onClick={() => onSort('userId')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  User ID {sortBy === 'userId' && <ArrowUpDown size={14} color="var(--primary)" />}
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem' }}>Contact</th>
              <th style={{ padding: '0.875rem 1rem', cursor: 'pointer' }} onClick={() => onSort('role')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  Role {sortBy === 'role' && <ArrowUpDown size={14} color="var(--primary)" />}
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem' }}>Department</th>
              <th style={{ padding: '0.875rem 1rem', cursor: 'pointer' }} onClick={() => onSort('status')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  Status {sortBy === 'status' && <ArrowUpDown size={14} color="var(--primary)" />}
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', cursor: 'pointer' }} onClick={() => onSort('createdAt')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  Joined Date {sortBy === 'createdAt' && <ArrowUpDown size={14} color="var(--primary)" />}
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', width: 60 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && !loadingMore ? (
              <tr>
                <td colSpan="9" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No users found matching current filters.
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const isSelected = selectedIds.includes(u._id);
                return (
                  <tr
                    key={u._id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
                      transition: 'all 0.15s ease',
                    }}
                    className="user-row-hover"
                  >
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectUser(u._id)}
                        style={{ cursor: 'pointer', accentColor: 'var(--primary)' }}
                      />
                    </td>

                    {/* User Profile Avatar & Name with 2-Second Hover Preview */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        <UserAvatarWithHover
                          user={u}
                          size={38}
                          onClick={() => onOpenQuickActions(u)}
                          hoverDelayMs={2000}
                        />
                        <div style={{ cursor: 'pointer' }} onClick={() => onOpenQuickActions(u)}>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            {u.name}
                            <Sparkles size={13} color="var(--border-focus)" />
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.designation || 'Member'}</div>
                        </div>
                      </div>
                    </td>

                    {/* User ID */}
                    <td
                      style={{ padding: '0.875rem 1rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--border-focus)', cursor: 'pointer' }}
                      onClick={() => onOpenQuickActions(u)}
                    >
                      {u.userId || `USR-${u._id.slice(-4)}`}
                    </td>

                    {/* Contact */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ color: 'var(--text-primary)' }}>{u.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.phone || 'No phone'}</div>
                    </td>

                    {/* Role */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span className="badge badge-admin">{u.role}</span>
                    </td>

                    {/* Department */}
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)' }}>
                      {u.departmentId?.name || 'Unassigned'}
                    </td>

                    {/* Status */}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      {u.status === 'ACTIVE' && <span className="badge badge-active">🟢 Active</span>}
                      {u.status === 'INACTIVE' && <span className="badge" style={{ backgroundColor: 'rgba(100,116,139,0.15)', color: '#94a3b8' }}>⚪ Inactive</span>}
                      {u.status === 'SUSPENDED' && <span className="badge badge-suspended">🔴 Suspended</span>}
                      {u.status === 'PENDING' && <span className="badge badge-pending">🟡 Pending</span>}
                    </td>

                    {/* Joined Date */}
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {new Date(u.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>

                    {/* Actions Button */}
                    <td style={{ padding: '0.875rem 1rem', position: 'relative' }}>
                      <button
                        onClick={() => onOpenQuickActions(u)}
                        style={{
                          backgroundColor: 'var(--bg-dark)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-md)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                        title="Open Quick Actions Window"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}

            {/* SKELETON SHIMMER LAZY LOADING ROWS */}
            {loadingMore && (
              <>
                {[1, 2, 3].map((idx) => (
                  <tr key={`skeleton-${idx}`} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div className="skeleton-shimmer" style={{ width: 18, height: 18 }} />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="skeleton-shimmer" style={{ width: 38, height: 38, borderRadius: '50%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <div className="skeleton-shimmer" style={{ width: 120, height: 14 }} />
                          <div className="skeleton-shimmer" style={{ width: 80, height: 10 }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}><div className="skeleton-shimmer" style={{ width: 70, height: 14 }} /></td>
                    <td style={{ padding: '1rem' }}><div className="skeleton-shimmer" style={{ width: 140, height: 14 }} /></td>
                    <td style={{ padding: '1rem' }}><div className="skeleton-shimmer" style={{ width: 65, height: 20, borderRadius: 12 }} /></td>
                    <td style={{ padding: '1rem' }}><div className="skeleton-shimmer" style={{ width: 100, height: 14 }} /></td>
                    <td style={{ padding: '1rem' }}><div className="skeleton-shimmer" style={{ width: 65, height: 20, borderRadius: 12 }} /></td>
                    <td style={{ padding: '1rem' }}><div className="skeleton-shimmer" style={{ width: 80, height: 14 }} /></td>
                    <td style={{ padding: '1rem' }}><div className="skeleton-shimmer" style={{ width: 32, height: 32, borderRadius: 8 }} /></td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Sentinel Element for IntersectionObserver */}
      <div ref={sentinelRef} style={{ height: 20, width: '100%' }} />

      {/* Infinite Scroll Interactive Footer */}
      <div
        style={{
          padding: '1rem 1.5rem',
          backgroundColor: 'var(--bg-dark)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{users.length}</strong> of{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{pagination.total || users.length}</strong> users
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
          {loadingMore ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--border-focus)', fontWeight: 600 }}>
              <Loader2 size={16} className="spinner" /> Lazy loading next batch...
            </span>
          ) : hasMore ? (
            <button
              className="btn btn-secondary"
              onClick={onLoadMore}
              style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderRadius: 'var(--radius-md)' }}
            >
              Load More Users 👇
            </button>
          ) : (
            <span style={{ color: 'var(--success)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={16} /> All {pagination.total || users.length} users loaded
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
