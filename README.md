# Digital Resume

A React + TypeScript + Vite digital resume with:
- Resume sections (`About`, `Experience`, `Skills`, `Education`, `Languages`)
- A chat assistant with a frontend-only provider architecture (`mock` and `http` modes)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

### Option 1: Vercel dashboard (recommended)
1. Push this project to GitHub.
2. Go to [Vercel](https://vercel.com/new).
3. Import the GitHub repository.
4. Vercel should auto-detect Vite settings. Deploy.

This repo includes `vercel.json` with explicit build settings:
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

For production deployment:

```bash
vercel --prod
```

## Assistant mode

Assistant behavior is configured in `src/modules/constants.ts`:
- `mode: 'mock'` uses deterministic local responses.
- `mode: 'http'` is frontend-ready for an API endpoint at `endpoint`.
