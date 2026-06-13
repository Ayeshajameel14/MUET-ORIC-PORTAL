import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import oricLogo from '../assets/oric-logo.webp';
import './Auth.css';

const DEPARTMENTS = [
  'Architecture Engineering',
  'Basic Sciences & Related Studies',
  'Biomedical Engineering',
  'Chemical Engineering',
  'Civil Engineering',
  'City & Regional Planning',
  'Computer Systems Engineering',
  'Electrical Engineering',
  'Electronics Engineering',
  'Industrial Engineering & Management',
  'Mechanical Engineering',
  'Mechatronics Engineering',
  'Metallurgy & Materials Engineering',
  'Mining Engineering',
  'Software Engineering',
  'Telecommunication Engineering',
  'Textile Engineering',
  'ORIC Administration',
  'IECT / IICT',
  'Other',
];

const ROLES = ['Faculty', 'Researcher', 'PhD Scholar', 'MS Scholar', 'Staff', 'Admin'];

function validateField(name, value, form) {
  switch (name) {
    case 'fullName':
      if (!value.trim()) return 'Full name is required.';
      if (value.trim().length < 3) return 'Name must be at least 3 characters.';
      if (!/^[a-zA-Z\s.]+$/.test(value)) return 'Name should contain only letters.';
      return '';
    case 'email':
      if (!value.trim()) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
      return '';
    case 'employeeId':
      if (!value.trim()) return 'Employee / Student ID is required.';
      return '';
    case 'department':
      if (!value) return 'Select your department.';
      return '';
    case 'role':
      if (!value) return 'Select your role.';
      return '';
    case 'password':
      if (!value) return 'Password is required.';
      if (value.length < 8) return 'Password must be at least 8 characters.';
      if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter.';
      if (!/[0-9]/.test(value)) return 'Include at least one number.';
      return '';
    case 'confirmPassword':
      if (!value) return 'Please confirm your password.';
      if (value !== form.password) return 'Passwords do not match.';
      return '';
    default:
      return '';
  }
}

function getPasswordStrength(pwd) {
  if (!pwd) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { score, label: 'Weak', color: '#c0392b' };
  if (score <= 3) return { score, label: 'Fair', color: '#d68910' };
  return { score, label: 'Strong', color: '#1a6b3c' };
}

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [form, setForm] = useState({
    fullName: '', email: '', employeeId: '',
    department: '', role: '', password: '', confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const pwdStrength = getPasswordStrength(form.password);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm(f => ({ ...f, [name]: val }));
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, val, { ...form, [name]: val }),
      }));
    }
    if (name === 'password' && touched.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', form.confirmPassword, { ...form, password: val }),
      }));
    }
    setServerError('');
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, form[name], form),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fields = ['fullName', 'email', 'employeeId', 'department', 'role', 'password', 'confirmPassword'];
    const allTouched = Object.fromEntries(fields.map(f => [f, true]));
    setTouched({ ...allTouched, agreeTerms: true });

    const newErrors = {};
    fields.forEach(f => {
      const err = validateField(f, form[f], form);
      if (err) newErrors[f] = err;
    });
    if (!form.agreeTerms) newErrors.agreeTerms = 'You must agree to continue.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const result = await register(form);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setServerError(result.error);
    }
  }

  const fieldClass = (name) =>
    `form-group ${errors[name] && touched[name] ? 'form-group--error' : ''} ${!errors[name] && touched[name] && form[name] ? 'form-group--valid' : ''}`;

  return (
    <div className="auth-centered-page auth-centered-page--register">
      <div className="auth-card auth-card--centered auth-card--wide">

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
          <h2>Create your account</h2>
          <p>Join the MUET research community</p>
        </div>

        {serverError && (
          <div className="auth-alert auth-alert--error" role="alert">
            <AlertCircle size={16} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid-2">
            <div className={fieldClass('fullName')}>
              <label htmlFor="fullName">Full Name <span className="required">*</span></label>
              <input
                id="fullName" type="text" name="fullName"
                value={form.fullName} onChange={handleChange} onBlur={handleBlur}
                placeholder="Dr. / Prof. / Mr. / Ms."
                autoComplete="name"
              />
              {errors.fullName && touched.fullName && (
                <span className="form-error"><AlertCircle size={13} /> {errors.fullName}</span>
              )}
            </div>

            <div className={fieldClass('email')}>
              <label htmlFor="reg-email">Email Address <span className="required">*</span></label>
              <input
                id="reg-email" type="email" name="email"
                value={form.email} onChange={handleChange} onBlur={handleBlur}
                placeholder="yourname@muet.edu.pk"
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <span className="form-error"><AlertCircle size={13} /> {errors.email}</span>
              )}
            </div>

            <div className={fieldClass('employeeId')}>
              <label htmlFor="employeeId">Employee / Student ID <span className="required">*</span></label>
              <input
                id="employeeId" type="text" name="employeeId"
                value={form.employeeId} onChange={handleChange} onBlur={handleBlur}
                placeholder="e.g. MUET-2024-001"
              />
              {errors.employeeId && touched.employeeId && (
                <span className="form-error"><AlertCircle size={13} /> {errors.employeeId}</span>
              )}
            </div>

            <div className={fieldClass('role')}>
              <label htmlFor="role">Role <span className="required">*</span></label>
              <select
                id="role" name="role"
                value={form.role} onChange={handleChange} onBlur={handleBlur}
              >
                <option value="">Select your role</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.role && touched.role && (
                <span className="form-error"><AlertCircle size={13} /> {errors.role}</span>
              )}
            </div>
          </div>

          <div className={fieldClass('department')}>
            <label htmlFor="department">Department / Institute <span className="required">*</span></label>
            <select
              id="department" name="department"
              value={form.department} onChange={handleChange} onBlur={handleBlur}
            >
              <option value="">Select your department</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.department && touched.department && (
              <span className="form-error"><AlertCircle size={13} /> {errors.department}</span>
            )}
          </div>

          <div className="form-grid-2">
            <div className={fieldClass('password')}>
              <label htmlFor="reg-password">Password <span className="required">*</span></label>
              <div className="input-with-action">
                <input
                  id="reg-password"
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                />
                <button type="button" className="pwd-toggle" onClick={() => setShowPwd(v => !v)}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="pwd-strength">
                  <div className="pwd-strength__bar">
                    {[1,2,3,4,5].map(i => (
                      <div
                        key={i}
                        className="pwd-strength__seg"
                        style={{ background: i <= pwdStrength.score ? pwdStrength.color : '#d0d6e2' }}
                      />
                    ))}
                  </div>
                  <span style={{ color: pwdStrength.color, fontSize: '12px', fontWeight: 500 }}>
                    {pwdStrength.label}
                  </span>
                </div>
              )}
              {errors.password && touched.password && (
                <span className="form-error"><AlertCircle size={13} /> {errors.password}</span>
              )}
            </div>

            <div className={fieldClass('confirmPassword')}>
              <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
              <div className="input-with-action">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                />
                <button type="button" className="pwd-toggle" onClick={() => setShowConfirm(v => !v)}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {!errors.confirmPassword && touched.confirmPassword && form.confirmPassword && form.password === form.confirmPassword && (
                <span className="form-success"><CheckCircle2 size={13} /> Passwords match</span>
              )}
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="form-error"><AlertCircle size={13} /> {errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className={`form-group form-group--checkbox ${errors.agreeTerms && touched.agreeTerms ? 'form-group--error' : ''}`}>
            <label className="checkbox-label checkbox-label--block">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>
                I agree to the <a href="#" className="inline-link">Terms of Use</a> and{' '}
                <a href="#" className="inline-link">Privacy Policy</a> of MUET ORIC Portal
              </span>
            </label>
            {errors.agreeTerms && touched.agreeTerms && (
              <span className="form-error"><AlertCircle size={13} /> {errors.agreeTerms}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 size={16} className="spin" /> Creating account...</>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-divider"><span>Already have an account?</span></div>
        <Link to="/login" className="btn-secondary btn-full">Sign In</Link>
      </div>
    </div>
  );
}
