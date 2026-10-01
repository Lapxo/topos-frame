import { counted, of } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { lock } from '../helpers/lock.ts';

/** A capsule's own lock declares regions and never a place's views: how many view lines it carries, as the host hands it. */
export const receipt = (asked: Asked) => counted(asked, 'views', lock(asked).filter((line) => of(line, 'scope').startsWith('view/')).length, 'count');
