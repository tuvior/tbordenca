# Tobias Bordenca Portfolio

Personal portfolio site. Built with Next.js and Tailwind CSS.

## Tech stack

- Next.js App Router (SSR-friendly, static export)
- React 19
- Tailwind CSS (Nord palette)
- Motion, lucide-react, react-type-animation

## Local development

```bash
bun install
bun dev
```

With `basePath` enabled, the dev server runs under `/tbordenca`:

```
http://localhost:3000/tbordenca
```

## Build and export

```bash
bun run build
```

## Customizing content

- Data: `src/data/*`
- Page sections: `src/components/sections/*`
- UI components: `src/components/ui/*`
- Static assets: `public/*`

## Deployment notes

`next.config.ts` is configured with `basePath` and `assetPrefix` for `/tbordenca`. If you deploy under a different subpath (or root), update `basePath` and `env.NEXT_PUBLIC_BASE_PATH` accordingly.
