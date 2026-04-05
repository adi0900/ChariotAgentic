import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type {IncomingMessage, ServerResponse} from 'node:http';
import path from 'path';
import {defineConfig} from 'vite';
import {submitFormRequest} from './lib/form-submission';

const sendJson = (res: ServerResponse, status: number, payload: unknown) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const readRequestBody = async (req: IncomingMessage) => {
  const chunks: Uint8Array[] = [];

  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8').trim();
  return rawBody ? JSON.parse(rawBody) : {};
};

const formsApiPlugin = () => ({
  name: 'forms-api-plugin',
  configureServer(server: {
    middlewares: {
      use: (path: string, handler: (req: IncomingMessage, res: ServerResponse) => Promise<void>) => void;
    };
  }) {
    server.middlewares.use('/api/forms', async (req, res) => {
      if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.setHeader('Allow', 'POST, OPTIONS');
        res.end();
        return;
      }

      if (req.method !== 'POST') {
        sendJson(res, 405, {
          ok: false,
          error: 'Method not allowed.',
        });
        return;
      }

      try {
        const result = await submitFormRequest(await readRequestBody(req));
        sendJson(res, result.status, result.body);
      } catch (error) {
        console.error('Local forms API failed:', error);
        sendJson(res, 400, {
          ok: false,
          error: 'Invalid request body.',
        });
      }
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), formsApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR.
      // File watching is disabled there to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
