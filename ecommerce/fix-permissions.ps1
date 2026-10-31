$proj = "D:\Work\MobileApp\sujon-all-personal-mobile-apps\ecommerce"
$log = "$proj\fix-permissions.log"
"Started: $(Get-Date)" | Out-File $log

"=== whoami /priv (checking SeTakeOwnershipPrivilege) ===" | Out-File $log -Append
whoami /priv 2>&1 | Select-String "SeTakeOwnership|SeRestore|SeBackup|SeSecurityPrivilege" | Out-File $log -Append

"=== Filesystem minifilter drivers attached ===" | Out-File $log -Append
fltmc filters 2>&1 | Out-File $log -Append

"=== Raw ACL of one stuck folder (before any change) ===" | Out-File $log -Append
$stuck = "D:\Work\MobileApp\sujon-all-personal-mobile-apps\ecommerce\node_modules\react-native-screens\android\.cxx\Debug\6l2hj575\arm64-v8a\CMakeFiles\CMakeTmp"
if (Test-Path $stuck) {
    icacls $stuck 2>&1 | Out-File $log -Append
} else {
    "(path does not currently exist: $stuck)" | Out-File $log -Append
    # check its parent instead
    $parent = Split-Path $stuck -Parent
    if (Test-Path $parent) {
        "--- parent ACL instead: $parent ---" | Out-File $log -Append
        icacls $parent 2>&1 | Out-File $log -Append
    }
}

"=== Trying icacls /reset (strip all ACEs incl. any DENY, reinherit) on android folder ===" | Out-File $log -Append
$androidDir = "$proj\android"
$r = icacls $androidDir /reset /T /C /Q 2>&1
($r | Select-String "Failed processing|Successfully processed") | Out-File $log -Append
$r2 = icacls $androidDir /grant "$($env:USERNAME):F" /T /C /Q 2>&1
($r2 | Select-String "Failed processing|Successfully processed") | Out-File $log -Append

$toDelete = @(
    "$proj\node_modules\react-native-reanimated\android\build",
    "$proj\node_modules\react-native-screens\android\.cxx",
    "$proj\android\build",
    "$proj\android\app\build",
    "$proj\android\app\.cxx",
    "$proj\android\.gradle"
)
foreach ($d in $toDelete) {
    if (Test-Path $d) {
        Remove-Item $d -Recurse -Force -ErrorAction SilentlyContinue
        if (Test-Path $d) {
            "STILL LOCKED after /reset: $d" | Out-File $log -Append
        } else {
            "Deleted: $d" | Out-File $log -Append
        }
    } else {
        "Already gone: $d" | Out-File $log -Append
    }
}

"Done: $(Get-Date)" | Out-File $log -Append
