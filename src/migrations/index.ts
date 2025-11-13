import * as migration_20251113_220540 from './20251113_220540';

export const migrations = [
  {
    up: migration_20251113_220540.up,
    down: migration_20251113_220540.down,
    name: '20251113_220540'
  },
];
