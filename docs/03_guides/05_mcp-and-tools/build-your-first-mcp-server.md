---
sidebar_position: 2
title: Build Your First MCP Server
description: "A 20-minute walkthrough: scaffold an MCP server, add a real tool, register it with Codebolt, and have an agent use it."
---

# Build Your First MCP Server

A 20-minute walkthrough: scaffold an MCP server, add a real tool, register it with Codebolt, and have an agent use it.

For the shortest-possible quickstart see [MCP Tools Quickstart](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/02_quickstart-local-mcp.md). This guide goes deeper — real tool, error handling, testing.

## What we're building

A `weather` MCP server with two tools:

- `weather.get_current(city)` — current conditions for a city
- `weather.get_forecast(city, days)` — N-day forecast

Uses a free weather API (Open-Meteo — no key needed).

## Step 1 — scaffold

```bash
cd /path/to/your/project
mkdir -p .codebolt/tools/weather
cd .codebolt/tools/weather

cat > package.json <<'EOF'
{
  "name": "weather-mcp",
  "version": "0.1.0",
  "type": "module",
  "main": "server.js",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  }
}
EOF

npm install
```

## Step 2 — write the server

`.codebolt/tools/weather/server.js`:

```js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "weather", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

// Declare the tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_current",
      description: "Get the current weather for a city. Returns temperature, conditions, wind, and humidity. Use when the user asks about weather right now.",
      inputSchema: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description: "City name, e.g. 'San Francisco' or 'Tokyo'",
          },
        },
        required: ["city"],
      },
    },
    {
      name: "get_forecast",
      description: "Get a N-day weather forecast for a city. Use when the user asks about weather over the next few days.",
      inputSchema: {
        type: "object",
        properties: {
          city: { type: "string", description: "City name" },
          days: {
            type: "integer",
            description: "Number of days to forecast (1-7)",
            minimum: 1,
            maximum: 7,
            default: 3,
          },
        },
        required: ["city"],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  try {
    if (req.params.name === "get_current") {
      return await handleGetCurrent(req.params.arguments);
    }
    if (req.params.name === "get_forecast") {
      return await handleGetForecast(req.params.arguments);
    }
    return structuredError("unknown_tool", `No such tool: ${req.params.name}`);
  } catch (err) {
    return structuredError("internal", String(err));
  }
});

async function geocode(city) {
  const resp = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  const data = await resp.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`City not found: ${city}`);
  }
  return { latitude: data.results[0].latitude, longitude: data.results[0].longitude };
}

async function handleGetCurrent({ city }) {
  let coords;
  try {
    coords = await geocode(city);
  } catch (err) {
    return structuredError("not_found", String(err), {
      hint: "Check the city spelling. Use English names.",
    });
  }

  const resp = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`
  );
  const data = await resp.json();

  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        ok: true,
        city,
        temperature_c: data.current.temperature_2m,
        wind_kph: data.current.wind_speed_10m,
        humidity_percent: data.current.relative_humidity_2m,
        weather_code: data.current.weather_code,
      }, null, 2),
    }],
  };
}

async function handleGetForecast({ city, days = 3 }) {
  let coords;
  try {
    coords = await geocode(city);
  } catch (err) {
    return structuredError("not_found", String(err));
  }

  const resp = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=${days}`
  );
  const data = await resp.json();

  const forecast = data.daily.time.map((date, i) => ({
    date,
    high_c: data.daily.temperature_2m_max[i],
    low_c: data.daily.temperature_2m_min[i],
    weather_code: data.daily.weather_code[i],
  }));

  return {
    content: [{
      type: "text",
      text: JSON.stringify({ ok: true, city, forecast }, null, 2),
    }],
  };
}

function structuredError(error, message, extras = {}) {
  return {
    content: [{
      type: "text",
      text: JSON.stringify({ ok: false, error, message, ...extras }),
    }],
    isError: true,
  };
}

// Connect
const transport = new StdioServerTransport();
await server.connect(transport);
```

What's real here compared to the quickstart:

- **Two tools** with distinct schemas.
- **Error handling** — city not found returns a structured error with a hint.
- **Graceful failure** — network errors become structured errors, not crashes.
- **Parameter defaults** — `days` defaults to 3.

## Step 3 — register

Register the MCP server via **Settings → Tools → Add MCP Server** with:

```yaml
servers:
  weather:
    command: node
    args: [".codebolt/tools/weather/server.js"]
```

After saving, check **Settings → Tools** — the weather server should appear and show both tools with their schemas.

## Step 4 — give an agent access

Edit the agent you want to use it from:

```yaml
# in an agent's codeboltagent.yaml
tools:
  allow:
    - codebolt_fs.*
    - weather.*
```

Reload the project for changes to take effect.

## Step 5 — test from chat

Open a chat with that agent:

```
What's the weather in Tokyo right now?
```

The agent should call `weather.get_current({ city: "Tokyo" })` and return a summary.

```
Give me a 5-day forecast for San Francisco.
```

Should call `weather.get_forecast({ city: "San Francisco", days: 5 })`.

## Step 6 — handle errors gracefully

Try a bad city:

```
What's the weather in Atlantis?
```

The agent should receive the structured error, explain to the user that Atlantis couldn't be found, and (depending on its prompt) suggest checking the spelling or asking a different city. It should *not* loop retrying.

## What you learned

- **Schema + description** is the contract with the LLM. Make descriptions specific.
- **Structured errors** let the agent recover. Exceptions don't.
- **Standard MCP SDK** handles the wire format; you write business logic.
- **Parameter defaults** save the LLM from having to guess.

## Next steps

- **Package it** — see [Packaging](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/07_packaging.md) to publish this to npm and the marketplace.
- **Add more tools** — alerts, historical data, etc.
- **Add caching** — weather doesn't change every second; cache results for a few minutes to avoid rate-limiting the API.
- **Add authentication** — if your real API needs a key, load it from env: `process.env.WEATHER_API_KEY`.

## See also

- [MCP Tools Overview](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/01_overview.md)
- [Tool schema](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/03_tool-schema.md)
- [Error handling](../../04_build-on-codebolt/03_agent-extensions/04_mcp-tools/06_error-handling.md)
- [Publishing](../../04_build-on-codebolt/02_creating-agents/10_publishing.md)
