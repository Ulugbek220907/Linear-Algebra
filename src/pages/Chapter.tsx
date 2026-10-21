import { NoBreak } from '../lib/nobreak';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { chapters } from '../content';

export default function ChapterPage() {
  const { n } = useParams();
  const c = chapters.find((x) => String(x.n) === n);
  if (!c) return <Navigate to="/" replace />;
  return (
    <div className="page page-narrow">
      <div className="page-head">
        <h1>
          {c.n > 0 ? `Chapter ${c.n}: ` : ''}
          <NoBreak text={c.title} />
        </h1>
        <p>{c.blurb}</p>
      </div>
      <ul className="lesson-rows">
        {c.lessons.map((l) => (
          <li key={l.id}>
            <Link className="lesson-row" to={`/lesson/${l.id}`}>
              <span className="num">{l.id}</span>
              <span className="title">
                {l.title}
                <span className="sub">{l.summary}</span>
              </span>
              <span className="min">{l.minutes} min</span>
              <ArrowRight />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
