import { createRequire, syncBuiltinESMExports } from 'node:module';
import net from 'node:net';

const require = createRequire(import.meta.url);
const denied = (): never => {
  throw new Error('Network access is forbidden in the offline MCP test');
};
globalThis.fetch = denied;
Object.defineProperty(globalThis, 'WebSocket', { value: denied, configurable: true });
for (const [module, names] of Object.entries({
  http: ['request', 'get'],
  https: ['request', 'get'],
  net: ['connect', 'createConnection', 'createServer'],
  tls: ['connect', 'createServer'],
  dgram: ['createSocket'],
  dns: ['lookup', 'resolve', 'resolve4', 'resolve6'],
  'dns/promises': ['lookup', 'resolve', 'resolve4', 'resolve6'],
  child_process: ['exec', 'execSync', 'execFile', 'execFileSync', 'spawn', 'spawnSync', 'fork'],
})) {
  const builtin = require(`node:${module}`) as Record<string, unknown>;
  for (const name of names) builtin[name] = denied;
}
net.Socket.prototype.connect = denied;
syncBuiltinESMExports();
