import { counted, of } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { matches } from '@lapxo/topos/wire';
import { code, everywhere, members, number, read } from '../helpers/code.ts';

/** A world's look is lines: how many numbers, colours and phrases its code spells, and words a style or page line holds; handed code the language counted no number in, it reads nothing. */
export const receipt = (asked: Asked) => ((look) => !read(asked, 'source/numbers') ? [] : counted(asked, 'literals', [...code(asked).values()].reduce((n, rows) => n + number(rows, 'source/numbers') + number(rows, 'source/customised'), 0)
  + everywhere(asked, 'source/words').filter((word) => look.has(word)).length, 'count'))(
  new Set(asked.lines.filter((line) => matches('form/style/**', of(line, 'scope')) || matches('form/page/**', of(line, 'scope'))).flatMap((line) => members(of(line, 'value')))));
