import { counted } from '@lapxo/topos/capsule';
import type { Asked } from '@lapxo/topos/capsule';
import { code, number } from '../helpers/code.ts';

/** What a place customises is a line: how many customisations the capsule's code spells. */
export const receipt = (asked: Asked) => counted(asked, 'literals', [...code(asked).values()].reduce((n, rows) => n + number(rows, 'source/customised'), 0), 'count');
