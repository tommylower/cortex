# Rams setup

Read this file only when the user asks to install or configure Rams. Do not
install a surface they did not request.

## Local skill

The local Rams skill is a static checklist that runs inside the coding agent:

```bash
curl -fsSL https://rams.ai/install | bash
```

Restart the agent if it loads skills or commands only at session start.

## Hosted MCP

Create a workspace-scoped API key in Rams settings, then add the Streamable
HTTP endpoint to the chosen MCP client:

```text
https://worker.rams.ai/mcp
```

Authenticate with:

```text
Authorization: Bearer rams_YOUR_KEY
```

Never commit the real key. Use the client's secret or environment support when
available. If the client requires a literal header in a user-level config,
confirm that the file is outside the repository and has private permissions.

Rams publishes these client examples:

### Claude Code

```bash
claude mcp add --transport http rams https://worker.rams.ai/mcp \
  --header "Authorization: Bearer rams_YOUR_KEY"
```

### Cursor

```json
{
  "mcpServers": {
    "rams": {
      "url": "https://worker.rams.ai/mcp",
      "headers": {
        "Authorization": "Bearer rams_YOUR_KEY"
      }
    }
  }
}
```

### Codex

```toml
[mcp_servers.rams]
url = "https://worker.rams.ai/mcp"
http_headers = { "Authorization" = "Bearer rams_YOUR_KEY" }
```

Configuration is complete when the client exposes Rams `review_files` and a
small approved test review returns successfully. Do not test with proprietary
or secret-bearing files.

## GitHub App

Install the GitHub App only when the user wants automatic pull-request review.
Confirm the GitHub account, organization, repositories, permissions, and plan
before authorizing it.

## Data boundary

- The local skill does not send files to Rams.
- MCP reviews send only files passed to `review_files` over TLS.
- GitHub App reviews access changed files in explicitly enabled repositories.
- Rams says reviewed source is analyzed in memory and discarded after the
  review; review metadata is retained.
- Rams says hosted analysis uses Anthropic Claude and source is not used for
  model training.
- MCP and pull-request reviews share a workspace quota.

## Official references

- [Rams MCP](https://www.rams.ai/mcp)
- [Rams local skill](https://www.rams.ai/skill)
- [Rams security](https://www.rams.ai/security)
- [Rams GitHub App](https://www.rams.ai/github)
- [Rams public rules](https://www.rams.ai/rules)
