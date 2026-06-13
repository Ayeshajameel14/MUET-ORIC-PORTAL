import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FlaskConical, BookOpen, Award, GraduationCap,
  Lightbulb, Link2, Building2, TrendingUp, Users,
  ArrowRight, Clock, CheckCircle2, AlertCircle,
  FileText, ExternalLink
} from 'lucide-react';
import './Dashboard.css';

const STATS = [
  { label: 'Active Projects', value: '47', trend: '+5 this semester', icon: FlaskConical, color: 'navy' },
  { label: 'Publications (2024)', value: '138', trend: '+22 from last year', icon: BookOpen, color: 'green' },
  { label: 'Research Grants', value: 'PKR 84M', trend: '12 active grants', icon: Award, color: 'blue' },
  { label: 'Registered Researchers', value: '312', trend: 'Faculty and scholars', icon: Users, color: 'teal' },
];

const PROGRAMS = [
  {
    id: 'research',
    title: 'Research and Development',
    desc: 'Submit and track research proposals, manage ongoing projects, and collaborate across departments.',
    icon: FlaskConical,
    to: '/dashboard/research',
    tag: 'Core Program',
  },
  {
    id: 'grants',
    title: 'Grants and Funding',
    desc: 'Explore HEC-NRPU, PSF, Ignite Seed Fund, and international funding opportunities. Submit and track your applications.',
    icon: Award,
    to: '/dashboard/grants',
    tag: 'Funding',
  },
  {
    id: 'cpd',
    title: 'CPD Courses',
    desc: 'Continuing Professional Development programs including workshops, language courses, and technical skill certification.',
    icon: GraduationCap,
    to: '/dashboard/cpd',
    tag: 'Training',
  },
  {
    id: 'innovation',
    title: 'Innovation and IP Management',
    desc: 'File patents, register intellectual property, and access support for technology transfer and commercialization.',
    icon: Lightbulb,
    to: '/dashboard/innovation',
    tag: 'IP and Patents',
  },
  {
    id: 'linkages',
    title: 'University Linkages (ULTT)',
    desc: 'University-Industry collaboration platform. Connect with partners, arrange internships, and conduct joint R&D.',
    icon: Link2,
    to: '/dashboard/linkages',
    tag: 'Industry',
  },
  {
    id: 'basr',
    title: 'Board of Advanced Studies and Research',
    desc: 'Postgraduate research oversight, PhD committee management, thesis submissions, and academic governance.',
    icon: Building2,
    to: '/dashboard/basr',
    tag: 'Academic',
  },
  {
    id: 'udu',
    title: 'University Development Unit',
    desc: 'External funding proposals, development projects, donor relations, and institutional capacity building.',
    icon: TrendingUp,
    to: '/dashboard/udu',
    tag: 'Development',
  },
  {
    id: 'siren',
    title: 'SIREN Network',
    desc: 'Sindh Innovation Research Education Network, connecting researchers across Sindh for collaborative projects.',
    icon: Users,
    to: '/dashboard/siren',
    tag: 'Network',
  },
];

const ANNOUNCEMENTS = [
  {
    id: 1,
    type: 'deadline',
    title: 'HEC-NRPU Grant Deadline',
    body: 'Applications for the National Research Program for Universities (NRPU) Batch 2025 close on 15 July 2025. Submit via the ORIC office.',
    date: 'June 10, 2025',
    icon: AlertCircle,
  },
  {
    id: 2,
    type: 'event',
    title: 'Research Symposium 2025',
    body: 'Annual MUET Research Symposium scheduled for 28 July 2025. Faculty and PhD scholars are invited to submit abstracts by 20 June.',
    date: 'June 5, 2025',
    icon: FlaskConical,
  },
  {
    id: 3,
    type: 'cpd',
    title: 'New CPD Batch: Research Methodology',
    body: 'A new batch of the Research Methodology and Academic Writing CPD course starts July 1. Register through ORIC before June 25.',
    date: 'June 2, 2025',
    icon: GraduationCap,
  },
  {
    id: 4,
    type: 'notice',
    title: 'Annual Self-Assessment Scorecard Open',
    body: 'HEC ORIC Annual Self-Assessment Scorecard for FY 2024-25 is now open. All units must submit by 30 September 2025.',
    date: 'May 30, 2025',
    icon: CheckCircle2,
  },
];

const ACTIVE_GRANTS = [
  { title: 'Smart Grid Integration for Sindh', agency: 'HEC-NRPU', amount: 'PKR 9.5M', status: 'Active', pi: 'Dr. Imran Hussain' },
  { title: 'Water Quality Monitoring System', agency: 'PSF', amount: 'PKR 4.2M', status: 'Active', pi: 'Dr. Sara Memon' },
  { title: 'Advanced Material Synthesis', agency: 'Sindh HEC', amount: 'PKR 2.8M', status: 'Under Review', pi: 'Dr. Khalid Jamali' },
  { title: 'IoT-Based Precision Agriculture', agency: 'Ignite', amount: 'PKR 3.1M', status: 'Active', pi: 'Prof. Nadia Baloch' },
];

function StatCard({ label, value, trend, icon: Icon, color }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card__icon">
        <Icon size={20} />
      </div>
      <div className="stat-card__body">
        <div className="stat-card__value">{value}</div>
        <div className="stat-card__label">{label}</div>
        <div className="stat-card__trend">{trend}</div>
      </div>
    </div>
  );
}

function ProgramCard({ title, desc, icon: Icon, to, tag }) {
  return (
    <Link to={to} className="program-card">
      <div className="program-card__top">
        <div className="program-card__icon">
          <Icon size={20} />
        </div>
        <span className="program-card__tag">{tag}</span>
      </div>
      <h3 className="program-card__title">{title}</h3>
      <p className="program-card__desc">{desc}</p>
      <div className="program-card__footer">
        <span>Open</span>
        <ArrowRight size={15} />
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="dashboard">
      {/* Welcome */}
      <div className="dashboard__welcome">
        <div>
          <h1 className="dashboard__title">
            {greeting}, {user?.name?.split(' ')[0]}
          </h1>
          <p className="dashboard__subtitle">
            Welcome to the ORIC Portal, your central hub for research, innovation, and collaboration at MUET Jamshoro.
          </p>
        </div>
        <div className="dashboard__welcome-meta">
          <span className="badge badge--green">{user?.role}</span>
          <span className="dashboard__dept">{user?.department}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Body */}
      <div className="dashboard__body">
        <section className="dashboard__section">
          <div className="section-header">
            <h2 className="section-title">Programs and Services</h2>
            <p className="section-sub">All programs offered under ORIC, MUET Jamshoro</p>
          </div>
          <div className="programs-grid">
            {PROGRAMS.map(p => <ProgramCard key={p.id} {...p} />)}
          </div>
        </section>

        <aside className="dashboard__aside">
          {/* Announcements */}
          <div className="aside-card">
            <div className="aside-card__header">
              <h3>Announcements</h3>
              <Link to="/dashboard/announcements" className="aside-link">
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="announcement-list">
              {ANNOUNCEMENTS.map(a => (
                <div key={a.id} className={`announcement announcement--${a.type}`}>
                  <div className="announcement__icon">
                    <a.icon size={14} />
                  </div>
                  <div className="announcement__body">
                    <div className="announcement__title">{a.title}</div>
                    <p className="announcement__text">{a.body}</p>
                    <span className="announcement__date">
                      <Clock size={11} /> {a.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Grants */}
          <div className="aside-card">
            <div className="aside-card__header">
              <h3>Active Research Grants</h3>
              <Link to="/dashboard/grants" className="aside-link">
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grants-list">
              {ACTIVE_GRANTS.map((g, i) => (
                <div key={i} className="grant-item">
                  <div className="grant-item__top">
                    <span className="grant-item__title">{g.title}</span>
                    <span className={`badge ${g.status === 'Active' ? 'badge--green' : 'badge--yellow'}`}>
                      {g.status}
                    </span>
                  </div>
                  <div className="grant-item__meta">
                    <span>{g.agency}</span>
                    <span className="dot-sep">·</span>
                    <span>{g.amount}</span>
                    <span className="dot-sep">·</span>
                    <span>{g.pi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="aside-card">
            <div className="aside-card__header">
              <h3>Quick Links</h3>
            </div>
            <div className="quick-links">
              {[
                { label: 'MUET Main Website', href: 'https://www.muet.edu.pk' },
                { label: 'ORIC Official Site', href: 'https://oric.muet.edu.pk' },
                { label: 'HEC Research Portal', href: 'https://rfi.hec.gov.pk' },
                { label: 'Research Publications', href: '/dashboard/publications' },
                { label: 'Submit a Proposal', href: '/dashboard/research' },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="quick-link-item"
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span>{l.label}</span>
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* About ORIC */}
      <section className="about-strip">
        <div className="about-strip__body">
          <div className="about-strip__text">
            <h2>About ORIC, MUET</h2>
            <p>
              The Office of Research, Innovation and Commercialization (ORIC) at Mehran University of
              Engineering and Technology serves as the central hub for research activities, bridging
              academia and industry. ORIC fosters innovation, manages intellectual property, facilitates
              research grants, and connects the university with national and international partners.
            </p>
            <p>
              Key functions include supporting research funding applications (HEC-NRPU, PSF, Ignite),
              organizing Continuing Professional Development (CPD) courses, managing the BASR and UDU
              units, overseeing the SIREN network, and running the Innovation and Entrepreneurship Center.
            </p>
          </div>
          <div className="about-strip__objectives">
            <h3>Core Objectives</h3>
            <ul>
              {[
                'Increase and diversify external research funding',
                'Improve transformation of research into public benefit through patents',
                'Strengthen university-industry relationships',
                'Promote entrepreneurship and technology commercialization',
                'Organize Continuing Professional Development (CPD) courses',
                'Support recruitment and retention of top research faculty',
                'Enhance the university endowment fund',
              ].map(obj => (
                <li key={obj}>
                  <CheckCircle2 size={14} />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
