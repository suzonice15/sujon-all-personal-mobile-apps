$ErrorActionPreference = 'Continue'
Add-Type -AssemblyName System.Drawing

$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$tmp = Join-Path $env:TEMP 'codenest-store'
New-Item -ItemType Directory -Force $tmp | Out-Null

function Device-Online {
  $out = adb devices 2>&1
  return [bool]($out -match 'device\s*$')
}

function Dump {
  $xml = Join-Path $tmp 'ui.xml'
  adb shell uiautomator dump /sdcard/ui_store.xml 2>&1 | Out-Null
  adb pull /sdcard/ui_store.xml $xml 2>&1 | Out-Null
  try { return [xml](Get-Content -Raw $xml) } catch { return $null }
}

function Find-Node([string]$text, [switch]$Exact) {
  $d = Dump
  if ($null -eq $d) { return $null }
  foreach ($n in $d.SelectNodes('//node')) {
    $t = [string]$n.text
    $c = [string]$n.'content-desc'
    if ($n.class -like '*EditText*') { continue }
    if ($Exact) { if ($t -eq $text -or $c -eq $text) { return $n } }
    else { if ($t -like "*$text*" -or $c -like "*$text*") { return $n } }
  }
  return $null
}

function Tap-Node($node) {
  if ($null -eq $node) { return $false }
  if ($node.bounds -match '\[(\d+),(\d+)\]\[(\d+),(\d+)\]') {
    adb shell input tap ([int](([int]$matches[1] + [int]$matches[3]) / 2)) ([int](([int]$matches[2] + [int]$matches[4]) / 2)) | Out-Null
    return $true
  }
  return $false
}

function Tap-Text([string]$text) { return (Tap-Node (Find-Node $text)) }
function Has-Text([string]$text) { return [bool](Find-Node $text) }

function Back { adb shell input keyevent KEYCODE_BACK 2>&1 | Out-Null; Start-Sleep -Milliseconds 700 }

function Save-Cropped([string]$name) {
  $raw = Join-Path $tmp 'raw.png'
  adb shell screencap -p /sdcard/store_raw.png 2>&1 | Out-Null
  adb pull /sdcard/store_raw.png $raw 2>&1 | Out-Null
  if (-not (Test-Path $raw)) { return $false }

  $img = [System.Drawing.Image]::FromFile($raw)
  $top = [int]($img.Height * 0.05)
  $bottom = [int]($img.Height * 0.05)
  $w = $img.Width
  $h = $img.Height - $top - $bottom
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), (New-Object System.Drawing.Rectangle(0, $top, $w, $h)), [System.Drawing.GraphicsUnit]::Pixel)
  $out = Join-Path $dir $name
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  return $true
}

function Ensure-Home {
  for ($i = 0; $i -lt 4; $i++) {
    if (Has-Text 'What will you learn today') { return $true }
    Back
  }
  adb shell am start -n com.codenest.app/com.w3school.MainActivity 2>&1 | Out-Null
  Start-Sleep -Seconds 4
  return (Has-Text 'What will you learn today')
}

if (-not (Device-Online)) {
  Write-Output 'NO DEVICE: connect the phone with USB debugging and run again.'
  exit 1
}

adb shell am force-stop com.codenest.app 2>&1 | Out-Null
adb shell input keyevent KEYCODE_WAKEUP 2>&1 | Out-Null
adb shell wm dismiss-keyguard 2>&1 | Out-Null
adb shell am start -n com.codenest.app/com.w3school.MainActivity 2>&1 | Out-Null
Start-Sleep -Seconds 8

$results = New-Object System.Collections.Generic.List[string]

# 1. Home
if (Ensure-Home) {
  $ok = Save-Cropped 'phone-01-home.png'
  $results.Add("$(if ($ok) { 'PASS' } else { 'FAIL' }) phone-01-home.png")
} else {
  $results.Add('FAIL home screen')
}

# 2. Course detail
if (Tap-Text 'HTML') {
  Start-Sleep -Seconds 2
  $ok = Save-Cropped 'phone-02-course.png'
  $results.Add("$(if ($ok -and (Has-Text 'Chapters')) { 'PASS' } else { 'FAIL' }) phone-02-course.png")
} else {
  $results.Add('FAIL course screen (HTML card not found)')
}

# 3. Lesson
if (Tap-Text 'Getting Started') {
  Start-Sleep -Seconds 2
  # first lesson row sits under the "Lessons" header
  adb shell input tap 540 1000 | Out-Null
  Start-Sleep -Seconds 2
  if (-not (Has-Text 'NEXT LESSON')) {
    Back
    Start-Sleep -Milliseconds 600
    adb shell input tap 540 1150 | Out-Null
    Start-Sleep -Seconds 2
  }
  $ok = Save-Cropped 'phone-03-lesson.png'
  $results.Add("$(if ($ok -and (Has-Text 'NEXT LESSON')) { 'PASS' } else { 'FAIL' }) phone-03-lesson.png")
} else {
  $results.Add('FAIL lesson screen (chapter not found)')
}

# 4. Quiz
Ensure-Home | Out-Null
adb shell input tap 322 2224 | Out-Null
Start-Sleep -Seconds 1
if (Tap-Text 'HTML') {
  Start-Sleep -Seconds 2
  if (Tap-Text 'Getting Started') {
    Start-Sleep -Seconds 2
    $ok = Save-Cropped 'phone-04-quiz.png'
    $results.Add("$(if ($ok -and (Has-Text 'Question 1')) { 'PASS' } else { 'FAIL' }) phone-04-quiz.png")
    Back
  } else {
    $results.Add('FAIL quiz chapter')
  }
  Back
} else {
  $results.Add('FAIL quiz course')
}

# 5. Interview answer
adb shell input tap 450 2224 | Out-Null
Start-Sleep -Seconds 1
if (Tap-Text 'HTML') {
  Start-Sleep -Seconds 2
  if (Tap-Text 'Practice all questions') {
    Start-Sleep -Seconds 1
    Tap-Text 'Show all answers' | Out-Null
    Start-Sleep -Seconds 1
    $ok = Save-Cropped 'phone-05-interview.png'
    $results.Add("$(if ($ok -and (Has-Text 'ANSWER')) { 'PASS' } else { 'FAIL' }) phone-05-interview.png")
    Back
  } else {
    $results.Add('FAIL interview practice button')
  }
  Back
} else {
  $results.Add('FAIL interview course')
}

# 6. Dark mode + home
Ensure-Home | Out-Null
adb shell input tap 86 178 | Out-Null
Start-Sleep -Milliseconds 900
if (Tap-Text 'Settings') {
  Start-Sleep -Seconds 1
  $d = Dump
  $label = $null
  $switches = @()
  foreach ($n in $d.SelectNodes('//node')) {
    if ($n.text -eq 'Dark mode') { $label = $n }
    if ($n.class -like '*Switch*') { $switches += $n }
  }
  if ($label -and $switches.Count -gt 0) {
    if ($label.bounds -match '\[(\d+),(\d+)\]\[(\d+),(\d+)\]') {
      $labelY = [int](([int]$matches[2] + [int]$matches[4]) / 2)
    }
    $best = $null
    $bestDist = 99999
    foreach ($sw in $switches) {
      if ($sw.bounds -match '\[(\d+),(\d+)\]\[(\d+),(\d+)\]') {
        $x = [int](([int]$matches[1] + [int]$matches[3]) / 2)
        $y = [int](([int]$matches[2] + [int]$matches[4]) / 2)
        $dist = [math]::Abs($y - $labelY)
        if ($dist -lt $bestDist) { $bestDist = $dist; $best = @($x, $y) }
      }
    }
    if ($best) {
      adb shell input tap $best[0] $best[1] | Out-Null
      Start-Sleep -Seconds 1
      Back
      Start-Sleep -Seconds 1
      $ok = Save-Cropped 'phone-06-dark.png'
      $results.Add("$(if ($ok) { 'PASS' } else { 'FAIL' }) phone-06-dark.png")
      # restore light mode
      adb shell input tap 86 178 | Out-Null
      Start-Sleep -Milliseconds 800
      Tap-Text 'Settings' | Out-Null
      Start-Sleep -Seconds 1
      adb shell input tap $best[0] $best[1] | Out-Null
      Start-Sleep -Milliseconds 600
      Back
    } else {
      $results.Add('FAIL dark mode switch')
      Back
    }
  } else {
    $results.Add('FAIL dark mode row')
    Back
  }
} else {
  $results.Add('FAIL settings entry')
}

Write-Output '--- RESULT ---'
$results | ForEach-Object { Write-Output $_ }
Write-Output ''
Write-Output '--- FILES ---'
Get-ChildItem $dir -Filter 'phone-*.png' | ForEach-Object {
  $i = [System.Drawing.Image]::FromFile($_.FullName)
  Write-Output ("{0}  {1}x{2}  {3} KB" -f $_.Name, $i.Width, $i.Height, [math]::Round($_.Length / 1KB))
  $i.Dispose()
}
