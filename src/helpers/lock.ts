import { of, receipts, regionLines } from '@lapxo/topos/capsule';
import type { Asked, Handed } from '@lapxo/topos/capsule';
import { members, number } from './code.ts';

/** The lines of the capsule's own lock, as the host hands them: what it declares of itself, and nothing of the place. */
export const lock = (asked: Asked): readonly Handed[] => regionLines(asked, 'capsule');
export const valuesOf = (asked: Asked, scope: string): readonly string[] => lock(asked).filter((line) => of(line, 'scope') === scope).flatMap((line) => members(of(line, 'value')));
export const declared = (asked: Asked): readonly string[] => [...new Set(lock(asked).filter((line) => of(line, 'scope').startsWith('region/') && of(line, 'measure') === 'reads')
  .map((line) => of(line, 'scope').slice('region/'.length)))].sort();
/** What the runtime the capsule's lock names says of itself, by its own lines: its entry, its regions, what it runs, its effects. */
export const runtime = (asked: Asked, key: string): string | undefined => ((name) => asked.lines.find((line) => name !== undefined && of(line, 'scope') === `form/runtime/${name}/${key}`))(valuesOf(asked, 'capsule/runtime')[0])?.['value'];
export const regional = (asked: Asked, file: string): boolean => ((dir) => dir !== undefined && file.startsWith(dir))(runtime(asked, 'regions'));
export const beside = (from: string, spec: string): string => new URL(spec, `file:///${from}`).pathname.slice(1);
/** What the one harness said of each region of the place: its cases, the ones that held, their worlds and its refusals. */
export const ran = (asked: Asked, name: string, measure: string): number => number(receipts(asked, 'vectors').filter((row) => of(row, 'measure') === measure), `vector/${name}`);
