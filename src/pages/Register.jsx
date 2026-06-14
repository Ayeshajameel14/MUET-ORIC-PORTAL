import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, Check } from 'lucide-react';
import oricLogo from '../assets/oric-logo.webp';
import './Auth.css';

const DEPARTMENTS = [
  'Architecture Engineering','Basic Sciences & Related Studies','Biomedical Engineering',
  'Chemical Engineering','Civil Engineering','City & Regional Planning',
  'Computer Systems Engineering','Electrical Engineering','Electronics Engineering',
  'Industrial Engineering & Management','Mechanical Engineering','Mechatronics Engineering',
  'Metallurgy & Materials Engineering','Mining Engineering','Software Engineering',
  'Telecommunication Engineering','Textile Engineering','ORIC Administration','IECT / IICT','Other',
];

const ROLES = ['Student', 'Faculty','Researcher','PhD Scholar','MS Scholar','Staff','Admin'];

// Only official MUET email addresses are accepted (any subdomain ending in muet.edu.pk)
const MUET_EMAIL_REGEX = /^[^\s@]+@([a-zA-Z0-9-]+\.)*muet\.edu\.pk$/i;

function validateField(name, value, form) {
  switch (name) {
    case 'fullName':
      if (!value.trim()) return 'Full name is required.';
      if (value.trim().length < 3) return 'Name must be at least 3 characters.';
      if (!/^[a-zA-Z\s.]+$/.test(value)) return 'Name should only contain letters.';
      return '';
    case 'email':
      if (!value.trim()) return 'Email address is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
      if (!MUET_EMAIL_REGEX.test(value)) return 'Only official MUET email addresses (ending in muet.edu.pk) are accepted.';
      return '';
    case 'department':
      if (!value) return 'Please select your department.';
      return '';
    case 'role':
      if (!value) return 'Please select your role.';
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
    default: return '';
  }
}

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

export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [form, setForm] = useState({
    fullName:'', email:'', department:'', role:'', password:'', confirmPassword:'', agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const strength = pwdScore(form.password);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm(f => ({ ...f, [name]: val }));
    if (touched[name]) {
      setErrors(p => ({ ...p, [name]: validateField(name, val, { ...form, [name]: val }) }));
    }
    if (name === 'password' && touched.confirmPassword) {
      setErrors(p => ({ ...p, confirmPassword: validateField('confirmPassword', form.confirmPassword, { ...form, password: val }) }));
    }
    setServerError('');
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(p => ({ ...p, [name]: validateField(name, form[name], form) }));
  }

  function toggleAgree() {
    setForm(f => ({ ...f, agreeTerms: !f.agreeTerms }));
    setTouched(t => ({ ...t, agreeTerms: true }));
    setErrors(p => ({ ...p, agreeTerms: !form.agreeTerms ? '' : 'You must accept the terms to continue.' }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fields = ['fullName','email','department','role','password','confirmPassword'];
    setTouched(Object.fromEntries([...fields, 'agreeTerms'].map(f => [f, true])));
    const newErr = {};
    fields.forEach(f => { const er = validateField(f, form[f], form); if (er) newErr[f] = er; });
    if (!form.agreeTerms) newErr.agreeTerms = 'You must accept the terms to continue.';
    setErrors(newErr);
    if (Object.keys(newErr).length) return;
    const result = await register(form);
    if (result.success) navigate('/dashboard');
    else setServerError(result.error);
  }

  const fc = name =>
    `form-group${errors[name] && touched[name] ? ' form-group--error' : ''}${!errors[name] && touched[name] && form[name] ? ' form-group--valid' : ''}`;

  return (
    <div className="auth-page-wrap auth-page-wrap--register">
      <div className="auth-card auth-card--wide">
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
          <div className="auth-card__form-title">Create your account</div>
          <div className="auth-card__form-sub">Fill in your details to get access to the ORIC portal.</div>

          {serverError && (
            <div className="auth-alert auth-alert--error" role="alert">
              <AlertCircle size={15} /><span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid-2">
              <div className={fc('fullName')}>
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input id="fullName" type="text" name="fullName" value={form.fullName}
                  onChange={handleChange} onBlur={handleBlur} placeholder="Dr. / Prof. / Mr. / Ms." autoComplete="name" />
                {errors.fullName && touched.fullName && <span className="form-error"><AlertCircle size={12}/>{errors.fullName}</span>}
              </div>

              <div className={fc('role')}>
                <label htmlFor="role">Role <span className="required">*</span></label>
                <select id="role" name="role" value={form.role} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Select your role</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.role && touched.role && <span className="form-error"><AlertCircle size={12}/>{errors.role}</span>}
              </div>
            </div>

            <div className={fc('email')}>
              <label htmlFor="reg-email">Email Address <span className="required">*</span></label>
              <input id="reg-email" type="email" name="email" value={form.email}
                onChange={handleChange} onBlur={handleBlur} placeholder="yourname@students.muet.edu.pk" autoComplete="email" />
              <span className="field-hint">Only official MUET email addresses (ending in muet.edu.pk) are accepted.</span>
              {errors.email && touched.email && <span className="form-error"><AlertCircle size={12}/>{errors.email}</span>}
            </div>

            <div className={fc('department')}>
              <label htmlFor="department">Department / Institute <span className="required">*</span></label>
              <select id="department" name="department" value={form.department} onChange={handleChange} onBlur={handleBlur}>
                <option value="">Select your department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.department && touched.department && <span className="form-error"><AlertCircle size={12}/>{errors.department}</span>}
            </div>

            <div className="form-grid-2">
              <div className={fc('password')}>
                <label htmlFor="reg-password">Password <span className="required">*</span></label>
                <div className="input-wrap">
                  <input id="reg-password" type={showPwd ? 'text' : 'password'} name="password" value={form.password}
                    onChange={handleChange} onBlur={handleBlur} placeholder="Min. 8 characters" autoComplete="new-password" />
                  <button type="button" className="pwd-eye" onClick={() => setShowPwd(v => !v)}>
                    {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {form.password && (
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
                {errors.password && touched.password && <span className="form-error"><AlertCircle size={12}/>{errors.password}</span>}
              </div>

              <div className={fc('confirmPassword')}>
                <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
                <div className="input-wrap">
                  <input id="confirmPassword" type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword}
                    onChange={handleChange} onBlur={handleBlur} placeholder="Re-enter password" autoComplete="new-password" />
                  <button type="button" className="pwd-eye" onClick={() => setShowConfirm(v => !v)}>
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {!errors.confirmPassword && touched.confirmPassword && form.confirmPassword && form.password === form.confirmPassword && (
                  <span className="form-success"><CheckCircle2 size={12}/>Passwords match</span>
                )}
                {errors.confirmPassword && touched.confirmPassword && <span className="form-error"><AlertCircle size={12}/>{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className={`form-group${errors.agreeTerms && touched.agreeTerms ? ' form-group--error' : ''}`} style={{marginBottom:18}}>
              <div
                className={`custom-check-row ${form.agreeTerms ? 'custom-check-row--checked' : ''}`}
                onClick={toggleAgree}
                role="checkbox"
                aria-checked={form.agreeTerms}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAgree(); } }}
              >
                <span className="custom-check-box">
                  {form.agreeTerms && <Check size={12} strokeWidth={3} />}
                </span>
                <span className="custom-check-label">
                  I agree to the{' '}
                  <Link to="/terms" className="inline-link" onClick={(e) => e.stopPropagation()}>Terms of Use</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="inline-link" onClick={(e) => e.stopPropagation()}>Privacy Policy</Link>
                  {' '}of MUET ORIC Portal
                </span>
              </div>
              {errors.agreeTerms && touched.agreeTerms && <span className="form-error"><AlertCircle size={12}/>{errors.agreeTerms}</span>}
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
              {isLoading ? <><Loader2 size={15} className="spin" />Creating account...</> : 'Create Account'}
            </button>
          </form>

          <div className="or-divider"><span>Already have an account?</span></div>
          <Link to="/login" className="btn-outline btn-full">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
