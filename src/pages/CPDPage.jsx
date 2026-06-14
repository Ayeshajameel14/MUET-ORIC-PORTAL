import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Clock, Users, Calendar } from 'lucide-react';
import './GrantsPage.css';
import './CPDPage.css';

const CPD_COURSES = [
  { id:1, category:'Language',     title:'Chinese Language Course (HSK Levels 1 to 6)',    desc:'Comprehensive Mandarin Chinese program covering HSK levels 1 through 6, YCT and BCT. Executive weekend classes also available.',                                          duration:'3 to 6 Months', sessions:'Mon to Fri / Sat to Sun',      seats:30, fee:'PKR 8,000',  status:'Enrolling' },
  { id:2, category:'Research',     title:'Research Methodology and Academic Writing',       desc:'Covers quantitative and qualitative research methods, scientific writing, literature review, and academic paper formatting.',                                             duration:'6 Weeks',       sessions:'Tue and Thu',                  seats:25, fee:'PKR 5,000',  status:'Enrolling' },
  { id:3, category:'Professional', title:'Project Management Professional (PMP Prep)',      desc:'Aligned with PMI standards. Covers project lifecycle, risk management, agile methodologies, and PMP exam preparation.',                                                  duration:'8 Weeks',       sessions:'Saturdays',                    seats:20, fee:'PKR 12,000', status:'Upcoming'  },
  { id:4, category:'Research',     title:'Statistical Analysis Using SPSS and R',           desc:'Hands-on training in statistical tools for research data analysis. Covers descriptive stats, regression, and data visualization.',                                        duration:'4 Weeks',       sessions:'Wed and Fri',                  seats:20, fee:'PKR 6,000',  status:'Enrolling' },
  { id:5, category:'Technical',    title:'AutoCAD and BIM for Engineers',                   desc:'Professional training in AutoCAD 2D/3D and Building Information Modeling (BIM) using Revit for engineering applications.',                                               duration:'6 Weeks',       sessions:'Mon / Wed / Fri',              seats:15, fee:'PKR 10,000', status:'Completed' },
  { id:6, category:'Professional', title:'Communication and Leadership Skills',              desc:'Confidence building, professional communication, time management, and strategic leadership for engineers and researchers.',                                               duration:'3 Weeks',       sessions:'Saturdays',                    seats:35, fee:'PKR 4,000',  status:'Upcoming'  },
  { id:7, category:'Technical',    title:'Machine Learning for Engineers',                  desc:'Practical ML using Python, scikit-learn, and TensorFlow. Covers supervised learning, neural networks, and real-world projects.',                                          duration:'8 Weeks',       sessions:'Sundays',                      seats:20, fee:'PKR 15,000', status:'Enrolling' },
  { id:8, category:'Research',     title:'Patent Filing and Intellectual Property',         desc:'Guidance on IP management, patent search, filing procedures in Pakistan, and commercialization of university innovations.',                                               duration:'2 Weeks',       sessions:'Intensive Weekend',            seats:25, fee:'PKR 3,000',  status:'Upcoming'  },
];

const CATS = ['All', 'Research', 'Language', 'Technical', 'Professional'];

const STATUS_BADGE = {
  Enrolling: 'badge--green',
  Upcoming:  'badge--amber',
  Completed: 'badge--muted',
};

export default function CPDPage() {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? CPD_COURSES : CPD_COURSES.filter(c => c.category === cat);

  return (
    <div className="cpd-page">
      <Link to="/dashboard" className="back-link"><ArrowLeft size={14} /> Back to Dashboard</Link>

      <div className="page-head">
        <div className="page-head__icon"><GraduationCap size={20} /></div>
        <div>
          <h1>CPD Courses</h1>
          <p>Continuing Professional Development programs organized by ORIC, MUET Jamshoro.</p>
        </div>
      </div>

      <div className="chip-group" style={{ marginBottom: 20 }}>
        {CATS.map(c => (
          <button key={c} className={`chip ${cat === c ? 'chip--on' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="cpd-grid">
        {filtered.map(course => (
          <div key={course.id} className="cpd-card">
            <div className="cpd-card__top">
              <span className="cpd-card__cat">{course.category}</span>
              <span className={`badge ${STATUS_BADGE[course.status]}`}>{course.status}</span>
            </div>
            <div className="cpd-card__title">{course.title}</div>
            <div className="cpd-card__desc">{course.desc}</div>
            <div className="cpd-card__meta">
              <span><Clock size={12} /> {course.duration}</span>
              <span><Calendar size={12} /> {course.sessions}</span>
              <span><Users size={12} /> {course.seats} seats</span>
            </div>
            <div className="cpd-card__footer">
              <span className="cpd-card__fee">{course.fee}</span>
              {course.status === 'Enrolling' && (
                <a href="#" className="btn-sm">Enroll</a>
              )}
              {course.status === 'Upcoming' && (
                <button className="btn-sm-amber">Notify Me</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
