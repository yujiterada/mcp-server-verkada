# MCP Server for Verkada API

A Model Context Protocol (MCP) server that provides AI agents with access to the Verkada API. Built for code execution compatibility, allowing agents to discover and use tools progressively.

## Features

- 120+ tools covering Verkada's API endpoints
- Code execution compatible design (tools discovered on-demand)
- TypeScript with full type safety
- Zod validation for all inputs
- Organized by product categories (Access, Camera, Guest, Sensor, etc.)

## Prerequisites

- Node.js >= 18.0.0
- Verkada API Key

## Installation

```bash
npm install
```

## Configuration

Copy the example environment file and configure your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Verkada credentials:

```env
# Use API Token (recommended) or API Key
VERKADA_API_TOKEN=your_api_token_here

# API Region: api (US), api.eu (Europe), api.au (Australia)
VERKADA_REGION=api
```

## Usage

### Build

```bash
# Build the server
npm run build
```

### Claude Desktop

To use this MCP server with Claude Desktop, add the following to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "verkada": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server-verkada/dist/server/index.js"],
      "env": {
        "VERKADA_API_TOKEN": "your_api_token_here",
        "VERKADA_REGION": "api"
      }
    }
  }
}
```

Replace `/absolute/path/to/mcp-server-verkada` with the actual path to this project.

After updating the configuration, restart Claude Desktop to load the server.

## Project Structure

```
mcp-server-verkada/
├── server/                 # MCP server implementation
│   ├── index.ts           # Server entry point
│   ├── client.ts          # HTTP client for Verkada API
│   ├── config.ts          # Runtime configuration
│   ├── tool-registry.ts   # Tool registration system
│   └── tools/             # Tool implementations by category
│       ├── command/       # Command tools (alerts, audit, auth, etc.)
│       └── product/       # Product tools (access, camera, guest, sensor)
├── dist/                  # Compiled output
└── package.json
```

## Tool Categories

| Category | Description |
|----------|-------------|
| `command/alert` | Notifications and event management |
| `command/audit-log` | Audit log retrieval |
| `command/authentication` | API token management |
| `command/device` | Device information |
| `command/site` | Site management |
| `command/user` | User CRUD operations |
| `product/access` | Access control (groups, users, doors, schedules) |
| `product/camera` | Camera features (thumbnails, footage, analytics) |
| `product/guest` | Guest management |
| `product/sensor` | Sensor data |

## License

MIT
