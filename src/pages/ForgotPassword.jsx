import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle2, Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import oricLogo from '../assets/oric-logo.webp';
import './Auth.css';

const MUET_EMAIL_REGEX = /^[^\s@]+@([a-zA-Z0-9-]+\.)*muet\.edu\.pk$/i;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { requestPasswordReset, resetPassword, isLoading } = useAuth();

  const [step, setStep] = useState(1); // 1 = email, 2 = code + new password, 3 = success
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [devCode, setDevCode] = useState(''); // shown in demo so the flow can be tested end to end
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email.trim()) { setError('Email address is required.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return; }
    if (!MUET_EMAIL_REGEX.test(email)) { setError('Only official MUET email addresses (ending in muet.edu.pk) are accepted.'); return; }

    const result = await requestPasswordReset(email);
    if (result.success) {
      setDevCode(result.code);
      setStep(2);
    } else {
      setError(result.error);
    }
  }

  async function handleResetSubmit(e) {
    e.preventDefault();
    setError('');

    if (!code.trim()) { setError('Please enter the verification code.'); return; }
    if (!newPassword) { setError('Please enter a new password.'); return; }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (!/[A-Z]/.test(newPassword)) { setError('Include at least one uppercase letter.'); return; }
    if (!/[0-9]/.test(newPassword)) { setError('Include at least one number.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }

    const result = await resetPassword(email, code.trim(), newPassword);
    if (result.success) {
      setStep(3);
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="auth-page-wrap">
      <div className="auth-card">
        <div className="auth-card__accent" />

        <div className="auth-card__head">
          <div className="auth-card__brand">
            <img src={oricLogo} alt="ORIC MUET" className="auth-logo-img" />
            <div className="auth-card__brand-text">
              <div className="auth-card__title">ORIC Portal</div>
              <div className="auth-card__subtitle">Office of Research, Innovation &amp; Commercialization</div>
              <div className="auth-card__uni">Mehran University of Engineering &amp; Technology, Jamshoro</div>
            </div>
          </div>
        </div>

        <div className="auth-card__body">

          {step === 1 && (
            <>
              <div className="auth-card__form-title">Reset your password</div>
              <div className="auth-card__form-sub">Enter your MUET email address and we will send you a verification code.</div>

              {error && (
                <div className="auth-alert auth-alert--error" role="alert">
                  <AlertCircle size={15} /><span>{error}</span>
                </div>
              )}

              <form onSubmit={handleEmailSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="fp-email">Email Address</label>
                  <input
                    id="fp-email" type="email" name="email"
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="yourname@muet.edu.pk"
                    autoComplete="email"
                  />
                </div>

                <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
                  {isLoading ? <><Loader2 size={15} className="spin" />Sending code...</> : 'Send Verification Code'}
                </button>
              </form>

              <div className="or-divider"><span>Remembered your password?</span></div>
              <Link to="/login" className="btn-outline btn-full">
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </>
          )}

          {step === 2 && (
            <>
              <div className="auth-card__form-title">Enter verification code</div>
              <div className="auth-card__form-sub">
                A 6-digit code was sent to <strong>{email}</strong>. Enter it below along with your new password.
              </div>

              {devCode && (
                <div className="auth-alert auth-alert--info" role="status">
                  <CheckCircle2 size={15} />
                  <span>Demo mode: your verification code is <strong>{devCode}</strong> (in production this would be emailed to you).</span>
                </div>
              )}

              {error && (
                <div className="auth-alert auth-alert--error" role="alert">
                  <AlertCircle size={15} /><span>{error}</span>
                </div>
              )}

              <form onSubmit={handleResetSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="fp-code">Verification Code</label>
                  <input
                    id="fp-code" type="text" inputMode="numeric" maxLength={6}
                    value={code} onChange={e => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="6-digit code"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fp-new-password">New Password</label>
                  <div className="input-wrap">
                    <input
                      id="fp-new-password" type={showPwd ? 'text' : 'password'}
                      value={newPassword} onChange={e => setNewPassword(e.target.value)}
                      placeholder="Min. 8 characters" autoComplete="new-password"
                    />
                    <button type="button" className="pwd-eye" onClick={() => setShowPwd(v => !v)}>
                      {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="fp-confirm-password">Confirm New Password</label>
                  <input
                    id="fp-confirm-password" type={showPwd ? 'text' : 'password'}
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password" autoComplete="new-password"
                  />
                </div>

                <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
                  {isLoading ? <><Loader2 size={15} className="spin" />Resetting password...</> : 'Reset Password'}
                </button>
              </form>

              <div className="or-divider"><span>or</span></div>
              <button type="button" className="btn-outline btn-full" onClick={() => { setStep(1); setError(''); setCode(''); }}>
                <ArrowLeft size={14} /> Use a different email
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="auth-card__form-title">Password updated</div>
              <div className="auth-card__form-sub">
                Your password has been reset successfully. You can now sign in with your new password.
              </div>

              <div className="auth-alert auth-alert--success" role="status">
                <CheckCircle2 size={15} />
                <span>Password changed for <strong>{email}</strong></span>
              </div>

              <button type="button" className="btn-primary btn-full" onClick={() => navigate('/login')}>
                Go to Sign In
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
