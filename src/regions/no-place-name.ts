import { counted, of } from '@lapxo/topos/capsule';
import { matches, steps } from '@lapxo/topos/wire';
import type { Asked } from '@lapxo/topos/capsule';
import { everywhere } from '../helpers/code.ts';

/** The capsule spells no place of the root: the places are those the root says what they are, the lines this region reads. */
export const receipt = (asked: Asked) => ((places) => counted(asked, 'literals', everywhere(asked, 'source/heads').filter((head) => places.has(head)).length, 'count'))(
  new Set(asked.lines.filter((line) => matches('prose/*/*/what', of(line, 'scope'))).map((line) => (([, , place]) => place ?? '')(steps(of(line, 'scope'))))));
