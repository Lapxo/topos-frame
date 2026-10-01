import { counted } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { everywhere } from '../helpers/code.ts';

/** A name the capsule brings in from the shared helpers and declares again is a helper written twice. */
export const receipt = (asked: Asked) => ((shared) => counted(asked, 'names', everywhere(asked, 'source/declares').filter((name) => shared.has(name)).length, 'count'))(new Set(everywhere(asked, 'source/imports/@lapxo/topos/capsule')));
