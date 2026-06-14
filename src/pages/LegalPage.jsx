import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield } from 'lucide-react';
import oricLogo from '../assets/oric-logo.webp';
import './Auth.css';
import './LegalPage.css';

export function TermsOfUse() {
  return (
    <LegalLayout icon={FileText} title="Terms of Use">
      <p>
        These Terms of Use govern access to and use of the ORIC Portal provided by the Office of
        Research, Innovation and Commercialization (ORIC) at Mehran University of Engineering and
        Technology, Jamshoro.
      </p>
      <h3>1. Eligibility</h3>
      <p>
        Access to the ORIC Portal is restricted to current faculty, staff, researchers, and students
        of MUET who hold a valid official MUET email address. Accounts created with non-institutional
        email addresses are not permitted.
      </p>
      <h3>2. Account Responsibility</h3>
      <p>
        Users are responsible for maintaining the confidentiality of their login credentials and for
        all activity that occurs under their account. Any suspected unauthorized use should be
        reported to the ORIC office immediately.
      </p>
      <h3>3. Acceptable Use</h3>
      <p>
        The portal may be used only for legitimate academic, research, and administrative purposes
        related to ORIC programs, including grants, CPD courses, research projects, and innovation
        initiatives. Misuse of the platform may result in suspension of access.
      </p>
      <h3>4. Content Accuracy</h3>
      <p>
        Information submitted through the portal, including proposals, applications, and personal
        details, must be accurate and complete. ORIC reserves the right to verify submitted
        information with the relevant department.
      </p>
      <h3>5. Changes to These Terms</h3>
      <p>
        ORIC may update these Terms of Use from time to time. Continued use of the portal after any
        changes constitutes acceptance of the revised terms.
      </p>
    </LegalLayout>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalLayout icon={Shield} title="Privacy Policy">
      <p>
        This Privacy Policy explains how the ORIC Portal collects, uses, and protects information
        provided by users at Mehran University of Engineering and Technology, Jamshoro.
      </p>
      <h3>1. Information We Collect</h3>
      <p>
        When you register, we collect your name, official MUET email address, department, and role.
        Additional information may be collected when you submit research proposals, grant
        applications, or enroll in CPD courses.
      </p>
      <h3>2. How We Use Your Information</h3>
      <p>
        Your information is used to manage your account, process applications and submissions,
        communicate updates and announcements, and generate reports for ORIC administration.
      </p>
      <h3>3. Data Sharing</h3>
      <p>
        Information is shared only within MUET departments and ORIC units as necessary to process
        your requests. Data is not shared with third parties for marketing purposes.
      </p>
      <h3>4. Data Security</h3>
      <p>
        Reasonable administrative and technical measures are used to protect your information from
        unauthorized access, alteration, or disclosure.
      </p>
      <h3>5. Your Choices</h3>
      <p>
        You may update your account information or request account-related changes by contacting the
        ORIC office. To change your password, use the Settings page within the portal.
      </p>
    </LegalLayout>
  );
}

function LegalLayout({ icon: Icon, title, children }) {
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
          <div className="legal-title">
            <Icon size={18} />
            <span>{title}</span>
          </div>
          <div className="legal-content">
            {children}
          </div>

          <Link to="/register" className="btn-outline btn-full">
            <ArrowLeft size={14} /> Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
