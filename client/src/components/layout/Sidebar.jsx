import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAbility } from '../../casl/AbilityContext';
import { complaintApi } from '../../api/complaintApi';
import { ComplaintNotificationModal } from '../complaints/ComplaintNotificationModal';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Settings,
  LogOut,
  Building2,
  ChevronRight,
  Shield,
  LifeBuoy,
  MessageSquareWarning,
  Inbox,
  Bell,
} from 'lucide-react';

export const Sidebar = () => {
  const { user, company, logout } = useAuth();
  const ability = useAbility();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [arrivedPendingCount, setArrivedPendingCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Poll for new incoming complaints every 10 seconds
  useEffect(() => {
    let isMounted = true;
    const fetchIncomingCount = async () => {
      try {
        const res = await complaintApi.getComplaints({ viewScope: 'arrived', status: 'OPEN' });
        if (isMounted && res.data) {
          setArrivedPendingCount(res.data.length);
        }
      } catch (err) {
        // Silently ignore background polling errors
      }
    };

    fetchIncomingCount();
    const interval = setInterval(fetchIncomingCount, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [user]);

  // CASL Driven Navigation Rules
  const canReadUsers = ability.can('read', 'User');
  const canReadJoinRequests = ability.can('read', 'JoinRequest');
  const canManageDepts = ability.can('manage', 'Department');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

    const isAuthority = ['HOD', 'ADMIN', 'SUPER_ADMIN', 'CREATOR', 'SYSTEM_SUPER_ADMIN'].includes(user?.role);

    const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      show: true,
    },
    {
      label: 'My Complaints',
      path: '/my-complaints',
      icon: LifeBuoy,
      show: true,
    },
    {
      label: 'Arrived Complaints',
      path: '/arrived-complaints',
      icon: Inbox,
      show: isAuthority,
      badge: arrivedPendingCount > 0 ? arrivedPendingCount : null,
    },
    {
      label: 'User Directory',
      path: '/admin/users',
      icon: Users,
      show: canReadUsers,
    },
    {
      label: 'Join Requests',
      path: '/admin/join-requests',
      icon: UserCheck,
      show: canReadJoinRequests,
    },
    {
      label: 'Settings & Depts',
      path: '/admin/settings',
      icon: Settings,
      show: ['ADMIN', 'SUPER_ADMIN'].includes(user?.role),
    },
  ];

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        width: isHovered ? '240px' : '68px',
        backgroundColor: 'var(--bg-card)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 0.75rem',
        transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Top Branding Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingLeft: '0.375rem', marginBottom: '2rem' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <Building2 size={22} color="#ffffff" />
          </div>

          {isHovered && (
            <div style={{ overflow: 'hidden', transition: 'opacity 0.2s ease', opacity: isHovered ? 1 : 0 }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>HelpDesk+</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {company?.name || 'SaaS Workspace'}
              </div>
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems
            .filter((item) => item.show)
            .map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    padding: '0.75rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                    textDecoration: 'none',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.9rem',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  })}
                  title={!isHovered ? item.label : ''}
                >
                  <IconComponent size={20} style={{ flexShrink: 0 }} />
                  {isHovered ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, overflow: 'hidden' }}>
                      <span style={{ transition: 'opacity 0.2s ease', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                      {item.badge && (
                        <span
                          style={{
                            backgroundColor: '#ef4444',
                            color: '#ffffff',
                            borderRadius: '9999px',
                            padding: '0.1rem 0.5rem',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            marginLeft: '0.5rem',
                            boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ) : (
                    item.badge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '8px',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#ef4444',
                          boxShadow: '0 0 6px rgba(239, 68, 68, 0.8)',
                        }}
                      />
                    )
                  )}
                </NavLink>
              );
            })}
        </nav>
      </div>

      {/* Bottom Profile & Logout Section */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {/* Notifications Trigger Button (Only for Authorities) */}
        {isAuthority && (
          <button
            onClick={() => setIsNotificationOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              padding: '0.625rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              color: arrivedPendingCount > 0 ? '#ef4444' : 'var(--text-secondary)',
              backgroundColor: arrivedPendingCount > 0 ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 600,
              width: '100%',
              textAlign: 'left',
              position: 'relative',
            }}
            title={!isHovered ? `Notifications (${arrivedPendingCount})` : ''}
          >
            <Bell size={20} style={{ flexShrink: 0 }} />
            {isHovered ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1, overflow: 'hidden' }}>
                <span>Notifications</span>
                {arrivedPendingCount > 0 && (
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
                    {arrivedPendingCount}
                  </span>
                )}
              </div>
            ) : (
              arrivedPendingCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                    boxShadow: '0 0 6px rgba(239, 68, 68, 0.8)',
                  }}
                />
              )
            )}
          </button>
        )}

        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.375rem' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--border-focus)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              flexShrink: 0,
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          {isHovered && (
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user?.role}</div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
            padding: '0.625rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--error)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            width: '100%',
            textAlign: 'left',
          }}
          title={!isHovered ? 'Logout' : ''}
        >
          <LogOut size={20} style={{ flexShrink: 0 }} />
          {isHovered && <span>Logout</span>}
        </button>
      </div>

      {/* Complaint Notification Modal */}
      <ComplaintNotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onSelectComplaint={(complaintId) => {
          navigate(`/arrived-complaints`);
        }}
        onActionCompleted={() => {
          // Re-poll count
          complaintApi.getComplaints({ viewScope: 'arrived', status: 'OPEN' }).then((res) => {
            if (res.data) setArrivedPendingCount(res.data.length);
          });
        }}
      />
    </aside>
  );
};
