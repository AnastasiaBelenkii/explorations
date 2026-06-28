# Explorations

Minimal Eleventy blog deployed with Cloudflare Pages.

## Build

```sh
npm install
npm run build
```

The Eleventy output directory is `_site`.

## Cloudflare Pages

Use these settings when configuring Cloudflare Pages:

- Project name: `jacobbelenkii`
- Production branch: `main`
- Build command: `npx @11ty/eleventy`
- Build output directory: `_site`
- Pages URL: `https://jacobbelenkii.pages.dev`

Manual Wrangler deploy:

```sh
npm install
npm run build
npx wrangler@latest pages deploy _site --project-name=jacobbelenkii
```
