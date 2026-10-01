import { counted, of, receipts } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { number } from '../helpers/code.ts';
import { lock } from '../helpers/lock.ts';

/**
 * Every region a world renders is asked by a view of some place: how many of its render regions the host says no view
 * asks. A receipt region is a law and read by the fold; a world the host hands no such fact is read by no one here.
 */
export const receipt = (asked: Asked) => {
  const said = receipts(asked, 'state').filter((line) => of(line, 'scope').startsWith('asked/'));
  const renders = lock(asked).filter((line) => of(line, 'scope').startsWith('region/') && of(line, 'role') === 'render').map((line) => of(line, 'scope').slice('region/'.length));
  return said.length ? counted(asked, 'regions', [...new Set(renders)].filter((name) => number(said, `asked/${name}`) < 1).length, 'count') : [];
};
