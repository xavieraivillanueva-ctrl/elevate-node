# ==============================================================
# deploy.ps1 - Script de despliegue Elevate Node
# Uso: .\deploy.ps1 "mensaje del commit"
# ==============================================================
param(
  [string]$mensaje = 'chore: actualizacion rapida'
)

Write-Host '======================================' -ForegroundColor Cyan
Write-Host '  ELEVATE NODE - DEPLOY AUTOMATICO   ' -ForegroundColor Cyan
Write-Host '======================================' -ForegroundColor Cyan

# 1. Compilar B2C
Write-Host ''
Write-Host '[1/4] Compilando elevate-b2c...' -ForegroundColor Yellow
Push-Location apps\elevate-b2c
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host 'ERROR en build b2c' -ForegroundColor Red; Pop-Location; exit 1 }
Pop-Location
Write-Host '  OK - b2c compilado' -ForegroundColor Green

# 2. Compilar B2B
Write-Host ''
Write-Host '[2/4] Compilando elevate-b2b...' -ForegroundColor Yellow
Push-Location apps\elevate-b2b
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host 'ERROR en build b2b' -ForegroundColor Red; Pop-Location; exit 1 }
Pop-Location
Write-Host '  OK - b2b compilado' -ForegroundColor Green

# 3. Git commit + push
Write-Host ''
Write-Host '[3/4] Subiendo cambios a GitHub...' -ForegroundColor Yellow
git add -A
git commit -m $mensaje
git push origin main
Write-Host '  OK - GitHub actualizado' -ForegroundColor Green

# 4. Preparar .vercel/output y desplegar B2C
Write-Host ''
Write-Host '[4/4] Desplegando elevate-b2c a Vercel...' -ForegroundColor Yellow

$outDir  = 'apps\elevate-b2c\.vercel\output'
$staticDir = "$outDir\static"
Remove-Item -Recurse -Force $outDir -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $staticDir | Out-Null

$config = '{"version":3,"routes":[{"src":"/(.*)","dest":"/index.html"}]}'
$config | Set-Content -Path "$outDir\config.json" -Encoding utf8

Copy-Item -Path 'apps\elevate-b2c\dist\*' -Destination $staticDir -Recurse -Force

Push-Location apps\elevate-b2c
vercel deploy --prebuilt --prod
Pop-Location

Write-Host ''
Write-Host '======================================' -ForegroundColor Green
Write-Host '  DEPLOY COMPLETADO!' -ForegroundColor Green
Write-Host '  https://elevate-b2c.vercel.app' -ForegroundColor Green
Write-Host '======================================' -ForegroundColor Green
