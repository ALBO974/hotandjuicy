@echo off
title Hot ^& Juicy - Local Preview
cd /d "%~dp0"
echo Starting Hot & Juicy local preview...
start "" http://127.0.0.1:8080/index.html
python preview-server.py
if errorlevel 1 (
  echo.
  echo Python was not found. Install it from https://www.python.org/downloads/
  echo or run: py preview-server.py
  pause
)
