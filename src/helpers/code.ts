import { of, placeOf, receipts } from '@lapxo/topos/capsule';
import type { Asked, Handed } from '@lapxo/topos/capsule';
import { alphabet, canonical, fromLine } from '@lapxo/topos/wire';

/** What the language said of the place's code, file by file: every receipt of the source region, grouped by where it is. */
export const code = (asked: Asked): ReadonlyMap<string, readonly Handed[]> => {
  const out = new Map<string, Handed[]>();
  for (const line of receipts(asked, 'source')) out.set(placeOf(line), [...(out.get(placeOf(line)) ?? []), line]);
  return out;
};
/** A value read through its form by the wire: the members of an alphabet, and a count's lower end, read as the interval it is. */
export const members = (text: string): readonly string[] => alphabet(text).members;
const low = (row: Handed): number => ((got) => (got.kind === 'fact' && got.value.bound.kind === 'interval' ? got.value.bound.lo ?? 0 : 0))(fromLine(canonical({ ...row, form: 'interval' }), null));
export const words = (rows: readonly Handed[], scope: string): readonly string[] => rows.filter((row) => of(row, 'scope') === scope).flatMap((row) => members(of(row, 'value')));
export const number = (rows: readonly Handed[], scope: string): number => rows.filter((row) => of(row, 'scope') === scope).reduce((n, row) => n + low(row), 0);
export const everywhere = (asked: Asked, scope: string): readonly string[] => [...code(asked).values()].flatMap((rows) => words(rows, scope));
export const read = (asked: Asked, scope: string): boolean => [...code(asked).values()].some((rows) => rows.some((row) => of(row, 'scope') === scope));
