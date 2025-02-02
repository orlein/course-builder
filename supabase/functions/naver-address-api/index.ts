// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { Hono } from 'jsr:@hono/hono';

const functionName = 'naver-address-api';
const app = new Hono().basePath(`/${functionName}`);

app.get('/', () => {
  try {
    return new Response('Hello, World!', { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
});

Deno.serve(app.fetch);
