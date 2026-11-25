import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { parse } from 'yaml';

const port = Number(process.env.PAPER_NOTES_PORT || 4181);
const host = '127.0.0.1';
const origin = `http://${host}:${port}`;
const source = new URL('../../src/data/publications.yml', import.meta.url);
const drafts = new URL('../../.local/paper-notes/', import.meta.url);
const papers = parse(await readFile(source, 'utf8'));
const fields = ['origin', 'period', 'contribution'];
const index = await readFile(new URL('index.html', import.meta.url));

function draftFile(id) {
  return new URL(`${id}.json`, drafts);
}

async function readNotes(paper) {
  try {
    return JSON.parse(await readFile(draftFile(paper.id), 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return { period: paper.work_period ?? '' };
  }
}

async function saveNotes(id, notes) {
  await mkdir(drafts, { recursive: true });
  const temporary = new URL(`${id}-${randomUUID()}.tmp`, drafts);
  try {
    await writeFile(temporary, JSON.stringify(notes, null, 2) + '\n', 'utf8');
    await rename(temporary, draftFile(id));
  } finally {
    await rm(temporary, { force: true });
  }
}

const server = http.createServer(async (request, response) => {
  const send = (status, payload) => {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(payload));
  };
  response.setHeader('Cache-Control', 'no-store');
  try {
    if (request.headers.host !== `${host}:${port}`) return send(403, '请通过本机链接访问。');
    if (request.method === 'GET' && request.url === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return response.end(index);
    }
    if (request.method === 'GET' && request.url === '/papers') {
      const entries = await Promise.all(papers.map(async paper => ({
        id: paper.id, title: paper.title, venue: paper.venue, year: paper.year, notes: await readNotes(paper),
      })));
      return send(200, entries);
    }
    const id = /^\/draft\/([a-z0-9-]+)$/.exec(request.url)?.[1];
    if (request.method !== 'PUT' || !papers.some(paper => paper.id === id)) return send(404, '未找到这篇论文。');
    if (request.headers.origin !== origin) return send(403, '请在本机填写页保存。');
    if (request.headers['content-type']?.split(';')[0] !== 'application/json') return send(415, '需要 JSON 格式。');
    const chunks = [];
    let bytes = 0;
    for await (const chunk of request) {
      bytes += chunk.length;
      if (bytes > 65536) return send(413, '草稿太长，请把每项精简为一句话。');
      chunks.push(chunk);
    }
    let input;
    try {
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      return send(400, '无法读取草稿。');
    }
    if (!fields.every(key => typeof input?.[key] === 'string')) return send(400, '草稿必须包含三个文本字段。');
    const notes = Object.fromEntries(fields.map(key => [key, input[key].trim()]));
    await saveNotes(id, notes);
    send(200, notes);
  } catch (error) {
    console.error(error.message);
    send(500, '草稿读写失败，请稍后重试。');
  }
});
server.listen(port, host, () => console.log(`Paper notes: ${origin}/`));
