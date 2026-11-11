# Vercel Deployment

This project uses Next.js with server rendering and Server Actions. Deploy it
as a Next.js project on Vercel; do not configure it as a static export.

## Project settings

- Framework preset: **Next.js** (Vercel should detect this automatically)
- Root directory: **`.`**
- Node.js version: **22.x** (matches the tested project engine)
- Install command: leave at Vercel's detected default
- Build command: **`npm run build`**
- Output directory: use the **Next.js default**; do not override it

Vercel builds and runs Next.js using its framework integration. Keep the
project's existing `next.config.ts`; do not set `output: "export"` or add
Hostinger-specific standalone settings.

## Environment variable

Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin, such as
`https://averxon.ph`, in Vercel's **Production** environment. Add it to Preview
and Development only if those deployments should emit canonical metadata for
their own URLs. The code falls back to `https://averxon.ph` when it is omitted.

## Deploy and verify

1. Import the Git repository into Vercel and select the project root.
2. Confirm the settings above and add the production environment variable.
3. Deploy, then attach the production domain in Vercel when ready.
4. Verify the home page, `/games`, `/connect`, and `/news`, plus
   `/sitemap.xml`, `/robots.txt`, images, and the favicon.

For a local production smoke test, run `npm ci`, `npm run build`, then
`npm start` and open the local address printed by Next.js.

Vercel references: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs),
[build configuration](https://vercel.com/docs/builds/configure-a-build), and
[supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
