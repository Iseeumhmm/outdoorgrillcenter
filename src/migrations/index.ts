import * as migration_20251113_220540 from './20251113_220540';
import * as migration_20251114_014115_rename_w3ckey_to_resend_api_key from './20251114_014115_rename_w3ckey_to_resend_api_key';

export const migrations = [
  {
    up: migration_20251113_220540.up,
    down: migration_20251113_220540.down,
    name: '20251113_220540',
  },
  {
    up: migration_20251114_014115_rename_w3ckey_to_resend_api_key.up,
    down: migration_20251114_014115_rename_w3ckey_to_resend_api_key.down,
    name: '20251114_014115_rename_w3ckey_to_resend_api_key'
  },
];
