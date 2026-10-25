# Chinese name and writing styles

The user confirmed the Chinese name **蒋卓洋** and requested small seal, large seal, clerical, regular, running, and cursive forms. The user subsequently chose to omit unverified ancient forms. Five attributed styles are therefore available; large seal is intentionally not shown.

About displays the English name and a smaller Chinese specimen. Clicking the Chinese name opens a writing-style chooser. The default is clerical script, as subsequently requested by the user, with the visitor's explicit choice saved locally. The English name, body typography, navigation, and metadata are unaffected. Without JavaScript, the Chinese name remains readable in the system font.

## Sources

| Style | Displayed name | Typeface / source | License |
| --- | --- | --- | --- |
| 小篆 · Small seal | 蔣卓洋 | 數位發展部，CNS11643 中文標準交換碼全字庫網站，[說文解字 True Type](https://www.cns11643.gov.tw/downloadList.jsp?ID=2&ID2=20) | [Government Data Open License v1](https://www.cns11643.gov.tw/pageView.jsp?ID=59&SN=&lang=en) |
| 隶书 · Clerical | 蔣卓洋 | 中華民國教育部，[教育部隸書 3.0](https://language.moe.gov.tw/material/info?m=9fe3fb11-c3d5-41f2-b029-6d18a2c2fd0d) | CC BY-ND 3.0 TW |
| 楷书 · Regular | 蒋卓洋 | [Ma Shan Zheng](https://github.com/googlefonts/mashanzheng) | SIL OFL 1.1 |
| 行书 · Running | 蒋卓洋 | [Zhi Mang Xing](https://github.com/googlefonts/zhimangxing) | SIL OFL 1.1 |
| 草书 · Cursive | 蒋卓洋 | [Liu Jian Mao Cao](https://github.com/googlefonts/liujianmaocao) | SIL OFL 1.1 |

These are attributed digital typeface specimens, not a claim to reconstruct the same person's name from an ancient inscription. Seal and clerical sources use the traditional surname 蔣; the underlying accessible name stays 蒋卓洋. At the user's request, the source list is hidden in the chooser; attribution remains in the page markup and project documentation.

The two government download servers failed locally (TLS/DNS). Original font binaries were obtained from redistribution mirrors: [typst-doc-cn/moe-tw-fonts](https://github.com/typst-doc-cn/moe-tw-fonts) for `eduLi-v3.0-2019-06.ttf`, and [UnicodingUnicorn/seal-generator](https://github.com/UnicodingUnicorn/seal-generator) for `ebas927.ttf`. Attribution and permitted use were checked against the government publishers, not inferred from a mirror. The font names and all three mapped glyphs were inspected. Google font binaries and OFL texts came directly from `google/fonts`.

## Implementation

`tools/build-name-scripts.py` uses fontTools to typeset the three glyphs from each source into SVG path data. It checks that every requested character exists, preserves glyph contours and aspect ratios, and records the source binary SHA-256. The generated data is in `src/data/name-scripts.json`; original binaries remain in the ignored `tools/ui-preview/name-scripts/` study directory. No complete font binary is distributed with the website, and no remote font service is requested at runtime.

The three OFL notices are retained in `licenses/name-scripts/`. The Chinese-name dialog uses native buttons and a native modal dialog, supports Escape and focus return, and gracefully handles unavailable local storage. On 26 October 2026, the user requested removing the visible traditional/simplified-surname explanation. That paragraph and its dialog `aria-describedby` reference were removed; the source attribution and the glyphs remain unchanged.
