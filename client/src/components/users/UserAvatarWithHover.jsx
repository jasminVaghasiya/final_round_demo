import React, { useState, useRef } from 'react';
import { User as UserIcon, Sparkles } from 'lucide-react';

export const UserAvatarWithHover = ({
  user,
  size = 38,
  onClick,
  hoverDelayMs = 1500,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef(null);

  const photoUrl = user?.profileImage || user?.avatar || '';

  const handleMouseEnter = () => {
    setIsHovering(true);
    timerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, hoverDelayMs);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowTooltip(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Avatar Circle Container */}
      <div
        onClick={onClick}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--border-focus)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: size * 0.4,
          flexShrink: 0,
          border: '2px solid var(--border-focus)',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isHovering ? '0 0 0 4px rgba(99, 102, 241, 0.35)' : 'none',
        }}
        title="Hover for 1.5s to view photo popover"
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={user?.name || 'User'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : user?.name ? (
          user.name.charAt(0).toUpperCase()
        ) : (
          <UserIcon size={size * 0.5} />
        )}
      </div>

      {/* Floating Center Screen Rectangular Photo Modal (Rendered on 1.5s hover until hover out) */}
      {showTooltip && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: 320,
              backgroundColor: 'var(--bg-card)',
              border: '2px solid var(--border-focus)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-lg)',
              pointerEvents: 'auto',
              animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              textAlign: 'center',
            }}
          >
            {/* RECTANGULAR Photo Frame */}
            <div
              style={{
                width: 280,
                height: 280,
                borderRadius: '16px',
                backgroundColor: 'var(--bg-dark)',
                color: 'var(--border-focus)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '4rem',
                margin: '0 auto 1rem auto',
                border: '2px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
              }}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={user?.name || 'User'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : user?.name ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <UserIcon size={64} />
              )}
            </div>

            {/* ONLY User Name Below Rectangular Photo */}
            <div
              style={{
                fontWeight: 800,
                fontSize: '1.25rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                letterSpacing: '-0.02em',
              }}
            >
              {user?.name}
              <Sparkles size={18} color="var(--border-focus)" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
