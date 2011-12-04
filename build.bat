@echo off
rem use utf-8 encoding in console output:
node build\builder\build.js -u -o .\bin\vivid.min.js .\build\overall.tpl.js
node build\builder\build.js -o .\bin\vivid.js .\build\overall.tpl.js