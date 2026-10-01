import { counted } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { valuesOf } from '../helpers/lock.ts';

/** A capsule's blob bundles the topos its own lock pins: one release, named by its digest; a lock naming none bundled a topos nobody released, and one naming two, a topos nobody can say. */
export const receipt = (asked: Asked) => ((pins) => counted(asked, 'pins', pins.length === 1 && /^sha256:[0-9a-f]{64}$/.test(pins[0] ?? '') ? 0 : 1, 'count'))(valuesOf(asked, 'capsule/topos'));
