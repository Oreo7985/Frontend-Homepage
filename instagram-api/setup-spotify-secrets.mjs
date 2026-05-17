import * as readline from 'readline/promises';
import { execSync } from 'child_process';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (q) => rl.question(q);

console.log('\n── Spotify Secrets Setup ────────────────────────────\n');

const cfToken      = (await ask('Cloudflare API Token: ')).trim();
const clientId     = (await ask('Spotify Client ID: ')).trim();
const clientSecret = (await ask('Spotify Client Secret: ')).trim();
const refreshToken = (await ask('Spotify Refresh Token: ')).trim();

rl.close();

const wrangler = './node_modules/.bin/wrangler';
const env = { ...process.env, CLOUDFLARE_API_TOKEN: cfToken };

const setSecret = (name, value) => {
  console.log(`\nSetting ${name}...`);
  execSync(`echo "${value}" | ${wrangler} secret put ${name}`, { env, stdio: 'inherit' });
};

try {
  setSecret('SPOTIFY_CLIENT_ID', clientId);
  setSecret('SPOTIFY_CLIENT_SECRET', clientSecret);
  setSecret('SPOTIFY_REFRESH_TOKEN', refreshToken);

  console.log('\nDeploying Worker...');
  execSync(`${wrangler} deploy`, { env, stdio: 'inherit' });

  console.log('\n✅ Done! All secrets set and Worker deployed.');
} catch (e) {
  console.error('\n❌ Failed:', e.message);
  process.exit(1);
}
