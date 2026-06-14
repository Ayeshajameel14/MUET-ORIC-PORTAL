import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import oricLogo from '../assets/oric-logo.webp';
import './Auth.css';

function validate(email, password) {
  const errs = {};
  if (!email.trim()) errs.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address.';
  if (!password) errs.password = 'Password is required.';
  else if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
  return errs;
}

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [touched, setTouched] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors(validate(name === 'email' ? value : form.email, name === 'password' ? value : form.password));
    }
    setServerError('');
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(validate(form.email, form.password));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errs = validate(form.email, form.password);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const result = await login(form.email, form.password);
    if (result.success) navigate('/dashboard');
    else setServerError(result.error);
  }

  const fieldCls = (name) =>
    `form-group${errors[name] && touched[name] ? ' form-group--error' : ''}${!errors[name] && touched[name] && form[name] ? ' form-group--valid' : ''}`;

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
          <div className="auth-card__form-title">Sign in</div>
          <div className="auth-card__form-sub">Use your MUET institutional credentials to continue.</div>

          {serverError && (
            <div className="auth-alert auth-alert--error" role="alert">
              <AlertCircle size={15} />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className={fieldCls('email')}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email" type="email" name="email"
                value={form.email} onChange={handleChange} onBlur={handleBlur}
                placeholder="yourname@muet.edu.pk"
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <span className="form-error"><AlertCircle size={12} />{errors.email}</span>
              )}
            </div>

            <div className={fieldCls('password')}>
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <input
                  id="password" type={showPwd ? 'text' : 'password'} name="password"
                  value={form.password} onChange={handleChange} onBlur={handleBlur}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button type="button" className="pwd-eye" onClick={() => setShowPwd(v => !v)} aria-label="Toggle password">
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && touched.password && (
                <span className="form-error"><AlertCircle size={12} />{errors.password}</span>
              )}
            </div>

            <div className="form-row-between">
              <label className="check-row">
                <input type="checkbox" /> <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
              {isLoading ? <><Loader2 size={15} className="spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div className="or-divider"><span>Don't have an account?</span></div>
          <Link to="/register" className="btn-outline btn-full">Create an Account</Link>

          <div className="demo-hint">
            <strong>Demo credentials</strong><br />
            admin@oric.muet.edu.pk &nbsp;/&nbsp; Admin@123<br />
            23sw155@students.muet.edu.pk &nbsp;/&nbsp; Student@123
          </div>
        </div>
      </div>
    </div>
  );
}
