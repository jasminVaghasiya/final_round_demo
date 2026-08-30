import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { joinRequestApi } from '../api/joinRequestApi';
import { Clock, Building2, RefreshCw, LogOut, CheckCircle2, XCircle } from 'lucide-react';

export const JoinRequestPending = () => {
  const navigate = useNavigate();
  const { user, company, logout, refreshUser } = useAuth();

  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStatus = async () => {
    try {
      setRefreshing(true);
      const res = await joinRequestApi.getMyRequest();
      if (res.success && res.data) {
        setRequestData(res.data);
        if (res.data.userStatus === 'ACTIVE') {
          await refreshUser();
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Failed to fetch request status:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Poll every 10 seconds for approval updates
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isApproved = user?.status === 'ACTIVE' || requestData?.userStatus === 'ACTIVE';
  const isRejected = user?.status === 'REJECTED' || requestData?.userStatus === 'REJECTED';

  return (
    <div className="app-container">
      <div className="center-content">
        <div className="card" style={{ textAlign: 'center' }}>
          {/* Header Icon */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: isApproved
                ? 'var(--success-light)'
                : isRejected
                ? 'var(--error-light)'
                : 'var(--warning-light)',
              color: isApproved ? 'var(--success)' : isRejected ? 'var(--error)' : 'var(--warning)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
            }}
          >
            {isApproved ? (
              <CheckCircle2 size={36} />
            ) : isRejected ? (
              <XCircle size={36} />
            ) : (
              <Clock size={36} />
            )}
          </div>

          {isApproved ? (
            <>
              <h2>Request Approved!</h2>
              <p className="subtitle">Your request to join the company has been approved.</p>
              <button
                className="btn btn-primary btn-full"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </button>
            </>
          ) : isRejected ? (
            <>
              <h2 style={{ color: 'var(--error)' }}>Request Rejected</h2>
              <p className="subtitle">
                {requestData?.joinRequest?.rejectionReason
                  ? `Reason: ${requestData.joinRequest.rejectionReason}`
                  : 'Your request to join the company was rejected by the administrator.'}
              </p>
              <button className="btn btn-secondary btn-full" onClick={handleLogout}>
                <LogOut size={18} /> Back to Login
              </button>
            </>
          ) : (
            <>
              <h2>Request Submitted Successfully</h2>
              <p className="subtitle">Your request to join this company has been sent to the administrator</p>

              {/* Company Info Box */}
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-dark)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Building2 size={24} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TARGET ORGANIZATION</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                      {company?.name || requestData?.joinRequest?.companyId?.name || 'HelpDesk+ Company'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                  <span className="badge badge-pending">🟡 Pending Approval</span>
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                You will be able to access HelpDesk+ features after your company administrator approves your request.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  className="btn btn-secondary btn-full"
                  onClick={fetchStatus}
                  disabled={refreshing}
                >
                  <RefreshCw size={18} className={refreshing ? 'spinner' : ''} /> Check Request Status
                </button>

                <button className="btn btn-secondary btn-full" onClick={handleLogout}>
                  <LogOut size={18} /> Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
