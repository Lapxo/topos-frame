import { counted } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { code, number } from '../helpers/code.ts';
import { regional } from '../helpers/lock.ts';

/** How long the longest region's file is, in the lines the language counts. */
export const receipt = (asked: Asked) => counted(asked, 'longest', [...code(asked)].filter(([file]) => regional(asked, file)).map(([, rows]) => number(rows, 'source/lines')).reduce((most, n) => (n > most ? n : most), 0), 'source-lines');
