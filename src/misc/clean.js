var shell = require("shelljs");

shell.rm("-f", "package-lock.json");
shell.rm("-rf", ["node_modules", "../docs/out"]);
