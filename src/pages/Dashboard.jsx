import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FlaskConical, BookOpen, Award, GraduationCap,
  Lightbulb, Link2, Building2, TrendingUp, Users,
  ArrowRight, Clock, CheckCircle2, AlertCircle, FileText, ExternalLink
} from 'lucide-react';
import './Dashboard.css';

const STATS = [
  { label: 'Active Projects',       value: '47',      trend: '+5 this semester',    icon: FlaskConical, color: 'navy'  },
  { label: 'Publications (2024)',   value: '138',     trend: '+22 from last year',  icon: BookOpen,     color: 'green' },
  { label: 'Research Grants',       value: 'PKR 84M', trend: '12 active grants',    icon: Award,        color: 'blue'  },
  { label: 'Registered Researchers',value: '312',     trend: 'Faculty and scholars',icon: Users,        color: 'teal'  },
];

const PROGRAMS = [
  { id:'research',     title:'Research and Development',                     desc:'Submit and track proposals, manage ongoing projects, and collaborate across departments.',                                               icon:FlaskConical, to:'/dashboard/research',     tag:'Core Program' },
  { id:'grants',       title:'Grants and Funding',                           desc:'Explore HEC-NRPU, PSF, Ignite Seed Fund, and international funding. Submit and track applications.',                                     icon:Award,        to:'/dashboard/grants',        tag:'Funding'      },
  { id:'cpd',          title:'CPD Courses',                                  desc:'Continuing Professional Development: language courses, workshops, and technical skill certification.',                                    icon:GraduationCap,to:'/dashboard/cpd',           tag:'Training'     },
  { id:'innovation',   title:'Innovation and IP Management',                 desc:'File patents, register intellectual property, and get support for technology transfer and commercialization.',                           icon:Lightbulb,    to:'/dashboard/innovation',    tag:'IP and Patents'},
  { id:'linkages',     title:'University Linkages (ULTT)',                   desc:'University-Industry collaboration. Connect with partners, arrange internships, and conduct joint R&D.',                                  icon:Link2,        to:'/dashboard/linkages',      tag:'Industry'     },
  { id:'basr',         title:'Board of Advanced Studies and Research',       desc:'Postgraduate oversight, PhD committee management, thesis submissions, and academic governance.',                                          icon:Building2,    to:'/dashboard/basr',          tag:'Academic'     },
  { id:'udu',          title:'University Development Unit',                  desc:'External funding proposals, development projects, donor relations, and institutional capacity building.',                                 icon:TrendingUp,   to:'/dashboard/udu',           tag:'Development'  },
  { id:'siren',        title:'SIREN Network',                                desc:'Sindh Innovation Research Education Network, connecting researchers across Sindh for collaborative projects.',                            icon:Users,        to:'/dashboard/siren',         tag:'Network'      },
];

const ANNOUNCEMENTS = [
  { id:1, type:'deadline', title:'HEC-NRPU Grant Deadline',                date:'June 10, 2025', icon:AlertCircle,
    body:'Applications for NRPU Batch 2025 close on 15 July 2025. Submit via the ORIC office.' },
  { id:2, type:'event',    title:'Research Symposium 2025',                 date:'June 5, 2025',  icon:FlaskConical,
    body:'Annual MUET Research Symposium on 28 July 2025. Submit abstracts by 20 June.' },
  { id:3, type:'cpd',      title:'New CPD Batch: Research Methodology',     date:'June 2, 2025',  icon:GraduationCap,
    body:'Research Methodology and Academic Writing CPD starts July 1. Register before June 25.' },
  { id:4, type:'notice',   title:'Annual Self-Assessment Scorecard Open',   date:'May 30, 2025',  icon:CheckCircle2,
    body:'HEC ORIC Scorecard for FY 2024-25 is open. All units must submit by 30 September 2025.' },
];

const ACTIVE_GRANTS = [
  { title:'Smart Grid Integration for Sindh',  agency:'HEC-NRPU', amount:'PKR 9.5M',  status:'Active',       pi:'Dr. Imran Hussain' },
  { title:'Water Quality Monitoring System',   agency:'PSF',       amount:'PKR 4.2M',  status:'Active',       pi:'Dr. Sara Memon'    },
  { title:'Advanced Material Synthesis',       agency:'Sindh HEC', amount:'PKR 2.8M',  status:'Under Review', pi:'Dr. Khalid Jamali' },
  { title:'IoT-Based Precision Agriculture',   agency:'Ignite',    amount:'PKR 3.1M',  status:'Active',       pi:'Prof. Nadia Baloch'},
];

export default function Dashboard() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="dashboard">

      {/* Welcome banner */}
      <div className="dash-banner">
        <div className="dash-banner__left">
          <div className="dash-banner__greeting">{greeting}, {user?.name?.split(' ')[0]}</div>
          <div className="dash-banner__sub">
            Welcome to the ORIC Portal. Your central hub for research, innovation, and collaboration at MUET Jamshoro.
          </div>
        </div>
        <div className="dash-banner__right">
          <span className="dash-banner__role">{user?.role}</span>
          <span className="dash-banner__dept">{user?.department}</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stats-row">
        {STATS.map(s => (
          <div key={s.label} className={`stat-card stat-card--${s.color}`}>
            <div className="stat-card__top">
              <div className="stat-card__label">{s.label}</div>
              <div className="stat-card__icon"><s.icon size={16} /></div>
            </div>
            <div className="stat-card__value">{s.value}</div>
            <div className="stat-card__trend">{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="dash-body">

        {/* Programs */}
        <div>
          <div className="section-label">Programs and Services</div>
          <div className="programs-grid">
            {PROGRAMS.map(p => (
              <Link key={p.id} to={p.to} className="prog-card">
                <div className="prog-card__top">
                  <div className="prog-card__icon"><p.icon size={16} /></div>
                  <span className="prog-card__tag">{p.tag}</span>
                </div>
                <div className="prog-card__title">{p.title}</div>
                <div className="prog-card__desc">{p.desc}</div>
                <div className="prog-card__cta">Open <ArrowRight size={13} /></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Aside */}
        <div className="dash-aside">

          {/* Announcements */}
          <div className="panel">
            <div className="panel__head">
              <h3>Announcements</h3>
              <Link to="/dashboard/announcements" className="panel__link">View all <ArrowRight size={12} /></Link>
            </div>
            <div className="ann-list">
              {ANNOUNCEMENTS.map(a => (
                <div key={a.id} className={`ann-item ann-item--${a.type}`}>
                  <div className="ann-item__dot" />
                  <div className="ann-item__body">
                    <div className="ann-item__title">{a.title}</div>
                    <div className="ann-item__excerpt">{a.body}</div>
                    <span className="ann-item__date"><Clock size={10} /> {a.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active grants */}
          <div className="panel">
            <div className="panel__head">
              <h3>Active Grants</h3>
              <Link to="/dashboard/grants" className="panel__link">View all <ArrowRight size={12} /></Link>
            </div>
            <div className="grants-list">
              {ACTIVE_GRANTS.map((g, i) => (
                <div key={i} className="grant-row">
                  <div className="grant-row__top">
                    <div className="grant-row__title">{g.title}</div>
                    <span className={`badge ${g.status === 'Active' ? 'badge--green' : 'badge--amber'}`}>
                      {g.status}
                    </span>
                  </div>
                  <div className="grant-row__meta">
                    <span>{g.agency}</span>
                    <span className="meta-sep">·</span>
                    <span>{g.amount}</span>
                    <span className="meta-sep">·</span>
                    <span>{g.pi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="panel">
            <div className="panel__head"><h3>Quick Links</h3></div>
            <div className="qlinks">
              {[
                { label:'MUET Main Website',      href:'https://www.muet.edu.pk' },
                { label:'ORIC Official Site',      href:'https://oric.muet.edu.pk' },
                { label:'HEC Research Portal',     href:'https://rfi.hec.gov.pk' },
                { label:'Research Publications',   href:'/dashboard/publications' },
                { label:'Submit a Proposal',       href:'/dashboard/research' },
              ].map(l => (
                <a key={l.label} href={l.href} className="qlink"
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <span>{l.label}</span>
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About ORIC */}
      <div className="about-section">
        <div className="about-section__grid">
          <div>
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
          <div className="about-section__objectives">
            <h3>Core Objectives</h3>
            <ul className="objectives-list">
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
                  <CheckCircle2 size={13} />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
