// Entry point of runtime.mjs. The MCP client is exported for the offline tests only, so they reuse
// this bundle instead of carrying a second copy of the SDK and its schema validator.
export { startServer, loadCatalog } from './server.js';
export { Client } from '@modelcontextprotocol/sdk/client/index.js';
export { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
