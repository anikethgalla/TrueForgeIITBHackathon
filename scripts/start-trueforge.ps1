# Starts TrueForge locally with OUTBOUND_URL_ALLOWED_HOSTS configured so TrueForge can call the VS Code Extension's local MCP Server (http://127.0.0.1:45821/mcp)
$env:OUTBOUND_URL_ALLOWED_HOSTS = '["127.0.0.1","localhost"]'
$env:NETWORK_POLICY_ENABLED = 'false'
Write-Host "Starting TrueForge with local VS Code MCP Server allowlisted (127.0.0.1:45821)..." -ForegroundColor Cyan
npx @truefoundry/trueforge@latest

