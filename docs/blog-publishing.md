# Bilingual essays and image storage

## First collection

The author selected **Stones into Stories** as the English counterpart to **拾古与故事**, echoing the sound and shape of “stones / stories” and the Chinese reversal “拾古 / 故事.” The first essay is the prologue.

- Chinese default: `/blog/stones-into-stories-prologue/`.
- English: `/blog/stones-into-stories-prologue-en/`.
- Both pages have visible 中文 / English links at the top, language-specific HTML and metadata, canonical URLs, reciprocal `hreflang`, and a Chinese `x-default`. No JavaScript or browser-language guess is needed to switch.
- Blog, About's latest posts, and RSS count the pair as one essay and link to Chinese by default. Blog also offers a direct English reading link.
- `translation_key` joins the versions; `translation_of` identifies the English variant. `series_id`, `series`, `series_en`, and `series_order` group the collection.
- The displayed date preserves the author's “2026年国庆.” October 1 is the internal ordering/RSS date, not a claim that the author supplied an exact day.

The Chinese prose is retained, with quotations and the stone sequence typeset separately. The sign-off precedes the photographic appendix. The English is an editorial literary translation that retains the progression of thread → cloth, floating → suspension, and stone → time, rather than rewriting the essay as an explanation.

## Image inventory and loading

The author-supplied `拼图.zip` contains 43 JPEG collages, approximately 161.78 MiB unpacked. These collages are the photographic appendix; the author's reference to 600 markers is retained as their description, not a machine-verified count of panels.

Originals remain in the author's original archive and the ignored local preparation directory, `tools/ui-preview/blog-shigu/originals/`. They are not copied into `public/` or committed. Published derivatives contain no source EXIF/GPS metadata.

`tools/prepare-blog-gallery.mjs` creates:

| Version | Format / size | Loading |
| --- | --- | --- |
| Small thumbnail | WebP, up to 360 px | Lazy, as the gallery approaches the viewport |
| Retina thumbnail | WebP, up to 720 px | Selected through `srcset`, not downloaded in addition to the small version |
| Reading image | AVIF, 2560 px; 3600 px for the 7998 px collage | Only when a reader opens the image or follows its link |

The complete derivative set is approximately **38.96 MiB**, including **1.14 MiB** for all 43 small thumbnails. The largest individual reading image is approximately **1.38 MiB**. The complete current built site is approximately **60.85 MiB**. Only 12 thumbnails are initially displayed; a native disclosure reveals the remaining 31. No full-resolution image is requested just by opening or scrolling through the essay. The viewer supports previous/next, arrow keys, zoom/scroll, Escape, and focus return. Without JavaScript, image links and the disclosure still work.

Regenerate after installing dependencies:

```powershell
node tools/prepare-blog-gallery.mjs tools/ui-preview/blog-shigu/originals stones-into-stories/prologue src/data/galleries/shigu-prologue.json
```

The committed manifest records source filenames, derivative paths, dimensions, and byte sizes. Do not modify originals to regenerate the website.

## Where to store future images

For this first essay, the optimized files can accompany the static site in GitHub. Keep the ZIP and camera originals outside Git. GitHub [blocks individual files over 100 MiB and recommends small repositories](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github); Git history also retains old versions of changed binaries. GitHub Pages [limits the published site to 1 GB and has a soft bandwidth limit](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). Repeated 40 MiB galleries will eventually make repository hosting inconvenient.

For sustained photo essays, use object storage plus a stable image domain. [Cloudflare R2](https://developers.cloudflare.com/r2/pricing/) is one option: storage and request operations are metered, while direct egress is not charged. Its [public-bucket documentation](https://developers.cloudflare.com/r2/buckets/public-buckets/) recommends a custom domain for production; `r2.dev` is a development endpoint. No bucket, account, paid service, or public upload has been created by this task.

Migration is prepared through `src/lib/media.ts`:

1. Upload the contents under `public/media/` to the image host, preserving the `/media/…` path prefix.
2. Verify a representative thumbnail and reading image on HTTPS.
3. Set the repository Actions variable `PUBLIC_MEDIA_BASE_URL` to the image-host origin, without a trailing slash. The deployment workflow passes this value to Astro.
4. Build and verify the external URLs before removing the local derivative files from future commits. Retain a separate original-image backup.

Leaving the variable empty serves local `/media/` files. Both language versions, thumbnails, viewer links, and social-preview images use the same resolver; article prose does not need to change.

## Translation references and editorial choices

- [Joan Didion excerpt, Silver Birch Press](https://silverbirchpress.wordpress.com/2012/10/12/the-white-album-by-joan-didion/): the English uses two short original fragments rather than back-translating the Chinese quotes or reproducing the whole paragraph.
- [Commentary on Paz's “Between Going and Staying,” Oxford Academic](https://academic.oup.com/academicmedicine/article/97/6/849/8345520): consulted for the brief quoted line. No unverified translator attribution is added.
- [Zhuangzi, “Gengsang Chu,” Chinese Text Project](https://ctext.org/text.pl?if=gb&node=2896&show=parallel): classical-text context; the English rendering here is newly prepared from the supplied Chinese wording.
- [Academy of American Poets: Translation](https://poets.org/glossary/translation) and [Poetry Foundation: Poets on Translation](https://www.poetryfoundation.org/articles/1747506/poets-on-translation): consulted on voice, rhythm, and the relation between imagery and literal wording. The latter was available as a search excerpt; direct access returned 403.

The dated stone sequence and artifact descriptions are the author's literary text. They have not been silently revised into a factual chronology: references to the Niuheliang figure and oracle bone, for example, remain within the recurring “stone” image. Further substantive edits should be made with the author, rather than introduced as translation corrections.

UI verification artifacts are under the ignored `tools/ui-preview/blog-shigu/` directory. No Git commit, push, deployment, or third-party manuscript upload is performed by this workflow.
