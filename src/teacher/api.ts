/** Minimal OpenRouter (OpenAI-compatible) client for the browser: streaming chat + model list. */

export interface ApiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | ({ type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } })[];
}

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

function friendly(status: number, raw: string): string {
  if (status === 401 || status === 403)
    return 'OpenRouter did not accept this API key. Open Settings, paste your key (starts with sk-or-), and make sure it has not been revoked.';
  if (status === 402)
    return 'This model requires credits and your OpenRouter balance is 0. Add credits at openrouter.ai/credits, or choose a free model (ending in :free) in Settings.';
  if (status === 404)
    return 'OpenRouter could not find an available provider for this model. Pick another model in Settings (or use "openrouter/auto").';
  if (status === 408 || status === 504) return 'The model took too long to answer. Try again, or choose a faster model in Settings.';
  if (status === 429) return 'Rate limit reached. Wait a few seconds and try again, or choose a different model.';
  if (status >= 500) return `OpenRouter or the model provider had a problem (${status}). Try again in a moment.`;
  return raw || `Request failed (${status}).`;
}

export interface StreamOptions {
  baseUrl: string;
  apiKey: string;
  model: string;
  messages: ApiMessage[];
  signal?: AbortSignal;
  onToken: (t: string) => void;
}

export async function streamChat({ baseUrl, apiKey, model, messages, signal, onToken }: StreamOptions): Promise<void> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
    'X-Title': 'Linear Algebra Interactive Study Platform',
  };
  if (/^https?:/.test(location.origin)) headers['HTTP-Referer'] = location.origin;

  let res: Response;
  try {
    res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers,
      signal,
      body: JSON.stringify({ model, messages, stream: true, temperature: 0.35 }),
    });
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw e;
    throw new ApiError('Could not reach OpenRouter. Check your internet connection, then try again.');
  }
  if (!res.ok) {
    let raw = '';
    try {
      const j = await res.json();
      raw = j?.error?.message ?? '';
    } catch {
      /* ignore */
    }
    throw new ApiError(friendly(res.status, raw), res.status);
  }
  if (!res.body) throw new ApiError('The response had no body to stream.');

  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  let got = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let idx: number;
    while ((idx = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line || line.startsWith(':') || !line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') {
        if (!got) throw new ApiError('The model returned an empty answer. Try again or choose another model.');
        return;
      }
      let j: { error?: { message?: string; code?: number }; choices?: { delta?: { content?: string } }[] };
      try {
        j = JSON.parse(data);
      } catch {
        continue;
      }
      if (j.error) throw new ApiError(friendly(j.error.code ?? 500, j.error.message ?? 'The model reported an error.'), j.error.code);
      const delta = j.choices?.[0]?.delta?.content;
      if (delta) {
        got = true;
        onToken(delta);
      }
    }
  }
  if (!got) throw new ApiError('The model returned an empty answer. Try again or choose another model.');
}

export interface ModelInfo {
  id: string;
  name: string;
  free: boolean;
  vision: boolean;
  ctx: number;
}

let cache: ModelInfo[] | null = null;
export async function fetchModels(baseUrl: string): Promise<ModelInfo[]> {
  if (cache) return cache;
  try {
    const raw = sessionStorage.getItem('la.models');
    if (raw) {
      cache = JSON.parse(raw);
      return cache!;
    }
  } catch {
    /* ignore */
  }
  const res = await fetch(`${baseUrl.replace(/\/$/, '')}/models`);
  if (!res.ok) throw new ApiError('Could not load the model list.');
  const j = (await res.json()) as {
    data: {
      id: string;
      name?: string;
      context_length?: number;
      pricing?: { prompt?: string; completion?: string };
      architecture?: { input_modalities?: string[] };
    }[];
  };
  const list: ModelInfo[] = (j.data ?? []).map((m) => ({
    id: m.id,
    name: m.name ?? m.id,
    free: Number(m.pricing?.prompt ?? 1) === 0 && Number(m.pricing?.completion ?? 1) === 0,
    vision: !!m.architecture?.input_modalities?.includes('image'),
    ctx: m.context_length ?? 0,
  }));
  cache = list;
  try {
    sessionStorage.setItem('la.models', JSON.stringify(list));
  } catch {
    /* ignore */
  }
  return list;
}
export const modelKnownVision = (id: string): boolean | undefined => cache?.find((m) => m.id === id)?.vision;
