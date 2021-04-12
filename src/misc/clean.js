var os = require('os');
const { exec } = require('child_process');

if(os.type() === "Windows_NT") {
  exec('del package-lock.json && rd /s /q \"../docs/out\" && rd /s /q node_modules');
} else if(os.type() === "Darwin" || os.type() == "Linux") {
  exec('rm -f package-lock.json && rm -rf node_modules && rm -rf ../docs/out');
}