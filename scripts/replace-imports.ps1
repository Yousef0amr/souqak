$files = Get-ChildItem -Path "src\app" -Recurse -Include "*.ts","*.tsx"
foreach ($file in $files) {
    try {
        $lines = Get-Content $file.FullName
        $updated = $lines | ForEach-Object { $_ -replace '@/features/', '@/modules/' }
        Set-Content -Path $file.FullName -Value $updated
    } catch {}
}
Write-Host "Done!"
