import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './styles/fonts.css';
import './styles/katex-lite.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/matrix.css';
import './styles/teacher.css';

const isFileProto = typeof window !== 'undefined' && window.location.protocol === 'file:';

// On web hosting (e.g. Render), migrate any legacy hash deep link (#/lesson/...) to a clean pathname
if (!isFileProto && typeof window !== 'undefined' && window.location.hash.startsWith('#/')) {
  const cleanPath = window.location.hash.slice(1);
  window.history.replaceState(null, '', cleanPath);
}

const Router = isFileProto ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
