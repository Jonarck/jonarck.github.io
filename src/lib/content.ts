import { getCollection, type CollectionEntry } from 'astro:content';

// Every public listing, detail route, and feed uses this same publication rule.
export async function publishedEntries<T extends 'blog' | 'projects'>(collection: T) {
  const now = Date.now();
  return (await getCollection(collection))
    .filter(entry => !entry.data.draft && entry.data.date.valueOf() <= now)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export function entryUrl(entry: CollectionEntry<'blog' | 'projects'>) {
  return `/${entry.collection}/${entry.id.replace(/\/index$/, '')}/`;
}
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date);
}
// Translations have their own URLs, but are not second posts in lists or RSS.
export async function primaryPosts() {
  return (await publishedEntries('blog')).filter(entry => !entry.data.translation_of);
}
