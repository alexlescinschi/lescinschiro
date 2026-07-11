import * as migration_20260711_152803 from './20260711_152803';
import * as migration_20260711_170329 from './20260711_170329';

export const migrations = [
  {
    up: migration_20260711_152803.up,
    down: migration_20260711_152803.down,
    name: '20260711_152803',
  },
  {
    up: migration_20260711_170329.up,
    down: migration_20260711_170329.down,
    name: '20260711_170329'
  },
];
