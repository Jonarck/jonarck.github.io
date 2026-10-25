# Chinese name: seven historical writing styles

The name remains **蒋卓洋** in accessible labels and metadata. On 26 October 2026 the owner supplied `ygsf(1).zip`, with seven PNG sheets and a per-character source list. These replace the previous five digital-font specimens. Each sheet contains three glyphs vertically in surname/given-name order; filenames are not in the requested display order.

## Display and interaction

The header cycles every two seconds in this order: 小篆 → 汉隶 → 汉印 → 魏碑 → 楷书 → 行书 → 草书. It starts with 小篆. There is no saved visitor-selected typeface, and an old `name-script` local-storage preference is ignored. A small pause/resume control is available. Rotation pauses during pointer hover, keyboard focus, modal reading, and while the document is hidden. Reduced-motion preferences disable automatic cycling initially. The Chinese name remains readable without JavaScript.

Clicking the name opens the **current style's sources**: each glyph is paired with its work and attribution. A single view control opens an overview containing only the seven specimens and their style names. Clicking an overview specimen opens its sources without changing the name displayed in the header. Closing the dialog restores focus; moving focus away allows the rotation to continue. Native dialog behavior supports Escape and backdrop dismissal.

The previous generic traditional/simplified-name note stays removed. Source information is now visible because the owner explicitly requested a source-first interface. Every work title, attribution, and supplementary note also has an English rendering. Work-title translations are descriptive editorial translations rather than assertions of an official catalogue title. Most header specimens are drawn at 132 px wide on desktop and 120 px on mobile, approximately 25% larger than the first seven-script version. At the owner's subsequent request, the entire Han clerical specimen is a further 15% larger in the header and overview, while its 蔣 glyph receives an additional 12% enlargement in header, overview, and source views. The header reserves a fixed 151.8/138 px frame with a padded view box so cycling does not move the name or controls or clip the larger glyphs. Other scripts retain their previous drawn size.

## Source mapping

These are the owner's supplied attributions, with uncertain identifications explicitly qualified. The work titles are not presented as independently authenticated manuscript provenance.

| Style | PNG | 蔣 | 卓 | 洋 |
| --- | --- | --- | --- | --- |
| 小篆 | 1792946190844.png | 说文解字 | 说文解字 | 说文解字 |
| 汉隶 | 1792945650526.png | 礼器碑 | 石门颂 | 北大汉简 |
| 汉印 | 1792946386791.png | 汉印分韵 | 汉印分韵 | 金石索，按用户允许的补配方案 |
| 魏碑 | 1792946503407.png | 龙门十二品 | 爨龙颜碑 | 元桢墓志 |
| 楷书 | 1792946886710.png | 颜真卿，颜家庙碑 | 传欧阳询，李誉墓志 | 虞世南，孔子庙堂碑 |
| 行书 | 1792945945594.png | 黄庭坚，五言古诗卷 | 集王羲之字，普觉国师碑 | 赵孟頫，刘园集帖 |
| 草书 | 1792947211276.png | 陆游，奏记帖 | 徐渭，论书法卷 | 王铎，秋兴八首册 |

### Han-seal investigation

Web and image searches on 26 October 2026 located the following authoritative comparison material in CUHK's 漢語多功能字庫:

- [蔣](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=%E8%94%A3): an image titled `漢印文字徵．蔣延年印`, [direct image](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/archaic/8523-1607798341.jpg).
- [卓](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=%E5%8D%93): `漢印文字徵．卓安平印`, [direct image](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/archaic/5353-1386561955.jpg), with a textual reference to 《漢印文字徵》8.11.
- [洋](https://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=%E6%B4%8B): the additional historical example is attributed to 《汗簡》, not a Han seal.

Visual comparison did **not** establish that the supplied 蔣 and 卓 came from those two named seals. The owner subsequently identified their source as **《汉印分韵》**; both source cards now cite that collection. Individual seal names have not been established and are not invented. No securely identified Han-seal 洋 was found, so the supplied 金石索 form remains, explicitly identified in its source card. Search results for unrelated 延年 or 安平 seals are not evidence.

《普觉国师碑》 is described as a collection of Wang Xizhi characters rather than his autograph ([comparison article](https://www.sohu.com/a/594552434_121124386)). Attribution of 《李誉墓志》 to Ouyang Xun is disputed ([discussion](https://www.sohu.com/a/421467445_582661)); the interface uses “传欧阳询”. The supplied source “龙门十二品” does not identify an individual inscription; none is invented.

## Reproducible vector extraction

`tools/name-script-sources.json` records crops, thresholds, component limits, occasional boundary masks, and attributions. `tools/build-name-scripts.py` traces the supplied raster contours using OpenCV and writes `src/data/name-scripts.json`. Each sheet's SHA-256 is recorded. No full font is generated or downloaded.

Extraction removes the screenshot frame, ruling lines, background speckles, and small erosion holes; it preserves character aspect ratios and major counters. The white-on-black Wei surname is inverted within a constrained rubbing boundary. The particularly noisy 石门颂 glyph uses a manually delimited foreground region followed by noise removal. The owner's subsequent enhancement request adds signed-distance contour smoothing and within-style optical weight balancing. This strengthens faint strokes and reduces overly heavy ones while retaining brush contrast within a character; it does not force all seven scripts into one uniform weight. Wei and Han clerical specimens receive stronger local cleanup. Major missing historical strokes are not generatively reconstructed. These enhanced display specimens are not facsimiles or scholarly restorations.

Per-style target stroke widths and per-glyph smoothing/offset limits are recorded in the extraction recipe. Width is estimated robustly from a skeleton and distance transform, and the bounded adjustment is applied to the contour rather than as a CSS stroke. Subpixel contour extraction avoids the jagged pixel staircase of a direct threshold trace. Generated review metrics and an optional comparison with the previous JSON make the adjustment inspectable. The image stays a solid path with transparent counters and background.

All 21 glyphs are inline SVG paths with transparent backgrounds and `fill="currentColor"`. Each path is defined only once and reused in header, sources, and overview. They follow light/dark theme colors without raster filters or external font requests. Specimens use a stable 320×108 view box to avoid layout shifts during rotation.

Original sheets and side-by-side tracing QA stay in the ignored `tools/ui-preview/name-scripts-2026-10-26/` directory; enhancement comparisons are in `tools/ui-preview/name-scripts-enhanced/`. Rebuild with `python tools/build-name-scripts.py --sources PATH_TO_EXTRACTED_PNGS` (numpy, OpenCV, scipy, scikit-image required). Use `--baseline PATH_TO_PREVIOUS_JSON --preview PATH_TO_REVIEW_HTML` for a before/after review. Inspect the generated review before accepting new extraction parameters. The historical OFL notices in `licenses/name-scripts/` are retained for the superseded version's history; those font outlines are no longer used by the current UI.
