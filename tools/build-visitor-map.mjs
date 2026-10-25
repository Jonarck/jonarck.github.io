import fs from 'node:fs/promises';
import { geoEqualEarth, geoGraticule, geoPath } from './ui-preview/visitor-map/vendor/node_modules/d3-geo/src/index.js';
import { feature } from './ui-preview/visitor-map/vendor/node_modules/topojson-client/src/index.js';

const vendor = new URL('./ui-preview/visitor-map/vendor/node_modules/world-atlas/', import.meta.url);
const topology = JSON.parse(await fs.readFile(new URL('land-110m.json', vendor), 'utf8'));
const sphere = { type: 'Sphere' };
const projection = geoEqualEarth().fitExtent([[14, 10], [886, 430]], sphere);
const path = geoPath(projection).digits(2);
const geometry = {
  outline: path(sphere),
  graticule: path(geoGraticule().step([30, 30])()),
  land: path(feature(topology, topology.objects.land)),
};
await fs.writeFile(new URL('../src/data/visitor-world.json', import.meta.url), JSON.stringify(geometry) + '\n');
await fs.copyFile(new URL('LICENSE', vendor), new URL('../licenses/world-atlas.txt', import.meta.url));
console.log('Generated Equal Earth coastlines and graticules; no visitor data included.');
