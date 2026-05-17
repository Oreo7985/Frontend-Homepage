/**
 * One-time script to get Spotify refresh token.
 * Usage: node get-spotify-token.mjs <CLIENT_ID> <CLIENT_SECRET>
 */
import * as readline from 'readline/promises';
import { exec } from 'child_process';

const [,, CLIENT_ID, CLIENT_SECRET] = process.argv;
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Usage: node get-spotify-token.mjs <CLIENT_ID> <CLIENT_SECRET>');
  process.exit(1);
}

const REDIRECT_URI = 'http://127.0.0.1:3000/callback';
const SCOPE = [
  'user-read-recently-played',
  'user-read-currently-playing',
  'user-top-read',
].join(' ');

const authUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPE)}`;

console.log('\n── Spotify Token Setup ──────────────────────────────');
console.log('\nStep 1: Open this URL in your browser:\n');
console.log(authUrl);
console.log('\n(Attempting to open automatically...)');
exec(`open "${authUrl}"`);

console.log('\nStep 2: Click "Agree" in the browser.');
console.log('Step 3: The page will fail to load — that is expected.');
console.log('Step 4: Copy the FULL URL from the address bar and paste it below.\n');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const redirected = await rl.question('Paste the redirect URL here: ');
rl.close();

let code;
try {
  const parsed = new URL(redirected.trim());
  code = parsed.searchParams.get('code');
  const error = parsed.searchParams.get('error');
  if (error) throw new Error(`Spotify returned error: ${error}`);
  if (!code) throw new Error('No "code" param found in URL');
} catch (e) {
  console.error('\nFailed to parse URL:', e.message);
  process.exit(1);
}

console.log('\nExchanging code for tokens...');

const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
  }).toString(),
});

const tokens = await tokenRes.json();

if (tokens.refresh_token) {
  console.log('\n✅ Success! Your refresh token:\n');
  console.log(tokens.refresh_token);
  console.log('\nRun setup-spotify-secrets.mjs in instagram-api/ to apply it.');
} else {
  console.error('\nFailed to get token:');
  console.error(JSON.stringify(tokens, null, 2));
  process.exit(1);
}
