# Steps 1–3 helper: create PDFs (Chrome print) + open PR compare page + show investor email
# Run from anywhere:  powershell -ExecutionPolicy Bypass -File submissions/venture-studmuffin01/scripts/steps-1-3.ps1

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$docs = Join-Path $root "docs"
$repo = Resolve-Path (Join-Path $root "..\..")

Write-Host "`n=== Step 3: Export PDFs ===" -ForegroundColor Cyan
$chromeCandidates = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LocalAppData\Google\Chrome\Application\chrome.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
)
$browser = $chromeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

function Export-HtmlToPdf($htmlName, $pdfName) {
  $html = Join-Path $docs $htmlName
  $pdf = Join-Path $docs $pdfName
  if (-not (Test-Path $html)) { throw "Missing $html" }
  if (-not $browser) {
    Write-Host "No Chrome/Edge found. Open $html in a browser → Print → Save as PDF → $pdfName" -ForegroundColor Yellow
    Start-Process $html
    return
  }
  $uri = ([Uri]$html).AbsoluteUri
  Write-Host "Printing $htmlName → $pdfName ..."
  & $browser --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$pdf" $uri
  if (Test-Path $pdf) { Write-Host "Wrote $pdf" -ForegroundColor Green }
  else { Write-Host "Print failed; open $html and Save as PDF manually." -ForegroundColor Yellow }
}

Export-HtmlToPdf "one-pager.html" "one-pager.pdf"
Export-HtmlToPdf "pitch-deck.html" "pitch-deck.pdf"

Write-Host "`n=== Step 1: Open / create PR ===" -ForegroundColor Cyan
Set-Location $repo
$compare = "https://github.com/rogerSuperBuilderAlpha/hult-cohort-program/compare/projects/summer26/phase-2-venture...Studmuffin01:participants/summer26/phase-2-venture/studmuffin01?expand=1"
$existing = gh pr list --repo rogerSuperBuilderAlpha/hult-cohort-program --head "Studmuffin01:participants/summer26/phase-2-venture/studmuffin01" --state open --json number,url 2>$null | ConvertFrom-Json
if ($existing -and $existing.Count -gt 0) {
  Write-Host "PR already open: $($existing[0].url)" -ForegroundColor Green
  Start-Process $existing[0].url
} else {
  # Push branch if needed, then create PR
  git push -u origin "participants/summer26/phase-2-venture/studmuffin01" 2>&1 | Out-Host
  $body = @"
## Summary
AI Prompting Academy — MVP workplace AI LMS for professional prompt craft (SCORE / Prompt Like a Pro), with individual + team pricing.

## Investor deck
``submissions/venture-studmuffin01/docs/pitch-deck.pdf``

## Business plan
``submissions/venture-studmuffin01/docs/business-plan.md``

## App URL + user metrics
- App: https://prompt-like-a-pro-red.vercel.app
- Metrics source: self-hosted Ludwitt reference API (venture app id: TBD)
- Snapshot (date): TBD — filling before merge (≥25 qualified external users)

## Investor touch log
``submissions/venture-studmuffin01/INVESTOR_LOG.md`` (PII redacted)

## Notes
Used reference API for venture metrics per staff guidance (Week 4 Ludwitt host/docs issues).
"@
  try {
    $url = gh pr create --repo rogerSuperBuilderAlpha/hult-cohort-program --base "projects/summer26/phase-2-venture" --head "Studmuffin01:participants/summer26/phase-2-venture/studmuffin01" --title "[P2-Venture] Submission — studmuffin01" --body $body
    Write-Host "Created: $url" -ForegroundColor Green
    Start-Process $url
  } catch {
    Write-Host "gh create failed — opening compare page in browser. Click Create pull request." -ForegroundColor Yellow
    Start-Process $compare
  }
}

Write-Host "`n=== Step 2: Investor email ===" -ForegroundColor Cyan
Write-Host "1. Pick a REAL angel/VC/corp-dev/family-office contact (not friends/cohort/staff)."
Write-Host "2. Send the email below; attach docs/one-pager.pdf and docs/pitch-deck.pdf."
Write-Host "3. Tell the agent the Name + Firm + date so INVESTOR_LOG.md can be filled."
Write-Host @"

----- COPY EMAIL -----
Subject: AI Prompting Academy — workplace prompt craft for Copilot

Hi {Name},

I'm building AI Prompting Academy, an MVP workplace AI LMS that helps professionals master prompt craft for Microsoft Copilot — starting with the SCORE method.

We're live at https://prompt-like-a-pro-red.vercel.app with individual and team access. I'm in a founder sprint this week and would value a sharp read on the deck and pricing.

Deck and one-pager are attached. Would you have 20 minutes for feedback this week or next?

Best,
Rawle Arneaud
@Studmuffin01 · Hult Cohort Program
----- END EMAIL -----
"@

Write-Host "`nDone with automated parts. Commit PDFs if new:" -ForegroundColor Cyan
Write-Host "  git add submissions/venture-studmuffin01/docs/*.pdf"
Write-Host "  git commit -m `"Add venture investor PDF exports`""
Write-Host "  git push"
