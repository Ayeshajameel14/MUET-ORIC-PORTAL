import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Settings, KeyRound, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, User } from 'lucide-react';
import '../pages/GrantsPage.css';
import '../pages/Auth.css';
import './SettingsPage.css';

function pwdScore(pwd) {
  if (!pwd) return { score: 0, label: '', color: '' };
  let s = 0;
  if (pwd.length >= 8) s++;
  if (pwd.length >= 12) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  if (s <= 1) return { score: s, label: 'Weak', color: '#bc3c2e' };
  if (s <= 3) return { score: s, label: 'Fair', color: '#c4870c' };
  return { score: s, label: 'Strong', color: '#1a6b3c' };
}

export default function SettingsPage() {
  const { user, changePassword, isLoading } = useAuth();

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const strength = pwdScore(form.newPassword);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError('');
    setSuccess('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.currentPassword) { setError('Please enter your current password.'); return; }
    if (!form.newPassword) { setError('Please enter a new password.'); return; }
    if (form.newPassword.length < 8) { setError('New password must be at least 8 characters.'); return; }
    if (!/[A-Z]/.test(form.newPassword)) { setError('Include at least one uppercase letter.'); return; }
    if (!/[0-9]/.test(form.newPassword)) { setError('Include at least one number.'); return; }
    if (form.newPassword !== form.confirmPassword) { setError('New passwords do not match.'); return; }
    if (form.newPassword === form.currentPassword) { setError('New password must be different from your current password.'); return; }

    const result = await changePassword(form.currentPassword, form.newPassword);
    if (result.success) {
      setSuccess('Your password has been updated successfully.');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="settings-page">
      <Link to="/dashboard" className="back-link"><ArrowLeft size={14} /> Back to Dashboard</Link>

      <div className="page-head">
        <div className="page-head__icon"><Settings size={20} /></div>
        <div>
          <h1>Settings</h1>
          <p>Manage your account profile and security settings.</p>
        </div>
      </div>

      {/* Profile section */}
      <div className="settings-section">
        <div className="settings-section__head">
          <div className="settings-section__icon"><User size={18} /></div>
          <div>
            <h2>Account Profile</h2>
            <p>Your account information as registered on the ORIC Portal.</p>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-row__avatar">{user?.avatar}</div>
          <div>
            <div className="profile-row__name">{user?.name}</div>
            <div className="profile-row__meta">{user?.role} &middot; {user?.department}</div>
            <div className="profile-row__email">{user?.email}</div>
          </div>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          To update your name, department, or role, please contact the ORIC office administration.
        </p>
      </div>

      {/* Change password section */}
      <div className="settings-section">
        <div className="settings-section__head">
          <div className="settings-section__icon"><KeyRound size={18} /></div>
          <div>
            <h2>Change Password</h2>
            <p>Update your password regularly to keep your account secure.</p>
          </div>
        </div>

        {error && (
          <div className="auth-alert auth-alert--error" role="alert">
            <AlertCircle size={15} /><span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-alert auth-alert--success" role="status">
            <CheckCircle2 size={15} /><span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="settings-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <div className="input-wrap">
              <input
                id="currentPassword" type={showCurrent ? 'text' : 'password'} name="currentPassword"
                value={form.currentPassword} onChange={handleChange}
                placeholder="Enter your current password" autoComplete="current-password"
              />
              <button type="button" className="pwd-eye" onClick={() => setShowCurrent(v => !v)}>
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="input-wrap">
              <input
                id="newPassword" type={showNew ? 'text' : 'password'} name="newPassword"
                value={form.newPassword} onChange={handleChange}
                placeholder="Min. 8 characters" autoComplete="new-password"
              />
              <button type="button" className="pwd-eye" onClick={() => setShowNew(v => !v)}>
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {form.newPassword && (
              <div className="pwd-strength">
                <div className="pwd-strength__bar">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="pwd-strength__seg"
                      style={{ background: i <= strength.score ? strength.color : '#dde1ea' }} />
                  ))}
                </div>
                <span className="pwd-strength__label" style={{ color: strength.color }}>{strength.label}</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              id="confirmNewPassword" type={showNew ? 'text' : 'password'} name="confirmPassword"
              value={form.confirmPassword} onChange={handleChange}
              placeholder="Re-enter new password" autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading} style={{ width: 'auto', padding: '10px 24px' }}>
            {isLoading ? <><Loader2 size={15} className="spin" />Updating...</> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
