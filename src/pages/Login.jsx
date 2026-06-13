import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import oricLogo from '../assets/oric-logo.webp';
import './Auth.css';

function validate(email, password) {
  const errs = {};
  if (!email.trim()) {
    errs.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errs.email = 'Enter a valid email address.';
  }
  if (!password) {
    errs.password = 'Password is required.';
  } else if (password.length < 6) {
    errs.password = 'Password must be at least 6 characters.';
  }
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
      const errs = validate(
        name === 'email' ? value : form.email,
        name === 'password' ? value : form.password
      );
      setErrors(errs);
    }
    setServerError('');
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const errs = validate(form.email, form.password);
    setErrors(errs);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errs = validate(form.email, form.password);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const result = await login(form.email, form.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setServerError(result.error);
    }
  }

  return (
    <div className="auth-centered-page">
      <div className="auth-card auth-card--centered">

        {/* Logo + header */}
        <div className="auth-card__logo-header">
          <img src={oricLogo} alt="ORIC MUET Logo" className="auth-logo-img" />
          <div className="auth-card__header-text">
            <h1 className="auth-card__portal-title">ORIC Portal</h1>
            <p className="auth-card__portal-sub">
              Office of Research, Innovation &amp; Commercialization
            </p>
            <p className="auth-card__portal-uni">
              Mehran University of Engineering &amp; Technology, Jamshoro
            </p>
          </div>
        </div>

        <div className="auth-card__divider" />

        <div className="auth-card__form-header">
          <h2>Sign in to your account</h2>
          <p>Use your MUET institutional credentials</p>
        </div>

        {serverError && (
          <div className="auth-alert auth-alert--error" role="alert">
            <AlertCircle size={16} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${errors.email && touched.email ? 'form-group--error' : ''} ${!errors.email && touched.email && form.email ? 'form-group--valid' : ''}`}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="yourname@muet.edu.pk"
              autoComplete="email"
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              aria-invalid={errors.email && touched.email ? 'true' : 'false'}
            />
            {errors.email && touched.email && (
              <span id="email-error" className="form-error" role="alert">
                <AlertCircle size={13} /> {errors.email}
              </span>
            )}
          </div>

          <div className={`form-group ${errors.password && touched.password ? 'form-group--error' : ''} ${!errors.password && touched.password && form.password ? 'form-group--valid' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="input-with-action">
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-describedby={errors.password && touched.password ? 'password-error' : undefined}
                aria-invalid={errors.password && touched.password ? 'true' : 'false'}
              />
              <button
                type="button"
                className="pwd-toggle"
                onClick={() => setShowPwd(v => !v)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <span id="password-error" className="form-error" role="alert">
                <AlertCircle size={13} /> {errors.password}
              </span>
            )}
          </div>

          <div className="form-row-between">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 size={16} className="spin" /> Signing in...</>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-divider"><span>New to ORIC Portal?</span></div>

        <Link to="/register" className="btn-secondary btn-full">
          Create an Account
        </Link>

        <div className="auth-demo-hint">
          <strong>Demo credentials:</strong><br />
          admin@oric.muet.edu.pk / Admin@123
        </div>
      </div>
    </div>
  );
}
