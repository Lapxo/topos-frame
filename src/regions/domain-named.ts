import { counted } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { valuesOf } from '../helpers/lock.ts';

/** A capsule names the domain it serves, once, in its own lock. */
export const receipt = (asked: Asked) => counted(asked, 'lines', valuesOf(asked, 'capsule/domain').length, 'count');
