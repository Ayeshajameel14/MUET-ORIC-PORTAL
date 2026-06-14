import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Clock, AlertCircle, FlaskConical, GraduationCap, CheckCircle2, Info } from 'lucide-react';
import './GrantsPage.css';
import './AnnouncementsPage.css';

const ALL = [
  { id:1, type:'deadline', title:'HEC-NRPU Grant Deadline',                  date:'June 10, 2025', icon:AlertCircle,
    body:'Applications for the National Research Program for Universities (NRPU) Batch 2025 close on 15 July 2025. Faculty must submit endorsed applications through the ORIC office. All supporting documents including PI credentials, research proposal, and budget breakdown must be submitted at least 5 working days before the deadline.' },
  { id:2, type:'event',    title:'MUET Research Symposium 2025',               date:'June 5, 2025',  icon:FlaskConical,
    body:'Annual MUET Research Symposium is scheduled for 28 July 2025 at the MUET Convention Center. Faculty and PhD scholars are invited to submit research paper abstracts by 20 June 2025 via the ORIC portal. Selected papers will be presented and considered for the best paper award.' },
  { id:3, type:'cpd',      title:'New CPD Batch: Research Methodology',        date:'June 2, 2025',  icon:GraduationCap,
    body:'A new batch of the Research Methodology and Academic Writing CPD course starts July 1, 2025. The course runs for 6 weeks every Tuesday and Thursday. Registration closes June 25. Limited to 25 participants. Fee: PKR 5,000. Register through the CPD section of the ORIC portal.' },
  { id:4, type:'notice',   title:'HEC Annual Self-Assessment Scorecard Open',  date:'May 30, 2025',  icon:CheckCircle2,
    body:'The HEC ORIC Annual Self-Assessment Scorecard for FY 2024-25 is now open. All units must complete and submit their scorecards by 30 September 2025. For queries contact oric@hec.gov.pk. The completed scorecard must be signed by the ORIC Director and Vice Chancellor.' },
  { id:5, type:'notice',   title:'SIREN Network Annual Meeting Invitation',    date:'May 22, 2025',  icon:Info,
    body:'The Sindh Innovation Research Education Network (SIREN) annual meeting is scheduled for 18 June 2025 at MUET. All member universities are invited to participate. MUET ORIC will present its research achievements and upcoming collaborative opportunities.' },
  { id:6, type:'deadline', title:'Ignite Seed Fund: Application Window Open',  date:'May 15, 2025',  icon:AlertCircle,
    body:'Ignite (NITB) has opened applications for the Seed Fund 2025 batch. Maximum funding: USD 35,000 per project. Open to early-stage technology ventures associated with an HEI. Submit via the Ignite portal; ORIC endorsement is required.' },
];

const TYPE_LABEL = { deadline:'Deadline', event:'Event', cpd:'CPD', notice:'Notice' };
const TYPE_BADGE  = { deadline:'badge--red', event:'badge--navy', cpd:'badge--green', notice:'badge--amber' };

export default function AnnouncementsPage() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const types = ['All', 'Deadline', 'Event', 'CPD', 'Notice'];
  const filtered = filter === 'All' ? ALL : ALL.filter(a => TYPE_LABEL[a.type] === filter);

  return (
    <div className="announcements-page">
      <Link to="/dashboard" className="back-link"><ArrowLeft size={14} /> Back to Dashboard</Link>

      <div className="page-head">
        <div className="page-head__icon"><Bell size={20} /></div>
        <div>
          <h1>Announcements</h1>
          <p>Latest news, deadlines, and notices from ORIC, MUET Jamshoro.</p>
        </div>
      </div>

      <div className="chip-group" style={{ marginBottom: 20 }}>
        {types.map(t => (
          <button key={t} className={`chip ${filter === t ? 'chip--on' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      <div className="ann-full-list">
        {filtered.map(a => {
          const isOpen = expanded === a.id;
          return (
            <div key={a.id} className={`ann-full-item ann-full-item--${a.type} ${isOpen ? 'ann-full-item--open' : ''}`}>
              <button
                className="ann-full-item__trigger"
                onClick={() => setExpanded(isOpen ? null : a.id)}
                aria-expanded={isOpen}
              >
                <div className="ann-full-item__left">
                  <div className="ann-full-item__dot" />
                  <div>
                    <div className="ann-full-item__title">{a.title}</div>
                    <div className="ann-full-item__meta-row">
                      <span className={`badge ${TYPE_BADGE[a.type]}`}>{TYPE_LABEL[a.type]}</span>
                      <span className="ann-full-item__date"><Clock size={10} /> {a.date}</span>
                    </div>
                  </div>
                </div>
                <span className="ann-full-item__toggle">{isOpen ? 'Close' : 'Open'}</span>
              </button>
              {isOpen && (
                <div className="ann-full-item__body">
                  <p>{a.body}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
