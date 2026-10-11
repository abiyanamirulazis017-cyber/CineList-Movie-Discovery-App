$output = "code.txt"
Remove-Item $output -ErrorAction SilentlyContinue

"===== SNAPSHOT PROYEK MY-APP =====" | Set-Content -Encoding utf8 $output
"Tanggal: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" | Add-Content -Encoding utf8 $output
"" | Add-Content -Encoding utf8 $output

$rootFiles = @("package.json", "vite.config.js", "index.html", "eslint.config.js")
foreach ($file in $rootFiles) {
  if (Test-Path $file) {
    "`n===== FILE: $file =====" | Add-Content -Encoding utf8 $output
    Get-Content $file -Raw -Encoding utf8 | Add-Content -Encoding utf8 $output
  }
}

Get-ChildItem -Path src -Recurse -File | ForEach-Object {
  $relativePath = $_.FullName.Replace((Get-Location).Path + "\", "")
  "`n===== FILE: $relativePath =====" | Add-Content -Encoding utf8 $output
  Get-Content $_.FullName -Raw -Encoding utf8 | Add-Content -Encoding utf8 $output
}

"`n===== SELESAI =====" | Add-Content -Encoding utf8 $output
Write-Host "✅ code.txt berhasil dibuat: $(Get-Location)\code.txt" -ForegroundColor Green