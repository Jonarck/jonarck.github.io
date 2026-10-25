# Zhuoyang Jiang — personal website

An Astro website adapted from [Astro Nano](https://github.com/markhorn-dev/astro-nano), with translucent surfaces, a floating navigation bar, geometric accents, and light/dark/system themes. The original template's MIT notice is preserved in `licenses/astro-nano.txt`.

The current [architectural background study](docs/architecture-backgrounds.md) uses Kyoto Station for About, Philips Pavilion for Research, La Tourette for Projects, and Hangzhou National Archives for Blog. It includes reference selections, generation prompts, and links to preserved versions.

## Run locally

Use Node.js 24 (22.12+ is supported).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173/. To check the production site:

```sh
npm run build
npm run verify
npm run preview
```

`build` checks TypeScript and creates a static site in `dist/`. `verify` checks generated pages, internal links, assets, canonical metadata, feeds, and the unpublished template. No Ruby installation is needed.

## Pages and content

| Content | Edit here |
| --- | --- |
| Biography, education, interests, contact details, updates | `src/data/profile.yml` |
| Publications, authorship, tags, links | `src/data/publications.yml` |
| Research theme descriptions | `src/data/research_topics.yml` |
| Blog posts | `src/content/blog/*.md` or `.mdx` |
| Projects | `src/content/projects/*.md` or `.mdx` |
| Navigation | `src/lib/site.ts` |
| Base typography and content layout | `src/styles/global.css` |
| Glass materials, geometric accents, and responsive composition | `src/styles/glass.css` |
| Architectural visual experiment: palette, structure, and geometry | `src/styles/architecture.css`, `src/components/ArchitecturalStudy.astro` |
| Images and downloads | `public/` |

The home page is `/`. The old `/about/` and `/cv/` addresses redirect there; About retains the direct CV PDF link. `/publications/`, existing image URLs, and PDF URLs are preserved. Projects have `/projects/slug/` URLs; posts have `/blog/slug/` URLs. A file named `my-project.md` has the slug `my-project`.

The current architectural visual experiment and its sources, local reference board, and preserved glass-version snapshot are documented in [docs/architecture-study.md](docs/architecture-study.md).

## Write a blog post

Copy `src/content/blog/post-template.md` to a new file, for example `src/content/blog/design-notes.md`. Edit its front matter and write Markdown below it:

```yaml
---
title: Your post title
description: A short summary for the list and RSS feed.
date: 2026-09-28
draft: true
tags: [Design, Research]
lang: en
---
```

Set `lang: zh-CN` for Chinese posts. Optional fields include `updated`, `image`, `image_alt`, and `image_caption`. Use `translation_key` and `translation_of` to pair languages, and `series_id` / `series` / `series_en` to group a collection. Chinese originals appear once in lists and RSS, with a visible English reading link.

The first collection, **拾古与故事 / Stones into Stories**, includes a bilingual prologue and an expandable image gallery. See [bilingual publishing and image storage](docs/blog-publishing.md). Optimized gallery assets live under `public/media/`; originals and preparation files stay outside the published site. `PUBLIC_MEDIA_BASE_URL` can point to a future image host while preserving article paths.

Set `draft: false` when ready. Drafts and future-dated entries are excluded from lists, detail routes, home-page previews, RSS, and sitemap in both development and production. To preview an unpublished entry locally, temporarily set `draft: false` and a current or past date, then restore it before publishing. Future dates become visible on a subsequent build after that date.

Markdown supports headings, tables, links, images, quotations, and highlighted code blocks. MDX supports Astro components. The template stays unpublished; no demonstration posts are presented as personal writing.

## Add a project

Copy `docs/templates/project.md` to `src/content/projects/your-project.md`. Fill in `title`, `description`, and `date`, and set `draft: false` when ready. Optional fields:

- `tags`: topic labels
- `role`, `venue`: context shown on the detail page
- `image`, `image_alt`, `image_caption`: project figure or screenshot
- `code`, `demo`, `paper`: external links; omitted links do not appear
- `lang`: page language

Write the project description below the front matter. Projects sort by date, newest first. Work already presented in Research is not repeated in Projects; CAGenMol's project source is retained as a draft while its publication and code link remain in Research. The personal website entry is also retained as a draft and excluded from the public portfolio.

## Publications

Each entry in `src/data/publications.yml` has `title`, `year`, `published`, `venue`, `authors`, `topic`, `authorship`, `tags`, and `url`. Optional fields are `summary`, `code`, and `image`.

- `published` is a quoted date (`YYYY-MM-DD`, or `YYYY` if only the year is known), used for reverse chronological ordering.
- `topic`: `molecules`, `environments`, `entertainment`, `methods`, or `explorations`.
- `authorship`: `first`, `co-first`, or `co-author`.
- `selected: true` explicitly includes a paper in the default Selected work view. The current selection is Floorplan and CamS: first-author preprints are included, while Land papers and second-listed co-first authorship are excluded. Other papers remain in All work. One-sentence summaries are not displayed.
- Five groups organize physical sciences, built environments, entertainment, AI/HCI methods, and related explorations. CamS belongs to physical sciences; RationaleTS and IntentPOI belong to related explorations.
- Native radio controls independently filter the curated selection and research area. Empty entertainment and methods sections display “Coming soon.” Figures use uniform frames and an accessible enlarged view.
- `author_highlight` in the profile data determines which author names are emphasized. `*` denotes equal contribution.

## Deploy

`.github/workflows/deploy.yml` installs dependencies from the committed lockfile, checks and builds Astro, and deploys `dist/` to GitHub Pages on a push to `main` or a manual workflow run. GitHub Pages should use **GitHub Actions** as its source. This repository is a user site, so no base path is required.

RSS is available at `/feed.xml`; sitemap and robots.txt are generated at build time. Replacing Jekyll changes the build pipeline, but not the hosting provider.

The About visitor map loads its configured MapMyVisitors widget only on the canonical HTTPS domain. Local previews do not send statistics. See [visitor-map integration](docs/visitor-map.md) for scope, theme handling, and failure behavior.
