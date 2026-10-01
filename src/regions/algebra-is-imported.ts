import { counted, of } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { matches, steps } from '@lapxo/topos/wire';
import { code, everywhere, number, read } from '../helpers/code.ts';

/**
 * A world imports its algebra: how many times its code takes a least or greatest by hand, splits a form's value itself,
 * or spells one of the four states the lines name, where the object's own states are the only ones. Handed code the language
 * counted no least or greatest in, it reads nothing.
 */
export const receipt = (asked: Asked) => ((states) => !read(asked, 'source/spans') ? [] : counted(asked, 'sites', [...code(asked).values()].reduce((n, rows) => n + number(rows, 'source/spans') + number(rows, 'source/form-splits'), 0)
  + [...everywhere(asked, 'source/compared'), ...everywhere(asked, 'source/literal-types')].filter((word) => states.has(word)).length, 'count'))(
  new Set(asked.lines.filter((line) => matches('form/prose/*/state/*', of(line, 'scope'))).map((line) => steps(of(line, 'scope')).slice(-1)[0] ?? '')));
