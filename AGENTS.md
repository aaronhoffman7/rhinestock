# Codex Agent Instructions

This repository contains the ReDelicious website built with Next.js 15 using the App Router and TypeScript.

## Project layout

- `src/app` – all route pages and UI components.
- `src/app/components` – shared React components.
- `src/app/layout.tsx` and `src/app/globals.css` configure global layout and styles.
- `public` – static assets such as images and scripts.

Use the `@/` alias to import from `src`.

## Development notes

- Components or pages that rely on browser APIs should include `"use client"`.
- Keep TypeScript strictness and end files with a trailing newline.
- Commit messages should be short, present-tense summaries, e.g. `Add footer` or `Update header links`.

## Required checks

Run `npm run lint` before committing to ensure ESLint passes.
