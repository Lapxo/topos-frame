import { counted, of } from '@lapxo/topos/capsule';
import { matches } from '@lapxo/topos/wire';
import type { Asked } from '@lapxo/topos/capsule';
import { everywhere, read } from '../helpers/code.ts';
import { runtime, valuesOf } from '../helpers/lock.ts';

/** The host a capsule's imports are read against: its runtime's, or every runtime's the lines name when it names none. */
const hosts = (asked: Asked): readonly string[] => (valuesOf(asked, 'capsule/runtime').length ? [runtime(asked, 'effects') ?? []].flat()
  : asked.lines.filter((line) => matches('form/runtime/*/effects', of(line, 'scope'))).map((line) => of(line, 'value')));

/**
 * Every host module the capsule imports — a specifier its runtime's effects line marks as the host's — is one of the
 * effects its own lock declares. A capsule that names no runtime is read against the host of every runtime the lines name;
 * handed no specifier its language read, or no runtime that names a host, it reads nothing.
 */
export const receipt = (asked: Asked) => ((effects, host) => (!read(asked, 'source/specifiers') || !host.length ? [] : counted(asked, 'imports', everywhere(asked, 'source/specifiers')
  .filter((one) => host.some((prefix) => one.startsWith(prefix) && !effects.has(one.slice(prefix.length)))).length, 'count')))(new Set(valuesOf(asked, 'capsule/effects')), hosts(asked));
