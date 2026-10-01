import { counted, of } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { everywhere, members } from '../helpers/code.ts';
import { valuesOf } from '../helpers/lock.ts';

/** A capsule knows one world, the one it serves: how many words its code spells that the lock gives to another world. */
export const receipt = (asked: Asked) => ((served, spelled) => counted(asked, 'words', asked.lines.filter((line) => of(line, 'scope').startsWith('audit/wire/worlds/') && !served.has(of(line, 'scope').slice('audit/wire/worlds/'.length)))
  .flatMap((line) => members(of(line, 'value'))).filter((word) => spelled.has(word)).length, 'count'))(new Set(valuesOf(asked, 'capsule/domain')), new Set([...everywhere(asked, 'source/words'), ...everywhere(asked, 'source/heads')]));
