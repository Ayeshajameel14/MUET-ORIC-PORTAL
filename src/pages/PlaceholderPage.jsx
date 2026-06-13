import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import './PlaceholderPage.css';

export default function PlaceholderPage({ title, description, icon: Icon, children }) {
  return (
    <div className="placeholder-page">
      <Link to="/dashboard" className="back-link">
        <ArrowLeft size={15} /> Back to Dashboard
      </Link>
      <div className="placeholder-page__card">
        <div className="placeholder-page__icon">
          {Icon ? <Icon size={32} /> : <Construction size={32} />}
        </div>
        <h1>{title}</h1>
        <p>{description || 'This section is under active development and will be available soon.'}</p>
        {children}
      </div>
    </div>
  );
}
