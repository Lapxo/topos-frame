import { counted, of } from '@lapxo/topos/capsule';
import { matches } from '@lapxo/topos/wire';
import { code, members } from '../helpers/code.ts';
import { beside, runtime } from '../helpers/lock.ts';
import type { Asked } from '@lapxo/topos/capsule';

/**
 * What a capsule runs is a line: the files its runtime's entry reaches by import all lie in what that runtime's line says
 * it runs. A capsule that names no runtime runs every file of it outside one.
 */
export const receipt = (asked: Asked) => {
  const [rows, entry, runs] = [code(asked), runtime(asked, 'entry'), runtime(asked, 'source')];
  const reached = new Set<string>(entry === undefined ? [...rows.keys()] : [entry]);
  for (const file of reached) for (const row of rows.get(file) ?? []) {
    const spec = of(row, 'scope').startsWith('source/imports/') ? of(row, 'scope').slice('source/imports/'.length) : '';
    if (spec.startsWith('.')) reached.add(beside(file, spec));
  }
  return counted(asked, 'files', [...reached].filter((file) => runs === undefined || !members(runs).some((glob) => matches(glob, file))).length, 'count');
};
