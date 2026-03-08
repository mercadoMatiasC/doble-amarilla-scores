@echo off
start /min "Xampp" "D:\xampp\xampp-control.exe"
start powershell
start "VSCode" "D:\Program Files\Microsoft VS Code\Code.exe"
powershell -window minimized -NoExit -command "php artisan serve --host=0.0.0.0 --port=8000"

