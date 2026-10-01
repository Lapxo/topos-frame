import { counted, of } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { everywhere, members } from '../helpers/code.ts';
import { declared } from '../helpers/lock.ts';

/** The capsule compares a value against no word that neither the wire's alphabets, its own types nor its own lock's regions spell. */
export const receipt = (asked: Asked) => ((known) => counted(asked, 'comparisons', everywhere(asked, 'source/compared').filter((word) => !known.has(word)).length, 'count'))(
  new Set([...asked.lines.filter((line) => of(line, 'scope').startsWith('audit/wire/')).flatMap((line) => members(of(line, 'value'))), ...everywhere(asked, 'source/literal-types'), ...declared(asked)]));
