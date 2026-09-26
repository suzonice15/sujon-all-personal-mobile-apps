@echo off
powershell -NoProfile -Command "Start-Process powershell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -File \"%~dp0fix-permissions.ps1\"' -Verb RunAs -Wait"
echo Done. Check fix-permissions.log in this folder.
pause
