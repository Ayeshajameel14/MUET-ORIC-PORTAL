import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, FlaskConical, BookOpen, Lightbulb,
  GraduationCap, Users, FileText, Award, Building2,
  TrendingUp, Settings, LogOut, ChevronLeft, Menu, Bell, Link2
} from 'lucide-react';
import oricLogo from '../assets/oric-logo.webp';
import './Sidebar.css';

const NAV_ITEMS = [
  {
    section: 'Overview',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    ],
  },
  {
    section: 'Research',
    items: [
      { to: '/dashboard/research', icon: FlaskConical, label: 'Research Projects' },
      { to: '/dashboard/publications', icon: BookOpen, label: 'Publications' },
      { to: '/dashboard/grants', icon: Award, label: 'Grants and Funding' },
    ],
  },
  {
    section: 'Programs',
    items: [
      { to: '/dashboard/cpd', icon: GraduationCap, label: 'CPD Courses' },
      { to: '/dashboard/innovation', icon: Lightbulb, label: 'Innovation and IP' },
      { to: '/dashboard/linkages', icon: Link2, label: 'Industry Linkages' },
    ],
  },
  {
    section: 'Units',
    items: [
      { to: '/dashboard/basr', icon: Building2, label: 'BASR' },
      { to: '/dashboard/udu', icon: TrendingUp, label: 'UDU' },
      { to: '/dashboard/siren', icon: Users, label: 'SIREN' },
    ],
  },
  {
    section: 'Manage',
    items: [
      { to: '/dashboard/reports', icon: FileText, label: 'Reports' },
      { to: '/dashboard/announcements', icon: Bell, label: 'Announcements' },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onMobileClose} aria-hidden="true" />
      )}

      <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>

        {/* Header */}
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <img
              src={oricLogo}
              alt="ORIC MUET"
              className="sidebar__logo-img"
            />
            {!collapsed && (
              <div className="sidebar__brand-text">
                <span className="sidebar__brand-name">ORIC Portal</span>
                <span className="sidebar__brand-sub">MUET Jamshoro</span>
              </div>
            )}
          </div>
          <button
            className="sidebar__toggle"
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* User strip */}
        {user && (
          <div className="sidebar__user">
            <div className="sidebar__avatar">{user.avatar}</div>
            {!collapsed && (
              <div className="sidebar__user-info">
                <span className="sidebar__user-name">{user.name}</span>
                <span className="sidebar__user-role">
                  {user.role} · {user.department.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Nav */}
        <nav className="sidebar__nav" aria-label="Main navigation">
          {NAV_ITEMS.map(({ section, items }) => (
            <div key={section} className="sidebar__section">
              {!collapsed && (
                <span className="sidebar__section-label">{section}</span>
              )}
              {items.map(({ to, icon: Icon, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  title={collapsed ? label : undefined}
                  onClick={onMobileClose}
                >
                  <Icon size={18} className="sidebar__link-icon" />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar__footer">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
            title={collapsed ? 'Settings' : undefined}
            onClick={onMobileClose}
          >
            <Settings size={18} className="sidebar__link-icon" />
            {!collapsed && <span>Settings</span>}
          </NavLink>
          <button
            className="sidebar__link sidebar__link--logout"
            onClick={handleLogout}
            title={collapsed ? 'Sign out' : undefined}
          >
            <LogOut size={18} className="sidebar__link-icon" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
