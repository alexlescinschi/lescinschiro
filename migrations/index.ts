import * as migration_20260711_152803 from './20260711_152803';
import * as migration_20260711_170329 from './20260711_170329';
import * as migration_20260719_154500 from './20260719_154500';
import * as migration_20260801_120000 from './20260801_120000';
import * as migration_20260802_210000 from './20260802_210000';
import * as migration_20260802_220000 from './20260802_220000';
import * as migration_20260802_223000 from './20260802_223000';

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
  {
    up: migration_20260719_154500.up,
    down: migration_20260719_154500.down,
    name: '20260719_154500'
  },
  {
    up: migration_20260801_120000.up,
    down: migration_20260801_120000.down,
    name: '20260801_120000'
  },
  {
    up: migration_20260802_210000.up,
    down: migration_20260802_210000.down,
    name: '20260802_210000'
  },
  {
    up: migration_20260802_220000.up,
    down: migration_20260802_220000.down,
    name: '20260802_220000'
  },
  {
    up: migration_20260802_223000.up,
    down: migration_20260802_223000.down,
    name: '20260802_223000'
  },
];
