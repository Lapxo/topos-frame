import { counted, of } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { code, members, words } from '../helpers/code.ts';
import { beside, regional, runtime } from '../helpers/lock.ts';

/**
 * A helper lives where it is used: a name a shared file declares, uses nowhere in itself, and only one region imports
 * belongs in that region's file; and a name a region declares that another file imports, the entry aside, belongs outside the regions.
 */
export const receipt = (asked: Asked) => {
  const [rows, entry] = [code(asked), runtime(asked, 'entry')];
  const users = (file: string, name: string): readonly string[] => [...rows].filter(([other, own]) => own.some((row) => of(row, 'scope').startsWith('source/imports/.')
    && beside(other, of(row, 'scope').slice('source/imports/'.length)) === file && members(of(row, 'value')).includes(name))).map(([other]) => other);
  return counted(asked, 'names', [...rows].reduce((n, [file, own]) => n + words(own, 'source/declares').filter((name) => ((who) => (regional(asked, file)
    ? who.some((other) => other !== entry) : who.length === 1 && regional(asked, who[0] ?? '') && !words(own, 'source/calls').includes(name)))(users(file, name))).length, 0), 'count');
};
