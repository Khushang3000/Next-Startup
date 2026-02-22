const required = [
  'NEXTAUTH_SECRET',
  'GITHUB_ID',
  'GITHUB_SECRET',
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_API_VERSION',
  'SANITY_WRITE_TOKEN'
];

const missing = required.filter((k) => !process.env[k]);

if (missing.length) {
  console.error('Missing required environment variables:');
  missing.forEach((m) => console.error('  -', m));
  console.error('\nCreate a `.env.local` from `.env.local.example` and set these before running.');
  process.exit(1);
}

console.log('All required env vars are present.');
