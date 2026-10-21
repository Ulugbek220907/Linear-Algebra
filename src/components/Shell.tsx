import { type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MessageCircle, Monitor, Moon, Settings as Cog, Sun } from 'lucide-react';
import { applyTheme, settingsStore, useSettings } from '../lib/store';
import { useTeacher } from '../lib/teacherCtx';
import { TeacherDock } from '../teacher/TeacherDock';
import { BrandMark } from './Icons';

function ThemeButton() {
  const { theme } = useSettings();
  const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
  const Icon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon;
  return (
    <button
      type="button"
      className="icon-btn theme-btn"
      title={`Theme: ${theme}. Click for ${next}.`}
      aria-label={`Theme: ${theme}. Switch to ${next}.`}
      onClick={() => {
        settingsStore.set({ theme: next });
        applyTheme(next);
      }}
    >
      <Icon />
    </button>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { open, setOpen } = useTeacher();
  const { pathname } = useLocation();
  const learnActive = pathname === '/' || pathname.startsWith('/lesson') || pathname.startsWith('/chapter');

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <Link to="/" className="brand">
          <BrandMark />
          <span>Linear Algebra</span>
          <small>MATH2110</small>
        </Link>
        <nav className="topnav" aria-label="Main">
          <Link to="/" aria-current={learnActive ? 'page' : undefined}>
            Learn
          </Link>
          <NavLink to="/practice">Practice</NavLink>
          <NavLink to="/revise">Revise</NavLink>
          <NavLink to="/homework">Homework</NavLink>
        </nav>
        <div className="topbar-actions">
          <button type="button" className="btn btn-sm" aria-pressed={open} onClick={() => setOpen(!open)}>
            <MessageCircle />
            <span>AI Teacher</span>
          </button>
          <ThemeButton />
          <NavLink to="/settings" className="icon-btn" title="Settings" aria-label="Settings">
            <Cog />
          </NavLink>
        </div>
      </header>
      <main id="main">{children}</main>
      <TeacherDock />
    </>
  );
}
