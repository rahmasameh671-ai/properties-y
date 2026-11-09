# Simple local static HTTP server for Properties-y testing
param([int]$Port = 3000)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Properties-y server running at $prefix"
Write-Host "Press Ctrl+C to stop"

$rootPath = $PSScriptRoot

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawPath = $request.Url.LocalPath.Trim('/')
        if ([string]::IsNullOrEmpty($rawPath) -or $rawPath -eq "index.html") {
            $localFile = Join-Path $rootPath "index.html"
        } else {
            $candidate1 = Join-Path $rootPath $rawPath
            $candidate2 = Join-Path $rootPath "$rawPath.html"
            $candidate3 = Join-Path (Join-Path $rootPath $rawPath) "index.html"

            if (Test-Path $candidate1 -PathType Leaf) {
                $localFile = $candidate1
            } elseif (Test-Path $candidate3 -PathType Leaf) {
                $localFile = $candidate3
            } elseif (Test-Path $candidate2 -PathType Leaf) {
                $localFile = $candidate2
            } else {
                $localFile = Join-Path $rootPath "index.html"
            }
        }

        if (Test-Path $localFile) {
            $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".svg"  { "image/svg+xml" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".webp" { "image/webp" }
                ".avif" { "image/avif" }
                default { "application/octet-stream" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($localFile)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}

