// Preserve paths when moving /media to an object-storage CDN later.
const base = (import.meta.env.PUBLIC_MEDIA_BASE_URL || '').replace(/\/$/, '');
export function mediaUrl(path: string) {
  return path.startsWith('/media/') && base ? `${base}${path}` : path;
}
