@echo off
rem use utf-8 encoding in console output:
node build\builder\build.js -u -o .\build\vivid.min.js .\build\overall.tpl.js
node build\builder\build.js -o .\build\vivid.js .\build\overall.tpl.js