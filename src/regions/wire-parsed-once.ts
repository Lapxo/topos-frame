import { counted } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { matches } from '@lapxo/topos/wire';
import { code, number, read } from '../helpers/code.ts';

/** A world reads a line's value through the wire and never by hand: how many sites of its code parse one, outside the wire's own files; handed code the language counted no parse in, it reads nothing. */
export const receipt = (asked: Asked) => !read(asked, 'source/parsed') ? [] : counted(asked, 'sites', [...code(asked)].filter(([file]) => !matches('src/wire/**', file))
  .reduce((n, [, rows]) => n + number(rows, 'source/parsed'), 0), 'count');
