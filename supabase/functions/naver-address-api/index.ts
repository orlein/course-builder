// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { Hono } from 'jsr:@hono/hono';
import { cors } from 'jsr:@hono/hono/cors';

const functionName = 'naver-address-api';
const app = new Hono().basePath(`/${functionName}`);

const fetchToNaver = async (query: string) => {
  const url = new URL('https://openapi.naver.com/v1/search/local');
  url.searchParams.set('query', query);
  const response = await fetch(url, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': Deno.env.get('NAVER_DEVELOPERS_CLIENT_ID')!,
      'X-Naver-Client-Secret': Deno.env.get('NAVER_DEVELOPERS_CLIENT_SECRET')!,
    },
  });

  return await response.text();
};

app.use(
  '/*',
  cors({
    origin: [
      'http://localhost:3000',
      'https://course-builder-liard.vercel.app/',
      'https://course-builder-orcin-sigma.vercel.app/',
      'https://oz-adv-course-builder.vercel.app/',
    ],
    allowMethods: ['GET', 'OPTIONS'],
  }),
);

app.options('/', () => {
  return new Response('ok');
});

app.get('/', async (c) => {
  try {
    const { query } = c.req.query();
    const decoded = decodeURIComponent(query);
    const data = await fetchToNaver(decoded);
    return new Response(data);
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
});

Deno.serve(app.fetch);
