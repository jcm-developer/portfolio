/**
 * Runs Vitest (`vitest run`) with a working directory whose Windows drive letter is uppercase.
 *
 * An editor on Windows can start Node with a lowercase drive (`c:\...`). Vitest 5 then loads its
 * runner under two URLs (`C:` and `c:`), the test file gets the copy that was never initialised,
 * and every `describe` throws "Cannot read properties of undefined (reading 'config')". Starting
 * Vitest from the uppercase path makes both URLs match. On Linux and macOS the path is unchanged.
 *
 * Extra arguments are passed through: `npm test -- src/lib/chat`.
 */
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const cwd = process.cwd().replace(/^[a-z]:/, (drive) => drive.toUpperCase());
const cli = join(cwd, 'node_modules', 'vitest', 'vitest.mjs');
const { status } = spawnSync(process.execPath, [cli, 'run', ...process.argv.slice(2)], {
  cwd,
  stdio: 'inherit',
});
process.exit(status ?? 1);
