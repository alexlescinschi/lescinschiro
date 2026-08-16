import * as migration_20260711_152803 from './20260711_152803';
import * as migration_20260711_170329 from './20260711_170329';
import * as migration_20260719_154500 from './20260719_154500';
import * as migration_20260801_120000 from './20260801_120000';
import * as migration_20260802_210000 from './20260802_210000';
import * as migration_20260802_220000 from './20260802_220000';
import * as migration_20260802_223000 from './20260802_223000';
import * as migration_20260815_190443_schema_reconciliation from './20260815_190443_schema_reconciliation';
import * as migration_20260815_193732_integrari_schema from './20260815_193732_integrari_schema';
import * as migration_20260815_194000_integrari_data from './20260815_194000_integrari_data';
import * as migration_20260816_141249_integrari_logo_fundal from './20260816_141249_integrari_logo_fundal';

export const migrations = [
  {
    up: migration_20260711_152803.up,
    down: migration_20260711_152803.down,
    name: '20260711_152803',
  },
  {
    up: migration_20260711_170329.up,
    down: migration_20260711_170329.down,
    name: '20260711_170329',
  },
  {
    up: migration_20260719_154500.up,
    down: migration_20260719_154500.down,
    name: '20260719_154500',
  },
  {
    up: migration_20260801_120000.up,
    down: migration_20260801_120000.down,
    name: '20260801_120000',
  },
  {
    up: migration_20260802_210000.up,
    down: migration_20260802_210000.down,
    name: '20260802_210000',
  },
  {
    up: migration_20260802_220000.up,
    down: migration_20260802_220000.down,
    name: '20260802_220000',
  },
  {
    up: migration_20260802_223000.up,
    down: migration_20260802_223000.down,
    name: '20260802_223000',
  },
  {
    up: migration_20260815_190443_schema_reconciliation.up,
    down: migration_20260815_190443_schema_reconciliation.down,
    name: '20260815_190443_schema_reconciliation',
  },
  {
    up: migration_20260815_193732_integrari_schema.up,
    down: migration_20260815_193732_integrari_schema.down,
    name: '20260815_193732_integrari_schema',
  },
  {
    up: migration_20260815_194000_integrari_data.up,
    down: migration_20260815_194000_integrari_data.down,
    name: '20260815_194000_integrari_data',
  },
  {
    up: migration_20260816_141249_integrari_logo_fundal.up,
    down: migration_20260816_141249_integrari_logo_fundal.down,
    name: '20260816_141249_integrari_logo_fundal'
  },
];
