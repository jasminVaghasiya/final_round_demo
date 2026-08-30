import React from 'react';
import { subject } from '@casl/ability';
import { useAbility } from '../../casl/AbilityContext';
import {
  X,
  Eye,
  Edit2,
  Shield,
  Building2,
  Key,
  UserCheck,
  UserX,
  AlertOctagon,
  User as UserIcon,
  Info,
  Lock,
} from 'lucide-react';

export const UserQuickActionsModal = ({
  isOpen,
  onClose,
  user = null,
  currentUser = null,
  onViewProfile,
  onEditUser,
  onChangeRole,
  onAssignDept,
  onActivateUser,
  onDeactivateUser,
  onSuspendUser,
  onResetPassword,
}) => {
  if (!isOpen || !user) return null;

  const ability = useAbility();

  const currentUserId = currentUser?._id || currentUser?.id;
  const targetUserId = user._id || user.id;
  const isSelf = Boolean(currentUserId && currentUserId === targetUserId);

  const currentUserDeptId = currentUser?.departmentId?._id || currentUser?.departmentId || '';
  const targetUserDeptId = user?.departmentId?._id || user?.departmentId || '';

  const isHod = currentUser?.role === 'HOD';
  const isHodSameDept = isHod && currentUserDeptId && currentUserDeptId === targetUserDeptId;
  const isHodRestricted = isHod && !isHodSameDept;

  const userShortId = user._id ? String(user._id).slice(-4) : '0000';

  // Construct CASL subject object for fine-grained authorization checks
  const targetSubject = subject('User', {
    _id: targetUserId,
    departmentId: targetUserDeptId,
    role: user.role,
  });

  // CASL Frontend Permissions & Role Governance
  const canEdit = ability.can('edit', targetSubject);
  const canChangeRole = ability.can('change_role', targetSubject);
  const canAssignDept = ['ADMIN', 'SUPER_ADMIN'].includes(currentUser?.role) && ability.can('assign_department', targetSubject);
  const canResetPassword = ability.can('reset_password', targetSubject);
  const canSuspend = ability.can('suspend', targetSubject);
  const canDeactivate = ability.can('deactivate', targetSubject);
  const canActivate = ability.can('activate', targetSubject);

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div
        className="modal-card card-wide"
        style={{
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)',
        }}
      >
        {/* Header & Close Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '1.25rem',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--border-focus)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.35rem',
                flexShrink: 0,
                border: '2px solid var(--border-focus)',
              }}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={26} />}
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.name} {isSelf && <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>(You)</span>}
                </h2>
                <span className="badge badge-admin">{user.role}</span>
                {user.status === 'ACTIVE' && <span className="badge badge-active">🟢 Active</span>}
                {user.status === 'INACTIVE' && <span className="badge" style={{ backgroundColor: 'rgba(100,116,139,0.15)', color: '#94a3b8' }}>⚪ Inactive</span>}
                {user.status === 'SUSPENDED' && <span className="badge badge-suspended">🔴 Suspended</span>}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--border-focus)' }}>
                  {user.userId || `USR-${userShortId}`}
                </span>
                <span>•</span>
                <span>{user.email}</span>
                <span>•</span>
                <span>{user.departmentId?.name || 'Unassigned Dept'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-dark)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Self Protection Notice */}
        {isSelf && (
          <div className="alert alert-warning" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <Info size={16} style={{ shrink: 0 }} />
            <div>
              <strong>Self-Protection Governance Enabled:</strong> Deactivation, suspension, and role changes are disabled for your own active administrative account.
            </div>
          </div>
        )}

        {/* HOD Department Scoping Notice */}
        {isHodRestricted && (
          <div className="alert alert-error" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <Lock size={16} style={{ shrink: 0 }} />
            <div>
              <strong>HOD Department Restriction:</strong> As Head of Department, you can only manage employees within your assigned department ({currentUser?.departmentId?.name || 'Your Department'}). Administrative actions are restricted for users outside your department.
            </div>
          </div>
        )}

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
          Available Administrative Actions (CASL Protected)
        </div>

        {/* 2-Column Action Cards Grid Driven by CASL Ability Checks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {/* Action 1: View Profile */}
          <button
            onClick={() => { onClose(); onViewProfile(user); }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              backgroundColor: 'var(--bg-dark)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.15rem',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            className="btn-action-card"
          >
            <div style={{ padding: '0.65rem', borderRadius: '12px', backgroundColor: 'var(--primary-light)', color: 'var(--border-focus)', flexShrink: 0 }}>
              <Eye size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>View Full Profile</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                Inspect account details, activity history, and submitted complaints
              </div>
            </div>
          </button>

          {/* Action 2: Edit User (CASL canEdit Check) */}
          {canEdit && (
            <button
              onClick={() => { onClose(); onEditUser(user); }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                backgroundColor: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              className="btn-action-card"
            >
              <div style={{ padding: '0.65rem', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', flexShrink: 0 }}>
                <Edit2 size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Edit User Details</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                  Update name, email, phone number, username, or designation
                </div>
              </div>
            </button>
          )}

          {/* Action 3: Change Role (CASL canChangeRole Check) */}
          {!isSelf && canChangeRole && (
            <button
              onClick={() => { onClose(); onChangeRole(user); }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                backgroundColor: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              className="btn-action-card"
            >
              <div style={{ padding: '0.65rem', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', flexShrink: 0 }}>
                <Shield size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Change Role</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                  Promote or modify user access role (Faculty, Staff, Student, Employee)
                </div>
              </div>
            </button>
          )}

          {/* Action 4: Assign Department (CASL canAssignDept Check - Administrators Only) */}
          {canAssignDept && (
            <button
              onClick={() => { onClose(); onAssignDept(user); }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                backgroundColor: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              className="btn-action-card"
            >
              <div style={{ padding: '0.65rem', borderRadius: '12px', backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', flexShrink: 0 }}>
                <Building2 size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Assign Department</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                  Assign or update organizational department assignment
                </div>
              </div>
            </button>
          )}

          {/* Action 5: Reset Password (CASL canResetPassword Check) */}
          {canResetPassword && (
            <button
              onClick={() => { onClose(); onResetPassword(user); }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                backgroundColor: 'var(--bg-dark)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.15rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              className="btn-action-card"
            >
              <div style={{ padding: '0.65rem', borderRadius: '12px', backgroundColor: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8', flexShrink: 0 }}>
                <Key size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Reset Password</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                  Set new password and toggle mandatory change on next login
                </div>
              </div>
            </button>
          )}

          {/* Action 6: Status Controls (CASL canSuspend / canDeactivate / canActivate) */}
          {!isSelf && (
            user.status === 'ACTIVE' ? (
              <>
                {canSuspend && (
                  <button
                    onClick={() => { onClose(); onSuspendUser(user); }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      backgroundColor: 'var(--bg-dark)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.15rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    className="btn-action-card"
                  >
                    <div style={{ padding: '0.65rem', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', flexShrink: 0 }}>
                      <AlertOctagon size={22} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#f87171', fontSize: '0.95rem' }}>Suspend User</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                        Temporarily restrict account access with duration & reason
                      </div>
                    </div>
                  </button>
                )}

                {canDeactivate && (
                  <button
                    onClick={() => { onClose(); onDeactivateUser(user); }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      backgroundColor: 'var(--bg-dark)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.15rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    className="btn-action-card"
                  >
                    <div style={{ padding: '0.65rem', borderRadius: '12px', backgroundColor: 'rgba(100, 116, 139, 0.15)', color: '#94a3b8', flexShrink: 0 }}>
                      <UserX size={22} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Deactivate User</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                        Disable login access while preserving all user records
                      </div>
                    </div>
                  </button>
                )}
              </>
            ) : (
              canActivate && (
                <button
                  onClick={() => { onClose(); onActivateUser(user); }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    backgroundColor: 'var(--bg-dark)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.15rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  className="btn-action-card"
                >
                  <div style={{ padding: '0.65rem', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', flexShrink: 0 }}>
                    <UserCheck size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#34d399', fontSize: '0.95rem' }}>Activate User Account</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.4 }}>
                      Restore full active operational access for this account
                    </div>
                  </div>
                </button>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};
