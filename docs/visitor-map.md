# Visitor map

The user first requested a visual preview, then supplied a MapMyVisitors script on 25 October 2026 and authorized its integration. The site-specific public widget ID is `JdvgHXF28-3FI6HCbNgEF0WOXWb2swP5oR0u1MMBtkk`.

`src/components/VisitorMap.astro` keeps the map near the About footer. `src/scripts/visitor-map.js` loads the supplied provider script only on the canonical HTTPS hostname from `astro.config.mjs` (`jonarck.github.io`). It is included on About only, so it measures visits to that page, not every route. Deploying this version enables the integration; saving the source locally does not deploy it.

Localhost, 127.0.0.1, and IPv6 loopback show the static map with a local-preview label and make no provider requests. Other preview hosts keep the section hidden. No visitor dots or counts are fabricated. If the provider is blocked or fails, the static map remains with an unavailable status. A late successful response can replace the fallback. The section is hidden when JavaScript is disabled.

The provider's live map replaces the placeholder; its geography and projection come from MapMyVisitors. Confirmed options in the official script are `co` (ocean), `cl` (land), `ct` (text), and `w=a` (container width). The light palette is `eef2f4 / c1cfd6 / 607281`; dark is `182127 / 42545e / a4b3bd`. Theme changes update the background artwork and CSS without reloading the tracker. The script ID and account ID are retained. Provider attribution and its privacy-policy link are visible beside the live map.

`Outside work` now uses “music history,” as confirmed by the user.

## Static fallback source

- Geography: [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/), public domain.
- Distribution: [world-atlas 2.0.2](https://github.com/topojson/world-atlas), land at 1:110m; its license is preserved in `licenses/world-atlas.txt`.
- Build-time projection: d3-geo 3.1.1 and topojson-client 3.1.0. These tools are installed only in the ignored local study directory; they add no browser runtime dependencies.
- Generated paths: `src/data/visitor-world.json`. Only coastlines are drawn; there are no political borders or visitor geolocations.

To regenerate the paths, install the pinned packages with `npm install --prefix tools/ui-preview/visitor-map/vendor --no-save --package-lock=false --ignore-scripts d3-geo@3.1.1 topojson-client@3.1.0 world-atlas@2.0.2`, then run `node tools/build-visitor-map.mjs`.

## Provider and verification

The official [MapMyVisitors site](https://mapmyvisitors.com/) supports visitor maps and GitHub Pages. Its current setup flow takes the site URL and then requires account registration or sign-in before providing a widget. The homepage's generic marketing claims about signup were not treated as proof of a working integration; the setup flow was checked directly on 25 October 2026.

The supplied `https://mapmyvisitors.com/map.js` was inspected to confirm body insertion, supported parameters, generated background images, and loading markup. The provider additionally loads its own dependencies and records visits through `widget_call_home.js`; its current [privacy policy](https://mapmyvisitors.com/b/policy) describes IP-based approximate location processing. Runtime functionality depends on that service and the visitor's browser/network settings.

Local verification must intercept the provider's tracking endpoint when simulating the production hostname, so tests do not create false visits. A successful simulated render confirms integration behavior, not real production statistics. Verify actual counting after the user deploys the site.
