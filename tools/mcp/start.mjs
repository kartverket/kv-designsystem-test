// Generated from TypeScript by scripts/build.mjs. Do not edit. See THIRD_PARTY_NOTICES.txt.
import { createRequire as __createRequire } from "node:module";
const require = __createRequire(import.meta.url);
const __filename = require("node:url").fileURLToPath(import.meta.url);
const __dirname = require("node:path").dirname(__filename);

// src/start.ts
import { fileURLToPath } from "node:url";
import { startServer } from "./runtime.mjs";

// src/types.ts
function message(error) {
  return error instanceof Error ? error.message : String(error);
}

// src/start.ts
var script = fileURLToPath(import.meta.url);
if (process.argv.includes("--print-config")) {
  process.stdout.write(
    JSON.stringify(
      {
        servers: {
          "kartverket-design": { type: "stdio", command: process.execPath, args: [script] }
        }
      },
      null,
      2
    ) + "\n"
  );
} else {
  try {
    await startServer(fileURLToPath(new URL("../../", import.meta.url)));
  } catch (error) {
    console.error(`Kartverket MCP failed: ${message(error)}`);
    process.exitCode = 1;
  }
}
