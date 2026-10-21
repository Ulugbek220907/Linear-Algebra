import { useEffect, useMemo, useState } from 'react';
import { Check, Eye, EyeOff, Trash2 } from 'lucide-react';
import { applyTheme, progressStore, saveApiKey, settingsStore, useSettings } from '../lib/store';
import { fetchModels, type ModelInfo } from '../teacher/api';
import { clearThreads } from '../teacher/threads';
import { Seg } from '../widgets/ui';
import { MODE_OPTIONS } from '../teacher/TeacherDock';

function ModelPicker() {
  const s = useSettings();
  const [models, setModels] = useState<ModelInfo[] | null>(null);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [free, setFree] = useState(false);
  const [vision, setVision] = useState(false);

  useEffect(() => {
    let live = true;
    fetchModels(s.baseUrl)
      .then((m) => live && setModels(m))
      .catch(() => live && setErr('Could not load the live model list. You can still type a model ID below.'));
    return () => {
      live = false;
    };
  }, [s.baseUrl]);

  const shown = useMemo(() => {
    if (!models) return [];
    const needle = q.trim().toLowerCase();
    return models
      .filter((m) => (!free || m.free) && (!vision || m.vision) && (!needle || m.id.toLowerCase().includes(needle) || m.name.toLowerCase().includes(needle)))
      .slice(0, 60);
  }, [models, q, free, vision]);

  return (
    <div style={{ display: 'grid', gap: 'var(--s3)' }}>
      <label className="field">
        <span>Model ID (any model on openrouter.ai/models)</span>
        <input type="text" spellCheck={false} value={s.model} onChange={(e) => settingsStore.set({ model: e.target.value.trim() })} />
      </label>
      <div style={{ display: 'flex', gap: 'var(--s2)', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-sm" onClick={() => settingsStore.set({ model: 'openrouter/auto' })}>
          Use auto router
        </button>
        <span className="q-hint" style={{ alignSelf: 'center' }}>
          "openrouter/auto" chooses the best model for each query. For photos, choose one marked "sees pictures".
        </span>
      </div>
      <div className="widget-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--s3)' }}>
        <label className="field">
          <span>Search models</span>
          <input type="search" value={q} placeholder="claude, gemini, deepseek, gpt..." onChange={(e) => setQ(e.target.value)} />
        </label>
        <div className="field">
          <span className="label">Filters</span>
          <div style={{ display: 'flex', gap: 'var(--s4)', alignItems: 'center', minHeight: '2.5rem' }}>
            <label className="check-row">
              <input type="checkbox" checked={free} onChange={(e) => setFree(e.target.checked)} /> Free only
            </label>
            <label className="check-row">
              <input type="checkbox" checked={vision} onChange={(e) => setVision(e.target.checked)} /> Sees pictures
            </label>
          </div>
        </div>
      </div>
      {err && <p className="q-hint" role="alert">{err}</p>}
      {!models && !err && <p className="q-hint">Loading model list from OpenRouter…</p>}
      {models && (
        <ul className="model-list" aria-label="Available models">
          {shown.length === 0 && (
            <li style={{ padding: 'var(--s3)' }} className="q-hint">
              No matching models found.
            </li>
          )}
          {shown.map((m) => (
            <li key={m.id}>
              <button type="button" className="model-opt" aria-pressed={m.id === s.model} onClick={() => settingsStore.set({ model: m.id })}>
                <span>
                  <b>{m.name}</b>
                </span>
                <span className="id">{m.id}</span>
                <span className="badges">
                  {m.free && <span className="chip chip-accent">free</span>}
                  {m.vision && <span className="chip">sees pictures</span>}
                  {m.ctx > 0 && <span className="chip">{Math.round(m.ctx / 1000)}k context</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Settings() {
  const s = useSettings();
  const [key, setKey] = useState('');
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  const masked = s.apiKey ? `${s.apiKey.slice(0, 8)}…${s.apiKey.slice(-4)}` : '';

  useEffect(() => {
    document.title = 'Settings · Linear Algebra';
  }, []);

  return (
    <div className="page page-narrow">
      <div className="page-head">
        <h1>Settings & AI Configuration</h1>
      </div>

      <section className="settings-section" aria-labelledby="s-ai">
        <h2 id="s-ai">AI Teacher Setup (OpenRouter)</h2>
        {s.apiKey ? (
          <div className="callout idea">
            <Check aria-hidden="true" />
            <div className="callout-body">
              <div className="callout-title">Key active: {masked}</div>
              <p>{s.remember ? 'Safely stored in this browser.' : 'Temporary: will be cleared when you close this tab.'}</p>
              <button type="button" className="btn btn-sm" onClick={() => saveApiKey('', s.remember)}>
                <Trash2 /> Remove API key
              </button>
            </div>
          </div>
        ) : (
          <p className="q-hint">No API key saved yet. Connect an OpenRouter key to activate the AI Teacher.</p>
        )}
        <form
          style={{ display: 'grid', gap: 'var(--s3)' }}
          onSubmit={(e) => {
            e.preventDefault();
            if (!key.trim()) return;
            saveApiKey(key.trim(), s.remember);
            setKey('');
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
          }}
        >
          <label className="field">
            <span>{s.apiKey ? 'Replace active API key' : 'Paste your OpenRouter API key'}</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--s2)' }}>
              <input
                type={show ? 'text' : 'password'}
                autoComplete="off"
                spellCheck={false}
                placeholder="sk-or-v1-…"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <button type="button" className="icon-btn" aria-label={show ? 'Hide key' : 'Show key'} onClick={() => setShow((v) => !v)}>
                {show ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </label>
          <label className="check-row">
            <input type="checkbox" checked={s.remember} onChange={(e) => saveApiKey(s.apiKey, e.target.checked)} />
            <span>Remember on this browser (untick on shared/lab devices)</span>
          </label>
          <div style={{ display: 'flex', gap: 'var(--s3)', alignItems: 'center' }}>
            <button className="btn btn-primary" type="submit" disabled={!key.trim()}>
              Save API key
            </button>
            {saved && <span role="status" style={{ color: 'var(--ok)', fontWeight: 650 }}>Saved successfully!</span>}
          </div>
          <p className="q-hint">
            Generate an API key at{' '}
            <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer noopener">
              openrouter.ai/keys
            </a>. The key never touches an intermediate server and communicates directly from your browser.
          </p>
        </form>

        <h3>Model Selection</h3>
        <ModelPicker />

        <h3>Default Preferences</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--s4)' }}>
          <div className="field">
            <span className="label">Teaching style</span>
            <Seg label="Teaching style" value={s.mode} onChange={(m) => settingsStore.set({ mode: m })} options={MODE_OPTIONS} />
          </div>
          <label className="field">
            <span>Response language</span>
            <select value={s.language} onChange={(e) => settingsStore.set({ language: e.target.value as typeof s.language })}>
              <option value="auto">Match my question</option>
              <option>English</option>
              <option>O'zbek</option>
              <option>Русский</option>
            </select>
          </label>
        </div>
      </section>

      <section className="settings-section" aria-labelledby="s-look">
        <h2 id="s-look">Appearance & Theme</h2>
        <Seg
          label="Theme"
          value={s.theme}
          onChange={(t) => {
            settingsStore.set({ theme: t });
            applyTheme(t);
          }}
          options={[
            { value: 'system', label: 'Match system' },
            { value: 'light', label: 'Light mode' },
            { value: 'dark', label: 'Dark mode' },
          ]}
        />
      </section>

      <section className="settings-section" aria-labelledby="s-data">
        <h2 id="s-data">Local Data & Privacy</h2>
        <p className="q-hint">All lesson completions, quiz metrics, and AI discussions are kept exclusively in local storage.</p>
        <div style={{ display: 'flex', gap: 'var(--s3)', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (confirm('Reset all lesson progress, quiz scores, and the mistake bank?')) progressStore.reset();
            }}
          >
            <Trash2 /> Reset study progress
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              if (confirm('Delete all saved AI Teacher chat threads?')) clearThreads();
            }}
          >
            <Trash2 /> Clear chat history
          </button>
        </div>
      </section>
    </div>
  );
}
