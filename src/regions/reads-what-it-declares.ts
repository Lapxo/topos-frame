import { counted } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { declared, ran } from '../helpers/lock.ts';

/** A region handed less than it declares is refused: how many regions let a short hand through. */
export const receipt = (asked: Asked) => counted(asked, 'regions', declared(asked).filter((name) => ran(asked, name, 'refused') < ran(asked, name, 'shorts')).length, 'count');
