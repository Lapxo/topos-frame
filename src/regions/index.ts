import { of, regionLines } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';

/**
 * A capsule's index: one line for each kind of region its own lock declares, the shell of that kind handed only where the
 * index lies, since the host reads the lock beside it and loads each region by name and role.
 */
export const render = (asked: Asked): readonly string[] => {
  const held = regionLines(asked, 'capsule').filter((line) => of(line, 'scope').startsWith('region/'));
  const writes = new Set(held.filter((line) => of(line, 'measure') === 'writes').map((line) => of(line, 'scope')));
  const kinds = new Set(held.filter((line) => of(line, 'measure') === 'reads').map((line) => (writes.has(of(line, 'scope')) ? 'reader' : of(line, 'role'))));
  const shells = [['render', 'shell', 'const render'], ['receipt', 'receiptShell', 'const receipt'], ['reader', 'readers', 'const { observe, run }']].filter(([kind]) => kinds.has(kind ?? ''));
  return [`import { ${shells.map(([, shell]) => shell).sort().join(', ')} } from '@lapxo/topos/capsule';`, ...shells.map(([, shell, exported]) => `export ${exported} = ${shell}(import.meta.url);`)];
};
