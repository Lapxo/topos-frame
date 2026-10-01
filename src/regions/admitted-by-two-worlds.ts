import { counted } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { declared, ran } from '../helpers/lock.ts';

/** How many regions hold in fewer than two worlds. */
export const receipt = (asked: Asked) => counted(asked, 'regions', declared(asked).filter((name) => ran(asked, name, 'worlds') <= 1).length, 'count');
