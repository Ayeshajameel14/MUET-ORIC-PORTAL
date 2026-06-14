import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, ExternalLink, Search } from "lucide-react";
import "./GrantsPage.css";

const FUNDING = [
  {
    id: 1,
    agency: "HEC Pakistan",
    title: "National Research Program for Universities (NRPU)",
    type: "Local",
    amount: "Up to PKR 10M",
    deadline: "July 15, 2025",
    status: "Open",
    url: "https://www.hec.gov.pk",
    desc: "Competitive merit-based research grants for universities across Pakistan. Teams must include faculty and students.",
  },
  {
    id: 2,
    agency: "HEC Pakistan",
    title: "Thematic Research Grants Program (TRGP)",
    type: "Local",
    amount: "Up to PKR 10M",
    deadline: "Open Rolling",
    status: "Open",
    url: "https://www.hec.gov.pk",
    desc: "Funding for thematic areas including Economy, Social Sciences, National Development, and Higher Education in Pakistan.",
  },
  {
    id: 3,
    agency: "Ignite (NITB)",
    title: "Ignite FYP Fund",
    type: "Local",
    amount: "PKR 100K to 300K",
    deadline: "August 1, 2025",
    status: "Open",
    url: "https://ignite.org.pk",
    desc: "Funding for final year engineering and IT projects with commercialization potential.",
  },
  {
    id: 4,
    agency: "Ignite (NITB)",
    title: "Ignite Seed Fund",
    type: "Local",
    amount: "Up to USD 35,000",
    deadline: "September 30, 2025",
    status: "Open",
    url: "https://ignite.org.pk",
    desc: "Seed funding for innovation-driven startups and early-stage technology ventures at HEIs.",
  },
  {
    id: 5,
    agency: "Sindh HEC",
    title: "Sindh HEC Research Funding",
    type: "Local",
    amount: "PKR 2M to 5M",
    deadline: "Closed",
    status: "Closed",
    url: "#",
    desc: "Provincial research grants for Sindh-based universities focused on socioeconomic and development challenges.",
  },
  {
    id: 6,
    agency: "Pakistan Science Foundation",
    title: "PSF Travel Grant",
    type: "Local",
    amount: "PKR 200K to 400K",
    deadline: "Rolling",
    status: "Open",
    url: "https://www.psf.gov.pk",
    desc: "Travel grants for presentation of research papers at international conferences.",
  },
  {
    id: 7,
    agency: "Spencer Foundation",
    title: "Small Research Grant",
    type: "International",
    amount: "USD 50,000",
    deadline: "November 1, 2025",
    status: "Open",
    url: "https://www.spencer.org",
    desc: "Supports education research globally including qualitative and quantitative studies.",
  },
  {
    id: 8,
    agency: "IDRC Canada",
    title: "International Development Research Centre Grant",
    type: "International",
    amount: "Varies",
    deadline: "Rolling",
    status: "Open",
    url: "https://www.idrc.ca",
    desc: "Canadian funding for research on development challenges in low and middle income countries.",
  },
];

const ACTIVE_GRANTS = [
  {
    title: "Smart Grid Integration for Sindh",
    agency: "HEC-NRPU",
    amount: "PKR 9.5M",
    pi: "Dr. Imran Hussain",
    dept: "Electrical Engg.",
    duration: "2023 to 2025",
    status: "Active",
  },
  {
    title: "Water Quality Monitoring System",
    agency: "PSF",
    amount: "PKR 4.2M",
    pi: "Dr. Sara Memon",
    dept: "Civil Engg.",
    duration: "2024 to 2026",
    status: "Active",
  },
  {
    title: "Advanced Material Synthesis",
    agency: "Sindh HEC",
    amount: "PKR 2.8M",
    pi: "Dr. Khalid Jamali",
    dept: "Metallurgy",
    duration: "2024 to 2025",
    status: "Under Review",
  },
  {
    title: "IoT-Based Precision Agriculture",
    agency: "Ignite",
    amount: "PKR 3.1M",
    pi: "Prof. Nadia Baloch",
    dept: "Electronics",
    duration: "2024 to 2025",
    status: "Active",
  },
  {
    title: "AI for Early Cancer Detection",
    agency: "HEC-NRPU",
    amount: "PKR 8.0M",
    pi: "Dr. Farhan Ali",
    dept: "Biomedical",
    duration: "2023 to 2026",
    status: "Active",
  },
  {
    title: "Clean Coal Technology",
    agency: "PCRET",
    amount: "PKR 6.5M",
    pi: "Dr. Waqas Ahmed",
    dept: "Chemical Engg.",
    duration: "2022 to 2025",
    status: "Completed",
  },
];

export default function GrantsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setType] = useState("All");
  const [tab, setTab] = useState("opportunities");

  const filtered = FUNDING.filter((g) => {
    const q = search.toLowerCase();
    return (
      (g.title.toLowerCase().includes(q) ||
        g.agency.toLowerCase().includes(q)) &&
      (typeFilter === "All" || g.type === typeFilter)
    );
  });

  return (
    <div className="grants-page">
      <Link to="/dashboard" className="back-link">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      <div className="page-head">
        <div className="page-head__icon">
          <Award size={20} />
        </div>
        <div>
          <h1>Grants and Funding</h1>
          <p>
            Explore available funding opportunities and track active research
            grants at MUET ORIC.
          </p>
        </div>
      </div>

      <div className="tab-bar">
        <button
          className={`tab-btn ${tab === "opportunities" ? "tab-btn--active" : ""}`}
          onClick={() => setTab("opportunities")}
        >
          Funding Opportunities
        </button>
        <button
          className={`tab-btn ${tab === "active" ? "tab-btn--active" : ""}`}
          onClick={() => setTab("active")}
        >
          Active Grants
        </button>
      </div>

      {tab === "opportunities" && (
        <>
          <div className="page-filters">
            <div className="search-field">
              <Search size={14} className="search-field__icon" />
              <input
                type="search"
                placeholder="Search by title or agency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="chip-group">
              {["All", "Local", "International"].map((t) => (
                <button
                  key={t}
                  className={`chip ${typeFilter === t ? "chip--on" : ""}`}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grants-grid">
            {filtered.map((g) => (
              <div key={g.id} className="funding-card">
                <div className="funding-card__header">
                  <div className="funding-card__header-badges">
                    <span
                      className={`badge ${g.status === "Open" ? "badge--green" : "badge--muted"}`}
                    >
                      {g.status}
                    </span>
                    <span className="badge badge--navy">{g.type}</span>
                  </div>
                  <span className="funding-card__amount">{g.amount}</span>
                </div>
                <div className="funding-card__title">{g.title}</div>
                <div className="funding-card__agency">{g.agency}</div>
                <div className="funding-card__desc">{g.desc}</div>
                <div className="funding-card__footer">
                  <span className="funding-card__deadline">
                    Deadline: <strong>{g.deadline}</strong>
                  </span>
                  {g.url !== "#" && (
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sm"
                    >
                      Apply <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "active" && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Agency</th>
                <th>Amount</th>
                <th>PI</th>
                <th>Department</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVE_GRANTS.map((g, i) => (
                <tr key={i}>
                  <td>{g.title}</td>
                  <td>{g.agency}</td>
                  <td>{g.amount}</td>
                  <td>{g.pi}</td>
                  <td>{g.dept}</td>
                  <td>{g.duration}</td>
                  <td>
                    <span
                      className={`badge ${g.status === "Active" ? "badge--green" : g.status === "Completed" ? "badge--navy" : "badge--amber"}`}
                    >
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
