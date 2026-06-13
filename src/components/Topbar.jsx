import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Search, ChevronRight } from 'lucide-react';
import './Topbar.css';

const ROUTE_LABELS = {
  '/dashboard': 'Dashboard',
  '/dashboard/research': 'Research Projects',
  '/dashboard/publications': 'Publications',
  '/dashboard/grants': 'Grants & Funding',
  '/dashboard/cpd': 'CPD Courses',
  '/dashboard/innovation': 'Innovation & IP',
  '/dashboard/linkages': 'Industry Linkages',
  '/dashboard/basr': 'BASR',
  '/dashboard/udu': 'University Development Unit',
  '/dashboard/siren': 'SIREN',
  '/dashboard/reports': 'Reports',
  '/dashboard/announcements': 'Announcements',
  '/dashboard/settings': 'Settings',
};

export default function Topbar({ onMenuClick }) {
  const location = useLocation();
  const label = ROUTE_LABELS[location.pathname] || 'ORIC Portal';
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          className="topbar__menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="topbar__breadcrumb">
          <span className="topbar__breadcrumb-root">ORIC</span>
          <ChevronRight size={14} className="topbar__breadcrumb-sep" />
          <span className="topbar__breadcrumb-current">{label}</span>
        </div>
      </div>

      <div className="topbar__right">
        {showSearch && (
          <div className="topbar__search-wrap">
            <Search size={15} className="topbar__search-icon" />
            <input
              type="search"
              className="topbar__search"
              placeholder="Search portal…"
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
          </div>
        )}
        {!showSearch && (
          <button
            className="topbar__icon-btn"
            onClick={() => setShowSearch(true)}
            aria-label="Search"
          >
            <Search size={18} />
          </button>
        )}
        <button className="topbar__icon-btn topbar__notif" aria-label="Notifications">
          <Bell size={18} />
          <span className="topbar__notif-dot" aria-hidden="true"></span>
        </button>
      </div>
    </header>
  );
}
