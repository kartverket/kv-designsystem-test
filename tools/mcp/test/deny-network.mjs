// Generated from TypeScript by scripts/build.mjs. Do not edit. See THIRD_PARTY_NOTICES.txt.
import { createRequire as __createRequire } from "node:module";
const require = __createRequire(import.meta.url);
const __filename = require("node:url").fileURLToPath(import.meta.url);
const __dirname = require("node:path").dirname(__filename);

// test/deny-network.ts
import { createRequire, syncBuiltinESMExports } from "node:module";
import net from "node:net";
var require2 = createRequire(import.meta.url);
var denied = () => {
  throw new Error("Network access is forbidden in the offline MCP test");
};
globalThis.fetch = denied;
Object.defineProperty(globalThis, "WebSocket", { value: denied, configurable: true });
for (const [module, names] of Object.entries({
  http: ["request", "get"],
  https: ["request", "get"],
  net: ["connect", "createConnection", "createServer"],
  tls: ["connect", "createServer"],
  dgram: ["createSocket"],
  dns: ["lookup", "resolve", "resolve4", "resolve6"],
  "dns/promises": ["lookup", "resolve", "resolve4", "resolve6"],
  child_process: ["exec", "execSync", "execFile", "execFileSync", "spawn", "spawnSync", "fork"]
})) {
  const builtin = require2(`node:${module}`);
  for (const name of names) builtin[name] = denied;
}
net.Socket.prototype.connect = denied;
syncBuiltinESMExports();
