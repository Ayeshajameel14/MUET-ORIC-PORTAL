# MUET ORIC Portal

A React-based web portal for the **Office of Research, Innovation & Commercialization (ORIC)** at Mehran University of Engineering & Technology, Jamshoro.

## About

This is my internship project developed for ORIC MUET. The portal serves as a central digital hub for managing research activities, innovation programs, and collaboration at MUET Jamshoro.

## Features

- Login Page with complete form validation
- New User Registration with password strength checker
- Interactive Dashboard with sidebar navigation
- Research Grants and Funding section
- CPD Courses management and enrollment
- Announcements panel with filters
- Fully responsive design for all screen sizes
- Role-based UI (Faculty, Researcher, PhD Scholar, Staff, Admin)

## Technologies Used

- React.js (v18)
- React Router DOM (v6)
- Vite (Build Tool)
- CSS3 (Custom written, no UI library used)
- Lucide React (Icons)
- JavaScript (ES6+)

## Installation

1. Clone the repository

```bash
git clone https://github.com/Ayeshajameel14/MUET-ORIC-PORTAL.git
```

2. Navigate to the project folder

```bash
cd MUET-ORIC-PORTAL
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

## Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@oric.muet.edu.pk | Admin@123 | Director |
| researcher@muet.edu.pk | Research@123 | Researcher |
| faculty@muet.edu.pk | Faculty@123 | Faculty |

## Project Structure

```
MUET-ORIC-PORTAL/
├── src/
│   ├── assets/            # ORIC Logo and static files
│   ├── components/        # Sidebar, Topbar, Layout components
│   ├── context/           # Authentication context
│   ├── pages/             # All page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── GrantsPage.jsx
│   │   ├── CPDPage.jsx
│   │   └── AnnouncementsPage.jsx
│   ├── App.jsx            # Routes configuration
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Author

**Ayesha Jameel**
Intern, ORIC MUET
Mehran University of Engineering & Technology, Jamshoro

## Institution

**Office of Research, Innovation & Commercialization (ORIC)**
Mehran University of Engineering & Technology
Jamshoro, Sindh, Pakistan
[https://oric.muet.edu.pk](https://oric.muet.edu.pk)

## License

This project was developed during the ORIC MUET Internship Program using React.js.
