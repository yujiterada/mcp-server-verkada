# Verkada MCP Server

The Verkada [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) connects AI tools to Command platform. This enables AI agents, assistants, and chatbots to interact with Command using the [Verkada APIs](https://apidocs.verkada.com/reference/introduction).

Currently, there isn't a remote Verkada MCP server.

## Local Verkada MCP Server

### Prerequisites

- [Node.js](https://nodejs.org/en/download) >= 18.0.0
- [Verkada API Key](https://apidocs.verkada.com/reference/quick-start-guide)

### Installation

Below is an example of installing Verkada MCP Server to Claude Desktop.

1. Install dependencies

   ```bash
   npm install
   ```

2. Build the project

   ```bash
   # Build the server
   npm run build
   ```

3. Configure Claude Desktop

    To use this MCP server with Claude Desktop, add the following to your Claude Desktop configuration file:

     **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
     
     ```json
     {
       "mcpServers": {
         "verkada": {
           "command": "node",
           "args": ["/absolute/path/to/mcp-server-verkada/dist/src/index.js"],
           "env": {
             "VERKADA_API_KEY": "your_api_key_here",
             "VERKADA_REGION": "your_region_here"
           }
         }
       }
     }
   ```

     **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

     ```json
    "mcpServers": {
        "verkada": {
            "command": "node",
            "args": ["drive:\\absolute\\path\\to\\mcp-server-verkada\\dist\\src\\index.js"],
            "env": {
                "VERKADA_API_KEY": "your_api_key_here",
                "VERKADA_REGION": "your_region_here"
            }
        }
    }
     ```

   Replace `/absolute/path/to/mcp-server-verkada` with the actual path to this project, `your_api_key_here` with your Verkada API key, and `your_region_here` with your Verkada Command region.

   After updating the configuration, restart Claude Desktop to load the server.

## Project Structure

```
mcp-server-verkada/
├── src/                   # MCP server implementation
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
