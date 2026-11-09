import { fileURLToPath } from 'node:url';
import { startServer } from './server.js';
import { message } from './types.js';

// Bundled into <repo>/tools/mcp/start.mjs. Independent of cwd and package managers.
const script = fileURLToPath(import.meta.url);

if (process.argv.includes('--print-config')) {
  // A ready-to-paste MCP client entry with absolute paths, for hosts without workspace
  // variables (for example GitHub Copilot in JetBrains IDEs). Nothing is written or started.
  process.stdout.write(
    JSON.stringify(
      {
        servers: {
          'kartverket-design': { type: 'stdio', command: process.execPath, args: [script] },
        },
      },
      null,
      2,
    ) + '\n',
  );
} else {
  try {
    await startServer(fileURLToPath(new URL('../../', import.meta.url)));
  } catch (error) {
    console.error(`Kartverket MCP failed: ${message(error)}`);
    process.exitCode = 1;
  }
}
