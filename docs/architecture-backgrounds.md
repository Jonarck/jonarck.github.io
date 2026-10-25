# Architectural backgrounds · 2026-10-25

Current direction: four pages share the same typography, navigation, translucent reading surfaces and spacing system. Each page draws its background geometry and small color accents from a different building. The selected version uses abstract transparent structural fragments, with no complete building facade or photographic texture. Projects uses **La Tourette only**.

## Preview and preserved versions

- Current: <http://127.0.0.1:4180/>
- Photo selections, generated art and full reference archive: <http://127.0.0.1:4184/>
- Immediately preceding architecture study: <http://127.0.0.1:4183/>
- Original approved glass design: <http://127.0.0.1:4181/>

The pre-change source and static preview are preserved in `tools/ui-preview/snapshots/architecture-v1-2026-10-25/` (62 source files, SHA-256 manifest and restore instructions). The earlier glass snapshot remains in `tools/ui-preview/snapshots/glass-2026-10-25/`. These snapshots preserve the uncommitted Astro migration as well as the design; restoring only the Git commit would not preserve that work. Restore into a new directory as described in each `RESTORE.txt`.

## Selection and translation

| Page | Main references | Geometry used | Palette |
| --- | --- | --- | --- |
| About | Kyoto Station: grand-stair atrium overview + deep atrium perspective | Broad stair terraces, tilted red square, overhead bridge, sparse receding lattice | Pearl, ice blue, silver |
| Research | Philips Pavilion: main historical silhouette + reverse view | Two tensioned translucent surfaces, asymmetric peaks, a few rulings | Near white, pale lavender, slate violet |
| Projects | La Tourette: colored light cannons + courtyard window rhythm | Unequal mullion spacing, rectangular planes, round/rectangular apertures, small color filters | Chalk, muted red, slate blue, ochre |
| Blog | Hangzhou National Archives: waterside celadon screens + courtyard | Offset screen planes, long thin horizontal plane, faint reflected lines | Rice-paper white, celadon, sage, pale ink gray |

The Kyoto Station operator describes the grid-based design, the central concourse as a valley and the surrounding terraces and glass/metal atrium. These relationships inform the abstract lattice and directional depth. [Kyoto Station Building](https://www.kyoto-station-building.co.jp/about/history/)

The Xenakis archive explains his role in the Philips Pavilion's shell geometry, including hyperbolic paraboloids and conoids. The page artwork takes its tensioned surfaces and a few geometric rulings from that structure; it is not an accurate architectural reconstruction. [Philips Pavilion](https://www.iannis-xenakis.org/en/pavillon-philips-bruxelles/), [Ruled surfaces](https://www.iannis-xenakis.org/en/ruled-surfaces/)

The La Tourette references come from the Fondation Le Corbusier's building record and photographic gallery. Its color and window spacing are interpreted as an interface palette and planar rhythm. Ronchamp is excluded from the current artwork and page styling. [Fondation Le Corbusier](https://www.fondationlecorbusier.fr/oeuvre-architecture/realisations-couvent-sainte-marie-de-la-tourette-eveux-sur-larbresle-france-1953-1960/)

Wang Shu's discussion of Hangzhou's National Archives connects its screens with Song-era painted screens and contemporary celadon panels. The adaptation uses those screen-like planes, long horizontals and framed empty space. It does not add generic temple, calligraphy or landscape motifs. [Architect interview](https://z.hangzhou.com.cn/2022/gjbbg/content/content_8318417.htm)

All palette values are design interpretations, not measured paint or material specifications.

## Reference archive

`tools/ui-preview/architecture-backgrounds/` contains 56 unique source files with actual dimensions, SHA-256 hashes, source pages, download URLs, photographer attribution and license information. There are 44 references for the four currently used buildings, of which 41 have a downloaded long edge of at least 1920 pixels. Another 12 Ronchamp images are retained as excluded research. Across the entire archive, 49 files meet that size threshold. One Philips item is a reproduction of a drawing, not a photograph of the completed building.

Views include exteriors, interiors, structural details, lighting and spatial sequences where reliable material was available. Philips Pavilion has historical exterior, construction and drawing references; no reliable high-resolution interior was collected. Some Commons downloads are official 1920-pixel derivatives rather than the full-size original. No reference was enlarged to meet the HD count.

The sources are kept in the ignored local research directory, not published as site assets. The tracked [reference manifest](design-studies/background-references.json) records provenance and the eight selected reference files. The local board links every saved image to its source and records the selection rationale.

## Generated assets

The selected assets were generated with the **built-in imagegen tool**, using the local reference photographs. The first, more literal attempt is retained locally under `architecture-backgrounds/generated/`; it is not included in the public site. The four assets use real alpha transparency. Kyoto was subsequently revised using a broad stair-side atrium view: its grand stairs, tilted square, and skybridge preserve recognition without a complete photographic rendering. The earlier lattice, detailed atrium, and generic corridor attempts remain local. The approved composition is retained; its colored artwork is composited at 28% opacity in the light desktop theme (about 17% on mobile), making the colored structure itself faint. Research uses 48% opacity to protect readability in its open publication rows. Other page assets remain unchanged.

- Current Kyoto prompt: [kyoto-stair-atrium-prompt.json](design-studies/kyoto-stair-atrium-prompt.json)
- Other three current prompts and earlier Kyoto study: [abstract-background-prompts.json](design-studies/abstract-background-prompts.json)
- First iteration prompts: [background-prompts.json](design-studies/background-prompts.json)
- Asset sizes, original generation paths and hashes: [background-assets.json](design-studies/background-assets.json)
- Originals: `tools/ui-preview/architecture-backgrounds/generated/*-abstract-original.png`
- Website assets: `public/assets/img/architecture/*-abstract-{960,1672}.webp`

The generated originals are 1672 × 941 pixels (La Tourette is 1672 × 940); they are not described as 4K. WebP conversion preserves alpha and does not upscale. Each page loads only its own background, using responsive image selection. Desktop assets are approximately 188–266 KiB each; 960-pixel variants are approximately 75–113 KiB.

## Interface implementation

`PageLayout.astro` chooses the architectural theme from the route. Project and blog articles inherit their section's palette, with quieter artwork and a more opaque reading surface. CV and error pages retain a neutral background. The former foreground architectural SVG is no longer displayed on About; its component remains in source history.

`architecture-backgrounds.css` provides a shared material system and four palettes. The image is decorative (`aria-hidden`, empty alt text), occupies the upper and right side of the page, gradually fades downwards, and never handles pointer events. It does not animate or follow the pointer. Glass reading surfaces protect text contrast; dark mode, mobile layouts, reduced-transparency preference, increased-contrast preference and print have dedicated treatments.

On screens up to 640 pixels wide, each building has its own subject framing rather than a fixed 760-pixel image offset beyond the right edge. Philips retains both peaks; La Tourette retains the circular aperture and colored planes; Hangzhou retains the celadon screens. Their image widths scale with the viewport and stop at 720 pixels, with a later bottom fade to preserve the identifying geometry. The existing mobile opacity remains unchanged.

Kyoto's mobile artwork is scaled and positioned within the existing About introduction. Its skybridge, tilted square, and stairs fit inside the viewport without adding a separate visual band or extra space below the contact links. `ArchitectureArt.astro` keeps responsive image selection aligned with each building's mobile width. Desktop composition and the About introduction's height are unchanged. Decorative art remains hidden for increased contrast, reduced transparency, and print.

The subsequent publication redesign and research-content changes are documented in [research-organization.md](research-organization.md). Bilingual blog and gallery details are in [blog-publishing.md](blog-publishing.md).

## Local verification

Build and static checks: `npm run build`, `npm run verify`.

Current browser check: `node tools/ui-preview/verify-research-redesign.mjs`. It checks the updated publication organization and responsive views of all four themed sections. Screenshots are stored in `tools/ui-preview/research-reframe/qa/`. Earlier architecture checks and screenshots remain in `tools/ui-preview/architecture-backgrounds/qa/`; their publication selectors predate the redesign.

The approved site has been deployed to GitHub Pages. The local snapshots retain earlier design studies; they are not public site assets.
