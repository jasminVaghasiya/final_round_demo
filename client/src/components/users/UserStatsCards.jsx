import React from 'react';
import { Users, UserCheck, UserX, AlertOctagon, ShieldCheck } from 'lucide-react';

export const UserStatsCards = ({ stats = {} }) => {
  const cards = [
    {
      title: 'Total Users',
      count: stats.totalUsers || 0,
      icon: Users,
      color: '#6366f1',
      bgColor: 'rgba(99, 102, 241, 0.15)',
      subtitle: 'Registered members',
    },
    {
      title: 'Active Users',
      count: stats.activeUsers || 0,
      icon: UserCheck,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.15)',
      subtitle: 'Currently operational',
    },
    {
      title: 'Inactive Users',
      count: stats.inactiveUsers || 0,
      icon: UserX,
      color: '#64748b',
      bgColor: 'rgba(100, 116, 139, 0.15)',
      subtitle: 'Deactivated accounts',
    },
    {
      title: 'Suspended Users',
      count: stats.suspendedUsers || 0,
      icon: AlertOctagon,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.15)',
      subtitle: 'Access restricted',
    },
    {
      title: 'Admins / HODs',
      count: stats.adminHodUsers || 0,
      icon: ShieldCheck,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.15)',
      subtitle: 'Governance personnel',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.25rem' }}>
                {card.title}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {card.count.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {card.subtitle}
              </div>
            </div>

            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: '12px',
                backgroundColor: card.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconComponent size={24} color={card.color} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
