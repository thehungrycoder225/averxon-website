const BASE_URL = "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/games",
  "/games/chronicles-of-babaylan",
  "/games/habulan",
  "/games/myth-mayhem",
  "/achievements",
  "/news",
  "/news/introducing-averxon-hybrid-cultural-futurism",
  "/connect",
  "/review/assets",
  "/assets/manifest.json",
  "/sitemap.xml",
  "/robots.txt",
];

async function runProbe() {
  for (const route of ROUTES) {
    const res = await fetch(`${BASE_URL}${route}`);
    const body = await res.text();
    if (res.status !== 200) {
      throw new Error(`Route ${route} returned HTTP ${res.status}`);
    }
    console.log(`[HTTP ${res.status}] ${route} (${body.length} bytes)`);
  }
  console.log("LOCAL_SERVER_PROBE=ALL_14_ENDPOINTS_OK");
}

runProbe().catch((err) => {
  console.error(err);
  process.exit(1);
});
