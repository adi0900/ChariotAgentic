import {submitFormRequest} from '../lib/form-submission';

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(payload: unknown): void;
  end(message?: string): void;
};

const parseBody = (body: unknown) => {
  if (typeof body !== 'string') return body;
  if (!body.trim()) return {};
  return JSON.parse(body);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({
      ok: false,
      error: 'Method not allowed.',
    });
    return;
  }

  try {
    const result = await submitFormRequest(parseBody(req.body));
    res.status(result.status).json(result.body);
  } catch (error) {
    console.error('API request parsing failed:', error);
    res.status(400).json({
      ok: false,
      error: 'Invalid request body.',
    });
  }
}
