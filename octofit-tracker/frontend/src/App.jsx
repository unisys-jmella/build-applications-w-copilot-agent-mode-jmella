import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import logo from '../../../docs/octofitapp-small.png';
import './App.css';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const envNote = import.meta.env.VITE_CODESPACE_NAME
    ? `Using Codespace ${import.meta.env.VITE_CODESPACE_NAME}`
    : 'Set VITE_CODESPACE_NAME in .env.local to use HTTPS Codespaces URLs';

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <img src={logo} alt="Octofit Tracker logo" className="brand-logo" />
          <div>
            <p className="eyebrow">Multi-tier fitness tracker</p>
            <h1>Octofit Tracker</h1>
          </div>
        </div>
        <div className="env-banner">{envNote}</div>
      </header>

      <nav className="nav-tabs" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-area">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
