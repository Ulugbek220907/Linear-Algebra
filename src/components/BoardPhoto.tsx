import { useState, useEffect } from 'react';
import { Eye, X } from 'lucide-react';
import { Rich } from '../lib/rich';

export interface BoardPhotoProps {
  photo: string;
  caption?: string;
  note?: string;
  badge?: string;
}

export function BoardPhoto({ photo, caption, note, badge = 'Lecture Board' }: BoardPhotoProps) {
  const [open, setOpen] = useState(false);
  const isFile = typeof window !== 'undefined' && window.location.protocol === 'file:';
  const cleanBase = isFile ? './' : '/';
  const src = photo.startsWith('http')
    ? photo
    : photo.startsWith('/')
      ? (isFile ? `.${photo}` : photo)
      : `${cleanBase}board/${photo}`;

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <>
      <figure className="board-card" aria-label={caption ?? 'Lecture blackboard photo'}>
        <div className="board-img-wrap" onClick={() => setOpen(true)} title="Click to view full screen">
          <img src={src} alt={caption ?? 'Lecture board photo'} className="board-img" loading="lazy" />
        </div>
        <figcaption className="board-caption">
          <div>
            <span className="board-badge">{badge}</span>
            {caption && (
              <span style={{ marginLeft: 'var(--s2)', fontWeight: 600 }}>
                <Rich text={caption} />
              </span>
            )}
            {note && (
              <p style={{ margin: 'var(--s1) 0 0', color: 'var(--ink-2)', fontSize: 'var(--t-xs)' }}>
                <Rich text={note} />
              </p>
            )}
          </div>
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={() => setOpen(true)}
            aria-label="Enlarge board photo"
          >
            <Eye /> Enlarge
          </button>
        </figcaption>
      </figure>

      {open && (
        <div className="board-modal-overlay" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <div className="board-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="icon-btn"
              style={{ position: 'absolute', top: -36, right: 0, color: '#fff' }}
              onClick={() => setOpen(false)}
              aria-label="Close enlarged photo"
            >
              <X />
            </button>
            <img src={src} alt={caption ?? 'Enlarged lecture board photo'} className="board-modal-img" />
            {caption && (
              <div className="board-modal-cap">
                <Rich text={caption} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
