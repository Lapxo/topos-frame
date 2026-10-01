// A small capsule read by this world through the one contract: its own lock as it stands, what two of its laws say of a
// capsule whose regions are short and of the same capsule with one region grown long, then the line a place adopts it with.
import { readFileSync } from 'node:fs';
import { declarationOf, receiptShell } from '@lapxo/topos/capsule';
import { answer } from '@lapxo/topos/contract';
import { PROTOCOL, canonical } from '@lapxo/topos/wire';
import { receipt as capsuleLength } from '../../src/regions/capsule-length.ts';
import { receipt as regionLength } from '../../src/regions/region-length.ts';

const lock = readFileSync(new URL('../../capsule.bound', import.meta.url), 'utf8').split('\n').filter((line: string) => line.startsWith('bound-lock/1'));
const { regions } = declarationOf(lock);
const receipt = receiptShell({ 'capsule-length': { reads: regions['capsule-length'] ?? [], region: capsuleLength }, 'region-length': { reads: regions['region-length'] ?? [], region: regionLength } });
const at = 'policy:acme/capsule';
const runtime = [['entry', 'src/index.ts'], ['regions', 'src/regions/'], ['source', 'src/**'], ['effects', 'node:']]
  .map(([key, value]) => canonical({ at, by: 'target', form: 'alphabet', measure: 'id', role: 'writes', scope: `form/runtime/node/${key}`, value: value ?? '' }));
const capsule = [canonical({ at, by: 'target', form: 'alphabet', measure: 'id', role: 'writes', scope: 'capsule/runtime', value: 'node' }),
  ...['greeting', 'farewell'].map((name) => canonical({ at, by: 'target', form: 'alphabet', measure: 'reads', role: 'render', scope: `region/${name}`, value: 'lang' }))];
const files = (farewell: number): string[] => ([['src/index.ts', 2], ['src/regions/greeting.ts', 12], ['src/regions/farewell.ts', farewell]] as const)
  .map(([file, lines]) => canonical({ at: `place:${file}`, by: 'reader', form: 'alphabet', measure: 'count', role: 'reads', scope: 'source/lines', value: `${lines}..${lines}` }));
const law = (region: string, farewell: number): string => ((got) => (got.kind === 'fact' ? got.claims.map(({ scope, measure, bound }) => `${scope} ${bound.lo}..${bound.hi} ${measure}`).join(' ') : got.why))(
  answer({ receipt }, { protocol: PROTOCOL, verb: 'read', rootScope: '', files: [], region, at: 3, shape: '', name: 'acme', lines: runtime,
    reads: regions[region] ?? [], regions: { capsule: { lines: capsule, receipts: [] }, source: { lines: [], receipts: files(farewell) } } }, '') as unknown as { kind: string; claims: readonly { scope: string; measure: string; bound: { lo: number; hi: number } }[]; why: string });

for (const line of lock.filter((one) => / scope=(capsule|region)\//.test(one))) console.log(line);
for (const farewell of [14, 55]) for (const region of ['region-length', 'capsule-length']) console.log(`farewell ${farewell} lines · ${region.padEnd(14)}`, law(region, farewell));
console.log(canonical({ at: 'policy:acme/capsules', by: 'target', form: 'alphabet', measure: 'id', role: 'writes', scope: 'uses/topos-frame', value: 'sha256:DIGEST' }));
