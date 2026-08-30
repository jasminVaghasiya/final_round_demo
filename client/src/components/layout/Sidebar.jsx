import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Settings,
  LogOut,
  Building2,
} from 'lucide-react';

export const Sidebar = () => {
  const { user, company, logout } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Check HR department membership
  const deptObj = user?.departmentId;
  const deptCode = deptObj && typeof deptObj === 'object' && deptObj.code ? String(deptObj.code).toUpperCase() : '';
  const deptName = deptObj && typeof deptObj === 'object' && deptObj.name ? String(deptObj.name).toLowerCase() : '';
  const isHrPersonnel = (deptCode === 'HR' || deptName.includes('human resource')) && user?.role !== 'EMPLOYEE';

  // Role Visibility Rules:
  // 1. User Directory: Strictly hidden from EMPLOYEE (visible to SUPER_ADMIN, ADMIN, HOD, MANAGER)
  const canReadUsers = ['SUPER_ADMIN', 'ADMIN', 'HOD', 'MANAGER'].includes(user?.role);

  // 2. Join Requests: Strictly hidden from EMPLOYEE (visible ONLY to SUPER_ADMIN, ADMIN, or non-employee HR staff)
  const canReadJoinRequests = user?.role !== 'EMPLOYEE' && (['SUPER_ADMIN', 'ADMIN'].includes(user?.role) || isHrPersonnel);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      show: true,
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
                  })}
                  title={!isHovered ? item.label : ''}
                >
                  <IconComponent size={20} style={{ flexShrink: 0 }} />
                  {isHovered && <span style={{ transition: 'opacity 0.2s ease' }}>{item.label}</span>}
                </NavLink>
              );
            })}
        </nav>
      </div>

      {/* Bottom Profile & Logout Section */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
    </aside>
  );
};
