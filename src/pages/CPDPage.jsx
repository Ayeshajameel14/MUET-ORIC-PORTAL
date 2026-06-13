import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Clock, Users, Calendar } from 'lucide-react';
import './GrantsPage.css';
import './CPDPage.css';

const CPD_COURSES = [
  {
    id: 1, category: 'Language',
    title: 'Chinese Language Course (HSK Levels 1 to 6)',
    desc: 'Comprehensive Mandarin Chinese language program covering HSK levels 1 through 6, YCT and BCT. Executive weekend classes also available.',
    duration: '3 to 6 Months', sessions: 'Mon to Fri / Sat to Sun (Executive)', seats: 30, fee: 'PKR 8,000', status: 'Enrolling',
  },
  {
    id: 2, category: 'Research',
    title: 'Research Methodology and Academic Writing',
    desc: 'Covers quantitative and qualitative research methods, scientific writing, literature review, and academic paper formatting.',
    duration: '6 Weeks', sessions: 'Tuesdays and Thursdays', seats: 25, fee: 'PKR 5,000', status: 'Enrolling',
  },
  {
    id: 3, category: 'Professional',
    title: 'Project Management Professional (PMP Prep)',
    desc: 'Aligned with PMI standards. Covers project lifecycle, risk management, agile methodologies, and PMP exam preparation.',
    duration: '8 Weeks', sessions: 'Saturdays', seats: 20, fee: 'PKR 12,000', status: 'Upcoming',
  },
  {
    id: 4, category: 'Research',
    title: 'Statistical Analysis Using SPSS and R',
    desc: 'Hands-on training in statistical tools for research data analysis. Covers descriptive stats, regression, and data visualization.',
    duration: '4 Weeks', sessions: 'Wednesdays and Fridays', seats: 20, fee: 'PKR 6,000', status: 'Enrolling',
  },
  {
    id: 5, category: 'Technical',
    title: 'AutoCAD and BIM for Engineers',
    desc: 'Professional training in AutoCAD 2D/3D and Building Information Modeling (BIM) using Revit for engineering applications.',
    duration: '6 Weeks', sessions: 'Mon / Wed / Fri', seats: 15, fee: 'PKR 10,000', status: 'Completed',
  },
  {
    id: 6, category: 'Professional',
    title: 'Communication and Leadership Skills',
    desc: 'Confidence building, professional communication, time management, and strategic leadership for engineers and researchers.',
    duration: '3 Weeks', sessions: 'Saturdays', seats: 35, fee: 'PKR 4,000', status: 'Upcoming',
  },
  {
    id: 7, category: 'Technical',
    title: 'Machine Learning for Engineers',
    desc: 'Practical ML using Python, scikit-learn, and TensorFlow. Covers supervised learning, neural networks, and real-world projects.',
    duration: '8 Weeks', sessions: 'Sundays', seats: 20, fee: 'PKR 15,000', status: 'Enrolling',
  },
  {
    id: 8, category: 'Research',
    title: 'Patent Filing and Intellectual Property',
    desc: 'Guidance on IP management, patent search, filing procedures in Pakistan, and commercialization of university innovations.',
    duration: '2 Weeks', sessions: 'Intensive Weekend', seats: 25, fee: 'PKR 3,000', status: 'Upcoming',
  },
];

const CATEGORIES = ['All', 'Research', 'Language', 'Technical', 'Professional'];

const STATUS_STYLE = {
  Enrolling: 'badge--green',
  Upcoming: 'badge--yellow',
  Completed: 'badge--navy',
};

export default function CPDPage() {
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All' ? CPD_COURSES : CPD_COURSES.filter(c => c.category === cat);

  return (
    <div className="cpd-page">
      <Link to="/dashboard" className="back-link">
        <ArrowLeft size={15} /> Back to Dashboard
      </Link>

      <div className="page-header">
        <div className="page-header__icon"><GraduationCap size={22} /></div>
        <div>
          <h1>CPD Courses</h1>
          <p>Continuing Professional Development programs organized by ORIC, MUET Jamshoro.</p>
        </div>
      </div>

      <div className="filter-group" style={{ marginBottom: 22 }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`filter-chip ${cat === c ? 'filter-chip--active' : ''}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="cpd-grid">
        {filtered.map(course => (
          <div key={course.id} className="cpd-card">
            <div className="cpd-card__top">
              <span className="cpd-card__category">{course.category}</span>
              <span className={`badge ${STATUS_STYLE[course.status]}`}>{course.status}</span>
            </div>
            <h3 className="cpd-card__title">{course.title}</h3>
            <p className="cpd-card__desc">{course.desc}</p>
            <div className="cpd-card__meta">
              <span><Clock size={13} /> {course.duration}</span>
              <span><Calendar size={13} /> {course.sessions}</span>
              <span><Users size={13} /> {course.seats} seats</span>
            </div>
            <div className="cpd-card__footer">
              <span className="cpd-card__fee">{course.fee}</span>
              {course.status === 'Enrolling' && (
                <button className="btn-outline-sm">Enroll Now</button>
              )}
              {course.status === 'Upcoming' && (
                <button
                  className="btn-outline-sm"
                  style={{ borderColor: 'var(--warning)', color: 'var(--warning)' }}
                >
                  Notify Me
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
