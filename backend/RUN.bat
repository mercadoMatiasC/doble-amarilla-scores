@echo off
start /min "Xampp" "D:\xampp\xampp-control.exe"
powershell -window minimized -NoExit -command "php artisan serve --host=0.0.0.0 --port=8000"

