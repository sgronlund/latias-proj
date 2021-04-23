var shell = require("shelljs");

/* This library lets us run the "rm" unix command which removes
a file or folder given a path to that file or folder. We use the
flag "-f" to force removal and "-rf" to remove contents 
recursively in a folder. */
shell.rm("-f", "package-lock.json");
shell.rm("-rf", ["node_modules", "../docs/out"]);
