import { counted, of, receipts } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { matches } from '@lapxo/topos/wire';
import { members } from '../helpers/code.ts';
import { declared, runtime } from '../helpers/lock.ts';

const kept = ['TARGET.bound', 'receipts.bound', 'tsconfig.json', 'dist/**', 'src/helpers/**'];

/**
 * A world's files are its anatomy and nothing else: its lock, entry, manifest and build, its helpers, one file and one vector
 * for each region its own lock declares, a licence and a readme, its one example, every shape a view of the place writes, a
 * figure's image among them, and every file a standing line needs. Any other file is stray, and so is every example past its
 * one; an owed file not there, or an entry or readme no view writes, is missing. Handed no files, it reads nothing.
 */
export const receipt = (asked: Asked) => {
  const held = receipts(asked, 'state').filter((line) => of(line, 'scope').startsWith('coordinate/'));
  const files = held.filter((line) => !members(of(line, 'value')).includes('needed')).map((line) => of(line, 'scope').slice('coordinate/'.length));
  const shapes = asked.lines.filter((line) => of(line, 'scope').startsWith('view/')).map((line) => of(line, 'shape')).filter(Boolean);
  const [entry, manifest, dir] = [runtime(asked, 'entry'), runtime(asked, 'manifest'), runtime(asked, 'regions')];
  const owed = ['capsule.bound', 'LICENSE', 'README.md', ...declared(asked).flatMap((name) => [`${dir ?? ''}${name}.ts`, `vectors/${name}.json`])];
  const anatomy = [...kept, ...owed, ...shapes, ...[entry, manifest].flatMap((one) => (one === undefined ? [] : [one]))];
  const rendered = [entry, 'README.md'].filter((one) => one === undefined || !shapes.includes(one)).length;
  const examples = files.filter((file) => matches('examples/release/*.ts', file)).length;
  return held.length ? counted(asked, 'files', files.filter((file) => !matches('examples/release/*.ts', file) && !anatomy.some((glob) => matches(glob, file))).length
    + (examples > 1 ? examples - 1 : 0) + owed.filter((file) => !held.some((line) => of(line, 'scope') === `coordinate/${file}`)).length + rendered, 'count') : [];
};
