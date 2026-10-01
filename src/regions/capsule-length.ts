import { counted } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { code, number } from '../helpers/code.ts';

/** How long the capsule's code is, in the lines the language counts. */
export const receipt = (asked: Asked) => counted(asked, 'src', [...code(asked).values()].reduce((n, rows) => n + number(rows, 'source/lines'), 0), 'source-lines');
