# jonarck.github.io

Personal homepage built with Jekyll + Chirpy (GitHub Pages).

## Edit profile

Edit `_data/profile.yml`:

- Header: `name`, `headline`, `location`, `email`, `links.*`
- About: `about` (Markdown supported)
- Timeline: `timeline` (order matters)
- Research Pathway: `research_pathway.image/alt/caption`

## Add publications

Edit `_data/publications.yml` (display order follows the YAML order).

### Fields

- `title` (string)
- `category` (string): `core` | `branch` | `other`
- `position` (string): your positioning in the research pathway
- `venue` (string)
- `authors` (string[])
- `tags` (string[], optional)
- `url` (string, optional)
- `image` (string, optional): thumbnail path (e.g. `/assets/img/pubs/your-paper.png`)

### How the Publications page works

- **Core Contributions**: cards with 5 lines (Title → Position → Venue → Authors → Tags)
- **Key Branch Contributions**: same card style
- **All Contributions**: simple list style (recommended for `other`)
- Click a tag to filter; it switches to **All Contributions**

### Bold your name in authors

Edit `author_highlight` in `_data/profile.yml` (exact match in `authors` list).

## Assets

- Avatar placeholder: `assets/img/avatar.svg` (replace with your photo if you want)
- Research Pathway image: `assets/img/research_summary.png`
- Publication thumbnails: `assets/img/pubs/*`
- CV PDF: `research_pathway_pdf/2.CV-ZhuoyangJIANG.pdf`

## Deploy

GitHub Actions workflow: `.github/workflows/pages-deploy.yml`

## Local preview (optional)

If you have Ruby installed:

- `bundle install`
- `bundle exec jekyll s`
