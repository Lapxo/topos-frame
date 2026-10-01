import { counted, of } from '@lapxo/topos/capsule';
import { members } from '../helpers/code.ts';
import type { Asked } from '@lapxo/topos/capsule';
import { runtime } from '../helpers/lock.ts';

/** The manifest is written by a view that names the place's manifest, never by hand: the manifest the runtime names by its line. */
export const receipt = (asked: Asked) => ((manifest) => counted(asked, 'renders', manifest !== undefined && asked.lines.some((line) => of(line, 'scope').startsWith('view/')
  && of(line, 'shape') === manifest && members(of(line, 'needs')).some((need) => need === manifest || need === `${asked.name}/${manifest}`)) ? 0 : 1, 'count'))(runtime(asked, 'manifest'));
