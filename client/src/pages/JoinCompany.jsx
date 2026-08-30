import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { companyApi } from '../api/companyApi';
import { Search, Building2, MapPin, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export const JoinCompany = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [foundCompany, setFoundCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setFoundCompany(null);

    if (!code.trim()) {
      setError('Please enter a company code.');
      return;
    }

    setLoading(true);

    try {
      const res = await companyApi.getByCode(code.trim().toUpperCase());
      if (res.success && res.data?.company) {
        setFoundCompany(res.data.company);
      }
    } catch (err) {
      setError('Company code is invalid or company is unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (foundCompany) {
      navigate('/join-company/register', { state: { company: foundCompany } });
    }
  };

  return (
    <div className="app-container">
      <div className="center-content">
        <div className="card">
          <Link to="/onboarding" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Options
          </Link>

          <h2>Join Existing Company</h2>
          <p className="subtitle">Enter the unique company code provided by your administrator</p>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} style={{ shrink: 0, marginTop: 2 }} />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label className="form-label" htmlFor="companyCode">Company Code *</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  id="companyCode"
                  type="text"
                  className="form-input"
                  placeholder="e.g. ABC-48291"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                  style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? <div className="spinner" /> : <><Search size={18} /> Find</>}
                </button>
              </div>
            </div>
          </form>

          {/* Company Found Preview Card (Section 10 Spec) */}
          {foundCompany && (
            <div
              style={{
                marginTop: '1.75rem',
                padding: '1.5rem',
                backgroundColor: 'var(--bg-dark)',
                border: '1px solid var(--border-focus)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Building2 size={22} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Company Found</div>
                  <h3 style={{ fontSize: '1.15rem' }}>{foundCompany.name}</h3>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                <MapPin size={16} />
                {foundCompany.city || foundCompany.state || foundCompany.country
                  ? `${foundCompany.city ? foundCompany.city + ', ' : ''}${foundCompany.state || foundCompany.country}`
                  : 'Registered Organization'}
              </div>

              <button className="btn btn-success btn-full" onClick={handleContinue}>
                Continue to Account Creation <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
