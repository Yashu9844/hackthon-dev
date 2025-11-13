# Test Upload API Script
# This script tests the /api/documents/upload endpoint

Write-Host "🧪 Testing Document Upload API" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Configuration
$API_URL = "http://localhost:3000/api/documents/upload"
$FILE_PATH = "C:\Users\mallik\Downloads\SAI.jpg"

# Check if file exists
if (-not (Test-Path $FILE_PATH)) {
    Write-Host "❌ Error: File not found at $FILE_PATH" -ForegroundColor Red
    exit 1
}

Write-Host "📁 File: $FILE_PATH" -ForegroundColor Green
$fileInfo = Get-Item $FILE_PATH
Write-Host "📊 Size: $($fileInfo.Length) bytes`n" -ForegroundColor Gray

# Get Privy token from user
Write-Host "🔑 You need a Privy auth token to test this." -ForegroundColor Yellow
Write-Host "To get your token:" -ForegroundColor Yellow
Write-Host "1. Open http://localhost:3000 in browser" -ForegroundColor White
Write-Host "2. Login with Privy" -ForegroundColor White
Write-Host "3. Open DevTools (F12) > Console" -ForegroundColor White
Write-Host "4. Run: localStorage.getItem('privy:token')" -ForegroundColor White
Write-Host "5. Copy the token value`n" -ForegroundColor White

$TOKEN = Read-Host "Enter your Privy token (or press Enter to skip auth test)"

if ([string]::IsNullOrWhiteSpace($TOKEN)) {
    Write-Host "`n⚠️ No token provided. Testing without authentication (will fail)...`n" -ForegroundColor Yellow
    $TOKEN = "test-token"
}

# Prepare multipart form data
Write-Host "📦 Preparing request..." -ForegroundColor Cyan

$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"

$bodyLines = (
    "--$boundary",
    "Content-Disposition: form-data; name=`"file`"; filename=`"SAI.jpg`"",
    "Content-Type: image/jpeg",
    "",
    [System.IO.File]::ReadAllBytes($FILE_PATH),
    "--$boundary",
    "Content-Disposition: form-data; name=`"documentName`"",
    "",
    "Test Document - SAI Image",
    "--$boundary",
    "Content-Disposition: form-data; name=`"documentType`"",
    "",
    "academic",
    "--$boundary",
    "Content-Disposition: form-data; name=`"issuerName`"",
    "",
    "Test University",
    "--$boundary",
    "Content-Disposition: form-data; name=`"issueDate`"",
    "",
    "2024-01-15",
    "--$boundary--"
)

# Actually, let's use a simpler approach with curl
Write-Host "🚀 Sending request to $API_URL...`n" -ForegroundColor Cyan

$curlCommand = @"
curl -X POST "$API_URL" \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@$FILE_PATH" \
  -F "documentName=Test Document - SAI Image" \
  -F "documentType=academic" \
  -F "issuerName=Test University" \
  -F "issueDate=2024-01-15"
"@

Write-Host "Command to run:" -ForegroundColor Gray
Write-Host $curlCommand -ForegroundColor DarkGray
Write-Host ""

# Execute with curl (if available)
try {
    $response = curl.exe -X POST $API_URL `
        -H "Authorization: Bearer $TOKEN" `
        -F "file=@$FILE_PATH" `
        -F "documentName=Test Document - SAI Image" `
        -F "documentType=academic" `
        -F "issuerName=Test University" `
        -F "issueDate=2024-01-15" `
        -w "`nHTTP_STATUS:%{http_code}" `
        -s
    
    # Parse response
    $responseText = $response -join "`n"
    
    if ($responseText -match "HTTP_STATUS:(\d+)") {
        $statusCode = $matches[1]
        $body = $responseText -replace "HTTP_STATUS:\d+", ""
        
        Write-Host "📬 Response (Status: $statusCode):" -ForegroundColor Cyan
        Write-Host $body -ForegroundColor White
        
        # Try to parse as JSON for pretty print
        try {
            $json = $body | ConvertFrom-Json
            Write-Host "`n✨ Parsed Response:" -ForegroundColor Green
            $json | ConvertTo-Json -Depth 10
            
            if ($json.success) {
                Write-Host "`n✅ SUCCESS! Document uploaded!" -ForegroundColor Green
                Write-Host "📄 Document ID: $($json.document.id)" -ForegroundColor White
                Write-Host "📦 File CID: $($json.details.fileCID)" -ForegroundColor White
                Write-Host "🔗 File URL: $($json.details.fileURL)" -ForegroundColor White
                Write-Host "📝 VC CID: $($json.details.vcCID)" -ForegroundColor White
                Write-Host "🔗 VC URL: $($json.details.vcURL)" -ForegroundColor White
                Write-Host "⛓️ Attestation UID: $($json.details.attestationUID)" -ForegroundColor White
                Write-Host "🆔 User DID: $($json.details.userDID)" -ForegroundColor White
            } else {
                Write-Host "`n❌ FAILED: $($json.error)" -ForegroundColor Red
            }
        } catch {
            # Not JSON or parse error
        }
    }
    
} catch {
    Write-Host "❌ Error executing request: $_" -ForegroundColor Red
    Write-Host "`n💡 Make sure:" -ForegroundColor Yellow
    Write-Host "  1. Next.js dev server is running (npm run dev in apps/web)" -ForegroundColor White
    Write-Host "  2. You're logged in and have a valid token" -ForegroundColor White
    Write-Host "  3. curl is available (try: curl --version)" -ForegroundColor White
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Test Complete" -ForegroundColor Cyan
