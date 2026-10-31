import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await fs.readFile(path.join(root, 'release.json'), 'utf8'));
const base = path.join(root, 'docs');
const seen = [];
async function walk(dir, prefix = '') {
  for (const entry of await fs.readdir(dir, {withFileTypes: true})) {
    const name = prefix + entry.name;
    if (entry.isDirectory()) await walk(path.join(dir, entry.name), name + '/');
    else if (entry.isFile()) seen.push(name);
    else throw new Error('Unexpected special file: ' + name);
  }
}
await walk(base);
const expected = Object.keys(manifest.files).sort();
if (JSON.stringify(seen.sort()) !== JSON.stringify(expected)) throw new Error('Publish file list differs from the reviewed release');
for (const file of expected) {
  if (path.isAbsolute(file) || file.split('/').includes('..')) throw new Error('Unsafe path');
  const bytes = await fs.readFile(path.join(base, file));
  const recorded = manifest.files[file];
  if (bytes.length !== recorded.bytes || createHash('sha256').update(bytes).digest('hex') !== recorded.sha256) throw new Error('File integrity mismatch: ' + file);
}
const html = await fs.readFile(path.join(base, 'index.html'), 'utf8');
const assetMatch = html.match(/window\.GUICHAO_ASSETS=({[\s\S]*?});<\/script>/);
if (!assetMatch) throw new Error('Missing game asset manifest');
const assets = JSON.parse(assetMatch[1]);
const relative = [...Object.values(assets.portraits), assets.world.replace(/^url:/, ''), assets.characters.replace(/^url:/, '')];
for (const file of relative) {
  if (!file.startsWith('assets/') || !manifest.files[file]) throw new Error('Game asset is missing or is not relative: ' + file);
}
if (!html.includes('viewport-fit=cover') || !html.includes('joystick') || !html.includes('touch-action')) throw new Error('Missing existing touch-screen interface');
if (!manifest.files['.nojekyll']) throw new Error('Missing GitHub Pages static-file marker');
console.log(JSON.stringify({ok: true, files: expected.length, sourceCommit: manifest.sourceCommit, assetsRelative: true, existingTouchControls: true, totalBytes: Object.values(manifest.files).reduce((sum, file) => sum + file.bytes, 0)}));
