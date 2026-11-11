const BASE_URL = "http://localhost:3000";

const HTML_ROUTES = [
  "/",
  "/about",
  "/games",
  "/games/chronicles-of-babaylan",
  "/games/project-tumba",
  "/games/habulan",
  "/games/myth-mayhem",
  "/achievements",
  "/news",
  "/news/introducing-averxon-hybrid-cultural-futurism",
  "/connect",
];

const MEDIA_URLS = [
  "/media/brand/averxon-wordmark.svg",
  "/media/posters/ch1-awakening.svg",
  "/media/posters/ch2-heritage.svg",
  "/media/posters/ch3-four-worlds.svg",
  "/media/posters/ch4-milestones.svg",
  "/media/posters/ch5-creation.svg",
  "/media/posters/ch6-future.svg",
  "/media/games/chronicles-of-babaylan/poster.svg",
  "/media/games/project-tumba/poster.svg",
  "/media/games/habulan/poster.svg",
  "/media/games/myth-mayhem/poster.svg",
  "/media/models/manifest.json",
];

function assert(cond, msg) {
  if (!cond) {
    throw new Error(`[LIVE_DOM_VERIFY_FAIL] ${msg}`);
  }
}

async function main() {
  // 1. Verify all 11 HTML routes for landmarks, skip links, security headers, and Master Lock content
  for (const route of HTML_ROUTES) {
    const res = await fetch(`${BASE_URL}${route}`);
    assert(res.status === 200, `${route} expected HTTP 200, got ${res.status}`);

    // Security headers check
    assert(
      res.headers.get("x-content-type-options") === "nosniff",
      `${route} missing X-Content-Type-Options: nosniff`
    );
    assert(
      res.headers.get("x-frame-options") === "DENY",
      `${route} missing X-Frame-Options: DENY`
    );

    const html = await res.text();
    assert(
      html.includes('href="#main-content"'),
      `${route} missing Skip to main content link`
    );
    assert(
      html.includes('role="banner"'),
      `${route} missing <header role="banner"> landmark`
    );
    assert(
      html.includes('id="main-content"'),
      `${route} missing <main id="main-content"> landmark`
    );
    assert(
      html.includes('role="contentinfo"'),
      `${route} missing <footer role="contentinfo"> landmark`
    );
    assert(html.includes("<h1"), `${route} missing <h1> heading`);
    assert(
      html.includes("application/ld+json"),
      `${route} missing structured data JSON-LD`
    );

    if (route === "/") {
      for (const ch of [
        "awakening",
        "heritage",
        "four-worlds",
        "milestones",
        "creation",
        "future",
      ]) {
        assert(
          html.includes(`id="${ch}"`),
          `Homepage missing chapter section #${ch}`
        );
      }
    }
  }

  // 2. Verify all 12 static media & manifest endpoints on live server
  for (const mediaPath of MEDIA_URLS) {
    const res = await fetch(`${BASE_URL}${mediaPath}`);
    assert(
      res.status === 200,
      `Media asset ${mediaPath} expected HTTP 200, got ${res.status}`
    );
  }

  console.log("LIVE_DOM_AND_MEDIA_AUDIT=PASSED");
  console.log(`ROUTES_VERIFIED=${HTML_ROUTES.length}`);
  console.log(`MEDIA_ENDPOINTS_VERIFIED=${MEDIA_URLS.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
