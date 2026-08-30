import React from 'react';
import { useAbility } from '../../casl/AbilityContext';
import { UserCheck, UserX, AlertOctagon, Shield, Building2, X } from 'lucide-react';

export const UserBulkToolbar = ({
  selectedCount,
  onClearSelection,
  onBulkActivate,
  onBulkDeactivate,
  onBulkSuspend,
  onBulkChangeRole,
  onBulkAssignDept,
}) => {
  if (selectedCount === 0) return null;

  const ability = useAbility();

  const canActivate = ability.can('activate', 'User');
  const canDeactivate = ability.can('deactivate', 'User');
  const canSuspend = ability.can('suspend', 'User');
  const canChangeRole = ability.can('change_role', 'User');
  const canAssignDept = ability.can('assign_department', 'User');

  return (
    <div
      style={{
        position: 'sticky',
        top: 20,
        zIndex: 100,
        backgroundColor: 'var(--primary)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '0.875rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-lg)',
        animation: 'slideDown 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
        <span style={{ backgroundColor: '#ffffff', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.85rem' }}>
          {selectedCount}
        </span>
        <span>Users Selected</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        {canActivate && (
          <button className="btn btn-secondary" style={{ backgroundColor: '#ffffff', color: 'var(--success)', border: 'none', padding: '0.4rem 0.875rem', fontSize: '0.85rem' }} onClick={onBulkActivate}>
            <UserCheck size={16} /> Activate
          </button>
        )}
        {canDeactivate && (
          <button className="btn btn-secondary" style={{ backgroundColor: '#ffffff', color: 'var(--error)', border: 'none', padding: '0.4rem 0.875rem', fontSize: '0.85rem' }} onClick={onBulkDeactivate}>
            <UserX size={16} /> Deactivate
          </button>
        )}
        {canSuspend && (
          <button className="btn btn-secondary" style={{ backgroundColor: '#ffffff', color: '#b91c1c', border: 'none', padding: '0.4rem 0.875rem', fontSize: '0.85rem' }} onClick={onBulkSuspend}>
            <AlertOctagon size={16} /> Suspend
          </button>
        )}
        {canChangeRole && (
          <button className="btn btn-secondary" style={{ backgroundColor: '#ffffff', color: 'var(--primary)', border: 'none', padding: '0.4rem 0.875rem', fontSize: '0.85rem' }} onClick={onBulkChangeRole}>
            <Shield size={16} /> Change Role
          </button>
        )}
        {canAssignDept && (
          <button className="btn btn-secondary" style={{ backgroundColor: '#ffffff', color: 'var(--bg-dark)', border: 'none', padding: '0.4rem 0.875rem', fontSize: '0.85rem' }} onClick={onBulkAssignDept}>
            <Building2 size={16} /> Assign Dept
          </button>
        )}

        <button
          onClick={onClearSelection}
          style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '4px', marginLeft: '0.5rem' }}
          title="Clear Selection"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
