import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Clock, AlertCircle, FlaskConical, GraduationCap, CheckCircle2, Info } from 'lucide-react';
import './GrantsPage.css';
import './AnnouncementsPage.css';

const ALL_ANNOUNCEMENTS = [
  {
    id: 1, type: 'deadline',
    title: 'HEC-NRPU Grant Deadline',
    date: 'June 10, 2025', icon: AlertCircle,
    body: 'Applications for the National Research Program for Universities (NRPU) Batch 2025 close on 15 July 2025. Faculty members must submit endorsed applications through the ORIC office. Ensure all supporting documents including PI credentials, research proposal, and budget breakdown are submitted at least 5 working days before the deadline.',
  },
  {
    id: 2, type: 'event',
    title: 'MUET Research Symposium 2025',
    date: 'June 5, 2025', icon: FlaskConical,
    body: 'Annual MUET Research Symposium is scheduled for 28 July 2025 at the MUET Convention Center. Faculty and PhD scholars are invited to submit research paper abstracts by 20 June 2025 via the ORIC portal. Selected papers will be presented and considered for the best paper award.',
  },
  {
    id: 3, type: 'cpd',
    title: 'New CPD Batch: Research Methodology',
    date: 'June 2, 2025', icon: GraduationCap,
    body: 'A new batch of the Research Methodology and Academic Writing CPD course starts July 1, 2025. The course runs for 6 weeks every Tuesday and Thursday. Registration closes June 25. Limited to 25 participants. Fee: PKR 5,000. Register through the CPD section of the ORIC portal.',
  },
  {
    id: 4, type: 'notice',
    title: 'HEC Annual Self-Assessment Scorecard Open',
    date: 'May 30, 2025', icon: CheckCircle2,
    body: 'The HEC ORIC Annual Self-Assessment Scorecard for FY 2024-25 is now open. All units (ORIC, BIC) must complete and submit their scorecards by 30 September 2025. For queries write to oric@hec.gov.pk. The completed scorecard must be signed by the ORIC Director and Vice Chancellor.',
  },
  {
    id: 5, type: 'notice',
    title: 'SIREN Network Annual Meeting Invitation',
    date: 'May 22, 2025', icon: Info,
    body: 'The Sindh Innovation Research Education Network (SIREN) annual meeting is scheduled for 18 June 2025 at MUET. All member universities of SIREN are invited to participate. MUET ORIC will present its research achievements and upcoming collaborative opportunities.',
  },
  {
    id: 6, type: 'deadline',
    title: 'Ignite Seed Fund: Application Window Open',
    date: 'May 15, 2025', icon: AlertCircle,
    body: 'Ignite (NITB) has opened applications for the Seed Fund 2025 batch. Maximum funding: USD 35,000 per project. Open to early-stage technology ventures and startups. Applicants must be associated with an HEI. Submit via the Ignite portal; ORIC endorsement required.',
  },
];

const TYPE_LABEL = {
  deadline: 'Deadline',
  event: 'Event',
  cpd: 'CPD',
  notice: 'Notice',
};

const TYPE_BADGE = {
  deadline: 'badge--error',
  event: 'badge--navy',
  cpd: 'badge--green',
  notice: 'badge--yellow',
};

export default function AnnouncementsPage() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const types = ['All', 'Deadline', 'Event', 'CPD', 'Notice'];
  const filtered = filter === 'All'
    ? ALL_ANNOUNCEMENTS
    : ALL_ANNOUNCEMENTS.filter(a => TYPE_LABEL[a.type] === filter);

  return (
    <div className="announcements-page">
      <Link to="/dashboard" className="back-link">
        <ArrowLeft size={15} /> Back to Dashboard
      </Link>

      <div className="page-header">
        <div className="page-header__icon"><Bell size={22} /></div>
        <div>
          <h1>Announcements</h1>
          <p>Latest news, deadlines, and notices from ORIC, MUET Jamshoro.</p>
        </div>
      </div>

      <div className="filter-group" style={{ marginBottom: 22 }}>
        {types.map(t => (
          <button
            key={t}
            className={`filter-chip ${filter === t ? 'filter-chip--active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="announcement-full-list">
        {filtered.map(a => (
          <div
            key={a.id}
            className={`announcement-full-item announcement-full-item--${a.type} ${expanded === a.id ? 'announcement-full-item--open' : ''}`}
          >
            <button
              className="announcement-full-item__header"
              onClick={() => setExpanded(expanded === a.id ? null : a.id)}
              aria-expanded={expanded === a.id}
            >
              <div className="announcement-full-item__left">
                <div className="announcement-full-item__icon">
                  <a.icon size={15} />
                </div>
                <div>
                  <div className="announcement-full-item__title">{a.title}</div>
                  <div className="announcement-full-item__meta">
                    <span className={`badge badge--sm ${TYPE_BADGE[a.type]}`}>{TYPE_LABEL[a.type]}</span>
                    <span className="announcement-full-item__date"><Clock size={11} /> {a.date}</span>
                  </div>
                </div>
              </div>
              <span className="announcement-full-item__toggle">{expanded === a.id ? 'Close' : 'Open'}</span>
            </button>
            {expanded === a.id && (
              <div className="announcement-full-item__body">
                <p>{a.body}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
