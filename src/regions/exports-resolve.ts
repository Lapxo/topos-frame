import { counted, of, receipts } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { declared } from '../helpers/lock.ts';

/** How many regions the capsule's lock declares whose export its host did not resolve from the blob it pins; handed no resolution, it reads nothing. */
export const receipt = (asked: Asked) => ((rows) => (!rows.length ? [] : counted(asked, 'refused', declared(asked)
  .filter((name) => !rows.some((row) => of(row, 'scope') === `exports/${name}` && of(row, 'value') === 'held')).length, 'count')))(receipts(asked, 'vectors').filter((row) => of(row, 'measure') === 'resolves'));
