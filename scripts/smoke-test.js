// Simple smoke test to hit local endpoints. Start the dev server first.
const urls = ['http://localhost:3000/', 'http://localhost:3000/api/auth/signin', 'http://localhost:3000/api/sentry-example-api'];

async function ping(url) {
  try {
    const res = await fetch(url, { method: 'GET' });
    console.log(`${url} -> ${res.status}`);
  } catch (err) {
    console.error(`${url} -> error: ${err.message}`);
  }
}

(async () => {
  for (const u of urls) await ping(u);
})();
