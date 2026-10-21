import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NoBreak } from '../lib/nobreak';
import { Check } from 'lucide-react';
import { chapters } from '../content';
import { useProgress } from '../lib/store';

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  const progress = useProgress();

  useEffect(() => {
    const link = document.querySelector<HTMLElement>('.sidebar .side-link[aria-current="page"]');
    const box = link?.closest<HTMLElement>('.sidebar');
    if (!link || !box) return;
    const offset = link.getBoundingClientRect().top - box.getBoundingClientRect().top;
    box.scrollTop += offset - (box.clientHeight - link.clientHeight) / 2;
  }, [pathname, open]);

  return (
    <>
      {open && <div className="sidebar-scrim" onClick={onClose} aria-hidden="true" />}
      <nav className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Course contents">
        {chapters.map((c) => (
          <section className="side-chapter" key={c.n}>
            <h2>
              {c.n > 0 && <span className="n">{c.n}</span>}
              <span>{c.title}</span>
            </h2>
            {c.preview && <span className="side-preview">Preview: not taught yet</span>}
            <ul>
              {c.lessons.map((l) => {
                const active = pathname === `/lesson/${l.id}`;
                return (
                  <li key={l.id}>
                    <Link
                      className="side-link"
                      to={`/lesson/${l.id}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={onClose}
                    >
                      <span className="num">{l.id}</span>
                      <span>
                        <NoBreak text={l.title} />
                      </span>
                      <span className="tick" aria-label={progress.done[l.id] ? 'completed' : undefined}>
                        {progress.done[l.id] ? <Check aria-hidden="true" /> : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </>
  );
}
