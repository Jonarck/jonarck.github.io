import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

// Originals stay outside public/. Only metadata-free, web-sized derivatives ship.
const [input, slug, manifest] = process.argv.slice(2);
if (!input || !slug || !manifest || !/^[a-z0-9/-]+$/.test(slug) || slug.includes('..')) {
  throw new Error('Usage: node tools/prepare-blog-gallery.mjs INPUT_DIR SAFE_SLUG MANIFEST.json');
}
sharp.cache(false);
sharp.concurrency(2);
const relative = `/media/blog/${slug}`;
const output = path.resolve('public', `.${relative}`);
await fs.mkdir(output, { recursive: true });
const originals = (await fs.readdir(input)).filter(name => /\.(jpe?g|png)$/i.test(name)).sort();
const images = [];
let originalBytes = 0, outputBytes = 0;
for (let index = 0; index < originals.length; index++) {
  const filename = originals[index];
  const source = path.join(input, filename);
  const metadata = await sharp(source).metadata();
  originalBytes += (await fs.stat(source)).size;
  const id = String(index + 1).padStart(2, '0');
  const sizes = [{ key:'small', width:360, quality:70, format:'webp' }, { key:'medium', width:720, quality:75, format:'webp' }, { key:'large', width:Math.max(metadata.width,metadata.height)>5000?3600:2560, quality:50, format:'avif' }];
  const image = { id, original:filename, width:metadata.width, height:metadata.height };
  for (const size of sizes) {
    const name = `${id}-${size.key}.${size.format}`;
    const result = await sharp(source).rotate().resize(size.width,size.width,{fit:'inside',withoutEnlargement:true}).toFormat(size.format,{quality:size.quality,effort:4}).toFile(path.join(output,name));
    image[size.key] = `${relative}/${name}`;
    image[`${size.key}Width`] = result.width;
    image[`${size.key}Height`] = result.height;
    image[`${size.key}Bytes`] = result.size;
    outputBytes += result.size;
  }
  images.push(image);
}
await fs.mkdir(path.dirname(manifest),{recursive:true});
await fs.writeFile(manifest,JSON.stringify({images,originalBytes,outputBytes},null,2)+'\n');
console.log(JSON.stringify({images:images.length,originalMiB:(originalBytes/1048576).toFixed(2),webMiB:(outputBytes/1048576).toFixed(2)}));
