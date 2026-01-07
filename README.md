# jonarck.github.io

Personal homepage built with Jekyll + Chirpy (GitHub Pages).

## Edit profile

Edit `_data/profile.yml`:

- Header: `name`, `headline`, `location`, `email`, `links.*`
- About: `about` (Markdown supported)
- Timeline: `timeline` (order matters)
- Research Pathway: `research_pathway.image/alt/caption`
- Author highlight: `author_highlight` (bolds your name in `authors`)

## Add publications

Edit `_data/publications.yml` (display order follows the YAML order).

### Fields

- `title` (string)
- `category` (string): `core` | `branch` | `other`
- `role` (string): your positioning in the research pathway
- `venue` (string)
- `authors` (string): author list
- `tags` (string[], optional)
- `url` (string, optional)
- `image` (string, optional): thumbnail path (e.g. `/assets/img/pubs/your-paper.png`)

### Publications tabs

- **Core Work**: card layout (Title → Role → Venue → Authors → Tags)
- **Important Branch Work**: same card layout
- **All Works**: list layout (recommended for `other`)
- Click a tag to filter; it switches to **All Works**

## Assets

- Avatar: set `avatar` in `_config.yml` (e.g. `/assets/img/avatar.jpg`)
- Research Pathway image: `assets/img/research_summary.png`
- Publication thumbnails: `assets/img/pubs/*`
- CV PDF: `research_pathway_pdf/2.CV-ZhuoyangJIANG.pdf`

## Deploy

GitHub Actions workflow: `.github/workflows/pages-deploy.yml`

## Local preview (optional)

If you have Ruby installed:

- `bundle install`
- `bundle exec jekyll s`

