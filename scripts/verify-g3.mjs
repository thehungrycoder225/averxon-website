import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[G3_VERIFY_FAIL] ${message}`);
  }
}

// 1. Verify Master Lock & Design v2.2 docs are intact
const expectedDocs = {
  "design.md": 23572,
  "development-plan.md": 2989,
  "master-lock.md": 2669,
  "specification-sheet.md": 3794,
};

for (const [doc, size] of Object.entries(expectedDocs)) {
  const fullPath = path.join(root, "docs", doc);
  assert(fs.existsSync(fullPath), `Missing authoritative doc: docs/${doc}`);
  const stat = fs.statSync(fullPath);
  assert(
    stat.size === size,
    `Authoritative doc modified: docs/${doc} (expected ${size} bytes, got ${stat.size})`
  );
}

// 2. Verify all required routes exist
const requiredRoutes = [
  "app/page.tsx",
  "app/about/page.tsx",
  "app/games/page.tsx",
  "app/games/[slug]/page.tsx",
  "app/achievements/page.tsx",
  "app/news/page.tsx",
  "app/news/[slug]/page.tsx",
  "app/connect/page.tsx",
  "app/connect/actions.ts",
  "app/review/assets/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
];

for (const route of requiredRoutes) {
  assert(
    fs.existsSync(path.join(root, route)),
    `Missing required route file: ${route}`
  );
}

// 3. Verify all ingested official reference files and extracted 3D textures exist in public/assets/
const requiredIngestedAssets = [
  "public/assets/manifest.json",
  "public/assets/brand/averxon-studios-logo.jpg",
  "public/assets/brand/averxon-arrow-icon.png",
  "public/assets/brand/averxon-studios-lockup.png",
  "public/assets/games/chronicles-of-babaylan/posters/bakunawa-key-art.png",
  "public/assets/games/chronicles-of-babaylan/references/babaylan-turnaround.png",
  "public/assets/games/chronicles-of-babaylan/textures/remontada-front-alpha.png",
  "public/assets/games/chronicles-of-babaylan/textures/remontada-back-alpha.png",
  "public/assets/games/habulan/posters/habulan-logo-transparent.png",
  "public/assets/games/habulan/references/habulan-ken-ken.jpg",
  "public/assets/games/habulan/references/habulan-nining-joan.jpg",
  "public/assets/games/habulan/textures/ken-ken-alpha.png",
  "public/assets/games/habulan/textures/nining-joan-alpha.png",
  "public/assets/games/myth-mayhem/posters/myth-mayhem-card.png",
  "public/assets/games/myth-mayhem/references/myth-mayhem-manananggal.png",
  "public/assets/games/myth-mayhem/references/myth-mayhem-manananggal-3d-view.png",
  "public/assets/games/myth-mayhem/textures/manananggal-turn-front.png",
  "public/assets/games/myth-mayhem/textures/manananggal-turn-side.png",
  "public/assets/games/myth-mayhem/textures/manananggal-turn-back.png",
];

for (const assetPath of requiredIngestedAssets) {
  assert(
    fs.existsSync(path.join(root, assetPath)),
    `Missing required asset or 3D texture: ${assetPath}`
  );
}

// 4. Verify Goal 1 Canonical Flagship Title & Public Content Cleanup
const gamesSource = fs.readFileSync(path.join(root, "content/games.ts"), "utf8");
assert(
  gamesSource.includes("Legend of Bakunawa: Chronicles of Babaylan"),
  "content/games.ts must use canonical title 'Legend of Bakunawa: Chronicles of Babaylan'"
);

const forbiddenPublicPhrases = [
  "View Full Achievements & Partnerships Ledger",
  "Asset Intake & A0–A6 Review Matrix",
  "Ref Manifest",
  "Official 2D Ref",
  "Subtitle pending owner confirmation",
];

const publicFilesToCheck = [
  "components/experience/HomeExperienceClient.tsx",
  "components/site/GameShowcaseCard.tsx",
  "components/site/HeroNarrative.tsx",
  "components/site/SiteFooter.tsx",
  "components/site/AchievementCard.tsx",
  "app/games/[slug]/page.tsx",
  "app/achievements/page.tsx",
];

for (const relFile of publicFilesToCheck) {
  const src = fs.readFileSync(path.join(root, relFile), "utf8");
  for (const phrase of forbiddenPublicPhrases) {
    assert(
      !src.includes(phrase),
      `Public file ${relFile} still contains forbidden synthetic phrase: "${phrase}"`
    );
  }
}

const achievementsSource = fs.readFileSync(
  path.join(root, "content/achievements.ts"),
  "utf8"
);
for (const requiredClaim of [
  "Level Up 2.0",
  "Level Up 3.0",
  "Cyber Craft PH",
  "PROPEL DOST Region IV-B",
]) {
  assert(
    achievementsSource.includes(requiredClaim),
    `Missing required Master Lock achievement/partner claim: ${requiredClaim}`
  );
}

// 5. Verify WebGL context loss & resource disposal (AT09)
const canvasSource = fs.readFileSync(
  path.join(root, "components/experience/ExperienceCanvas.tsx"),
  "utf8"
);
assert(
  canvasSource.includes("webglcontextlost") &&
    canvasSource.includes("webglcontextrestored"),
  "ExperienceCanvas must handle webglcontextlost and webglcontextrestored"
);

console.log("G3_V22_VERIFICATION_SUITE=PASSED");
