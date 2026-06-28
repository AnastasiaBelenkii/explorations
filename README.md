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

- Project name: `explorations`
- Production branch: `main`
- Build command: `npx @11ty/eleventy`
- Build output directory: `_site`

Manual Wrangler deploy:

```sh
npm install
npm run build
npx wrangler@latest pages deploy _site --project-name=explorations
```
