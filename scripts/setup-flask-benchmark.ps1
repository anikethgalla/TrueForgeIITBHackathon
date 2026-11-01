# Clones the pinned Round 1 benchmark repository: pallets/flask at tag 3.1.3 (commit 22d92470)
param(
    [string]$TargetDir = "$PSScriptRoot\..\benchmark-repos\flask"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $TargetDir)) {
    Write-Host "Cloning pallets/flask into $TargetDir..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Force -Path (Split-Path $TargetDir) | Out-Null
    git clone https://github.com/pallets/flask.git $TargetDir
}

Push-Location $TargetDir
try {
    Write-Host "Checking out release tag 3.1.3 (commit 22d92470)..." -ForegroundColor Cyan
    git fetch --tags
    git checkout -f 3.1.3
    $commit = (git rev-parse --short HEAD).Trim()
    Write-Host "Verified pallets/flask checked out at tag 3.1.3 (commit $commit)" -ForegroundColor Green
} finally {
    Pop-Location
}

